import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { video_url, videoId } = await req.json();

    if (!video_url || !videoId) {
      return NextResponse.json(
        { error: "Missing video_url or videoId" },
        { status: 400 }
      );
    }

    // Validate the URL
    try {
      new URL(video_url);
    } catch {
      return NextResponse.json({ error: "Invalid video URL" }, { status: 400 });
    }

    // Update the record in Neon
    const result = await db
      .update(VideoData)
      .set({
        videoUrl: video_url,
        status: "completed",
      })
      .where(eq(VideoData.id, Number(videoId)))
      .returning({ id: VideoData.id, videoUrl: VideoData.videoUrl });

    if (result.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Video URL saved successfully",
      data: result[0],
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Failed to update video record", details: error },
      { status: 500 }
    );
  }
}
