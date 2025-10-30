"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "@/app/dashboard/_components/RemotionVideo";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";
import { captionsItem, videoDataSchema, VideoScriptItem } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useColorMode } from "@/app/_context/ColorModeContext";

type PlayerDialogProps = {
  playVideo: number | boolean;
  videoId: number;
};

// Extend the type to include optional DownloadURL
type videoDataWithDownload = videoDataSchema & { DownloadURL?: string | null };

const PlayerDialog = ({ playVideo, videoId }: PlayerDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<videoDataWithDownload | null>(null);
  const [durationInFrame, setDurationInFrame] = useState<number>(100);
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();

  // Fetch video data from DB
  const GetVideoData = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));

      if (result[0]) {
        const formattedData: videoDataWithDownload = {
          id: result[0].id,
          script: result[0].script as VideoScriptItem[],
          audioFileUrl: result[0].audioFileUrl,
          captions: result[0].captions as captionsItem[],
          imageList: result[0].imageList ?? [],
          createdBy: result[0].createdBy,
          DownloadURL: result[0]?.videoUrl, // optional
        };
        setVideoData(formattedData);
      }
    } catch (err) {
      console.log("Error while getting VideoData:", err);
      toast.error("Failed to fetch video data.");
    }
  }, [videoId]);

  useEffect(() => {
    if (playVideo && videoId) {
      setOpenDialog(true);
      GetVideoData();
    }
  }, [playVideo, videoId, GetVideoData]);


  // Poll for download URL
const pollDownloadURL = useCallback(async () => {
  if (!videoData) return;
  const interval = setInterval(async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoData.id));

      if (result[0]?.videoUrl) {
        setVideoData((prev) => prev ? { ...prev, DownloadURL: result[0].videoUrl } : prev);
        clearInterval(interval);
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, 5000); // every 5 seconds
}, [videoData]);

  // Trigger rendering via API
  const handleExport = async () => {
    if (!videoData) return;

    try {
      setIsExporting(true);
      const response = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audioURL: videoData.audioFileUrl,
          captions: videoData.captions,
          images: videoData.imageList,
          caption_Style: "", // optional
          videoId: videoData.id,
        }),
      });

      const data = await response.json();
      console.log("Render API response:", data);

      if (data.message) {
        toast.success("Rendering started! The download will be available when ready.");
        // Start polling for DownloadURL
        pollDownloadURL();
      } else {
        toast.error("Failed to start rendering.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error exporting video.");
    } finally {
      if(videoData?.DownloadURL){
        toast.success("Video is ready for download!");
        setIsExporting(false);
      }
    }
  };

  


  const handleDownloadVideo = () => {
    if (!videoData?.DownloadURL) return;
    
    const link = document.createElement('a');
    link.href = videoData.DownloadURL;
    link.download = `${videoData.id || 'video'}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
 const { mode } = useColorMode();
const bgClass =
    mode === 'dark'
      ? 'bg-gray-900 text-white'
      : mode === 'green'
      ? 'bg-green-100 text-green-900'
      : mode === 'orange'
      ? 'bg-orange-100 text-orange-900'
      : 'bg-white text-gray-900';
  // Render dialog only if open and data loaded
  if (!openDialog || !videoData) return null;
 
  return (
    // <Dialog open={openDialog}>
    //   <DialogContent className=" flex flex-col items-center z-[1000]">
    //     <DialogHeader>
    //       <DialogTitle className="text-3xl font-bold my-5 text-center">
    //         Your video is ready
    //       </DialogTitle>
    //       <DialogDescription asChild>
    //         <div className="flex flex-col items-center w-full">
    //           <Player
    //             component={RemotionVideo}
    //             durationInFrames={Number(durationInFrame.toFixed(0))}
    //             compositionWidth={300}
    //             compositionHeight={375}
    //             controls={true}
    //             fps={30}
    //             inputProps={{
    //               ...videoData,
    //               setDurationInFrame: (frameValue: number) =>
    //                 setDurationInFrame(frameValue),
    //             }}
    //           />

    //           <DialogFooter className="flex gap-5 mt-10 !justify-center w-full">
    //             {videoData.DownloadURL ? (
    //               <Button
    //                 variant="outline"
    //                 onClick={handleDownloadVideo}
    //                 className="flex gap-2"
    //               >
    //                 Download Video
    //               </Button>
    //             ) : (
    //               <Button
    //                 variant="outline"
    //                 onClick={handleExport}
    //                 disabled={isExporting}
    //                 className="flex gap-2"
    //               >
    //                 {isExporting ? "Starting Render..." : "Export"}
    //               </Button>
    //             )}

    //             <Button
    //               variant="ghost"
    //               onClick={() => {
    //                 router.replace("/dashboard");
    //                 setOpenDialog(false);
    //               }}
    //             >
    //               Close
    //             </Button>
    //           </DialogFooter>
    //         </div>
    //       </DialogDescription>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>

    <Dialog open={openDialog}>
      <DialogContent className={`flex flex-col items-center z-[1000] ${bgClass} transition-colors duration-300`}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5 text-center">
            Your video is ready
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center w-full">
              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={375}
                controls={true}
                fps={30}
                inputProps={{
                  ...videoData,
                  setDurationInFrame: (frameValue: number) => setDurationInFrame(frameValue),
                }}
              />

              <DialogFooter className="flex gap-5 mt-10 !justify-center w-full">
                {videoData.DownloadURL ? (
                  <Button
                    variant="outline"
                    onClick={handleDownloadVideo}
                    className={`${mode === 'dark' ? 'border-white text-white' : ''} flex gap-2`}
                  >
                    Download Video
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={isExporting}
                    className={`${mode === 'dark' ? 'border-white text-white' : ''} flex gap-2`}
                  >
                    {isExporting ? 'Starting Render...' : 'Export'}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={() => {
                    router.replace('/dashboard');
                    setOpenDialog(false);
                  }}
                  className={mode === 'dark' ? 'text-white' : ''}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
