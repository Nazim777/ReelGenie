"use client";
import { useCallback, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { videoDataSchema } from "@/types/types";
import VideoList from "./_components/VideoList";
import { useUserDetailContext } from "../_context/UserDetailContext";
import Loader from "@/components/Loader";
import CustomError from "@/components/CustomError";

const Dashboard = () => {
  const [videoList, setVideoList] = useState<videoDataSchema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error,setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8; 

  const { user } = useUser();
  const { setUserDetail } = useUserDetailContext();

  const GetVideoList = useCallback(async () => {
    setIsLoading(true);
    setError(null)
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress || "";
      const result = await db
        .select()
        .from(VideoData)
        .where(userEmail ? eq(VideoData.createdBy, userEmail) : undefined);

      const formattedResult: videoDataSchema[] = result.map((item) => ({
        id: item.id,
        script: Array.isArray(item.script) ? item.script : [],
        audioFileUrl: item.audioFileUrl!,
        captions: Array.isArray(item.captions) ? item.captions : [],
        imageList: item.imageList!,
        createdBy: item.createdBy!,
      }));

      setVideoList(formattedResult);
    } catch (error) {
      console.error("Error fetching video list:", error);
      setError('Failed to laod the videos. Please try again later!')
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetVideoList();
    }
  }, [user, GetVideoList]);


  // Verify user (unchanged)
  const verifyUser = useCallback(async () => {
    try {
      const response = await fetch("/api/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user }),
      });

      if (!response.ok) throw new Error("Failed to verify user");

      const data = await response.json();
      setUserDetail(data.result);
      return data;
    } catch (err) {
      console.error(err);
    }
  }, [user, setUserDetail]);

  useEffect(() => {
    if (user) verifyUser();
  }, [user, verifyUser]);


  
  const totalPages = Math.ceil(videoList.length / pageSize);
  const paginatedData = videoList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

  if(error){
    return <CustomError error={error}/>
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl ">Dashboard</h2>
      </div>

      {/* Loading */}
      {isLoading && (
       <Loader loading="Loading Videos"/>
      )}

     

      {/* Empty */}
      {!isLoading && videoList.length === 0 && <EmptyState />}

      {/* Paginated list */}
      {!isLoading && videoList.length > 0 && (
        <>
          <VideoList videoList={paginatedData} />

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-40"
            >
              Previous
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === page ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

