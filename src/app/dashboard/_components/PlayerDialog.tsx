// "use client";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Player } from "@remotion/player";
// import RemotionVideo from "@/app/dashboard/_components/RemotionVideo";
// import { useCallback, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { db } from "@/config/db";
// import { VideoData } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { captionsItem, videoDataSchema, VideoScriptItem } from "@/types/types";
// import { useRouter } from "next/navigation";

// type PlayerDialogProps = {
//   playVideo: number | boolean;
//   videoId: number;
// };

// type videoDataWithDownload = videoDataSchema & { DownloadURL?: string };

// const PlayerDialog = ({ playVideo, videoId }: PlayerDialogProps) => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [videoData, setVideoData] = useState<videoDataWithDownload | null>(null);
//   const [durationInFrame, setDurationInFrame] = useState<number>(100);
//   const [isExporting, setIsExporting] = useState(false);
//   const router = useRouter();
//   const handleExport = async () => {
//     if (!videoData) return;
//     console.log("🚀 Exporting video with data:", videoData);
//     try {
//       setIsExporting(true);
//       const res = await fetch("/api/render-video", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           audioURL: videoData.audioFileUrl,
//           captions: videoData.captions,
//           images: videoData.imageList,
//           caption_Style: "", // optional or use your style
//           videoId: videoData.id,
//         }),
//       });
//       console.log("res", res);
//       const data = await res.json();
//       console.log("Export video response:", data);
//       if (data.success && data.url) {
//         const response = await fetch(data.url);
//         const blob = await response.blob();
//         const blobUrl = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = blobUrl;
//         a.download = "video.mp4";
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         URL.revokeObjectURL(blobUrl);
//       } else {
//         alert("Failed to export video");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error exporting video");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const GetVideoData = useCallback(async () => {
//     try {
//       const result = await db
//         .select()
//         .from(VideoData)
//         .where(eq(VideoData.id, videoId));

//       if (result[0]) {
//         const formattedData: videoDataSchema = {
//           id: result[0].id,
//           script: result[0].script as VideoScriptItem[],
//           audioFileUrl: result[0].audioFileUrl,
//           captions: result[0].captions as captionsItem[],
//           imageList: result[0].imageList ?? [],
//           createdBy: result[0].createdBy,
//         };
//         setVideoData(formattedData);
//       }
//     } catch (err) {
//       console.log("Error while getting VideoData:", err);
//     }
//   }, [setVideoData, videoId]);

//   useEffect(() => {
//     if (playVideo && videoId) {
//       setOpenDialog((prev) => !prev);
//       GetVideoData();
//     }
//   }, [playVideo, videoId, GetVideoData]);

//   // Render dialog only on the client
//   if (!openDialog || !videoData) return null;

//   return (
//     <Dialog open={openDialog}>
//       <DialogContent className="bg-white flex flex-col items-center z-[1000]">
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold my-5 text-center">
//             Your video is ready
//           </DialogTitle>
//           <DialogDescription asChild>
//             <div>
//               <Player
//                 component={RemotionVideo}
//                 durationInFrames={Number(durationInFrame.toFixed(0))}
//                 compositionWidth={300}
//                 compositionHeight={375}
//                 controls={true}
//                 fps={30}
//                 inputProps={{
//                   ...videoData,
//                   setDurationInFrame: (frameValue: number) =>
//                     setDurationInFrame(frameValue),
//                 }}
//               />
//               <DialogFooter className="flex gap-10 mt-10 !justify-center">
//                 <Button
//                   variant="outline"
//                   onClick={handleExport}
//                   disabled={isExporting}
//                 >
//                   {isExporting ? "Exporting..." : "Export / Download"}
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   onClick={() => {
//                     router.replace("/dashboard");
//                     setOpenDialog(false);
//                   }}
//                 >
//                   Close
//                 </Button>
//               </DialogFooter>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PlayerDialog;



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

  // Download video when URL is ready
  // const handleDownloadVideo = () => {
  //   if (!videoData?.DownloadURL) return;

  //   const link = document.createElement("a");
  //   link.href = videoData.DownloadURL;
  //   link.download = `video_${videoData.id}.mp4`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  const handleDownloadVideo = () => {
    if (!videoData?.DownloadURL) return;
    
    const link = document.createElement('a');
    link.href = videoData.DownloadURL;
    link.download = `${videoData.id || 'video'}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  

  // Render dialog only if open and data loaded
  if (!openDialog || !videoData) return null;

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center z-[1000]">
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
                  setDurationInFrame: (frameValue: number) =>
                    setDurationInFrame(frameValue),
                }}
              />

              <DialogFooter className="flex gap-5 mt-10 !justify-center w-full">
                {videoData.DownloadURL ? (
                  <Button
                    variant="outline"
                    onClick={handleDownloadVideo}
                    className="flex gap-2"
                  >
                    Download Video
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex gap-2"
                  >
                    {isExporting ? "Starting Render..." : "Export"}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={() => {
                    router.replace("/dashboard");
                    setOpenDialog(false);
                  }}
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
