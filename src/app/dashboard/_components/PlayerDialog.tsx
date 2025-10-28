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

type PlayerDialogProps = {
  playVideo: number | boolean;
  videoId: number;
};

const PlayerDialog = ({ playVideo, videoId }: PlayerDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<videoDataSchema | null>(null);
  const [durationInFrame, setDurationInFrame] = useState<number>(100);
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();
const handleExport = async () => {
  if (!videoData) return;
  console.log("🚀 Exporting video with data:", videoData);
  try {
    setIsExporting(true);
    const res = await fetch("/api/export-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoData),
    });
    console.log('res',res);
    const data = await res.json();
    console.log("Export video response:", data);
    if (data.success && data.url) {
     const response = await fetch(data.url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "video.mp4";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
    } else {
      alert("Failed to export video");
    }
  } catch (err) {
    console.error(err);
    alert("Error exporting video");
  } finally {
    setIsExporting(false);
  }
};

  const GetVideoData = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));

      if (result[0]) {
        const formattedData: videoDataSchema = {
          id: result[0].id,
          script: result[0].script as VideoScriptItem[],
          audioFileUrl: result[0].audioFileUrl,
          captions: result[0].captions as captionsItem[],
          imageList: result[0].imageList ?? [],
          createdBy: result[0].createdBy,
        };
        setVideoData(formattedData);
      }
    } catch (err) {
      console.log("Error while getting VideoData:", err);
    }
  }, [setVideoData, videoId]);

  useEffect(() => {
    if (playVideo && videoId) {
      setOpenDialog((prev) => !prev);
      GetVideoData();
    }
  }, [playVideo, videoId, GetVideoData]);

  // Render dialog only on the client
  if (!openDialog || !videoData) return null;

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center z-[1000]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5 text-center">
            Your video is ready
          </DialogTitle>
          <DialogDescription asChild>
            <div>
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
              <DialogFooter className="flex gap-10 mt-10 !justify-center">
                 <Button
                  variant="outline"
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? "Exporting..." : "Export / Download"}
                </Button>
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
