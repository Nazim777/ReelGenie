import { NextApiRequest, NextApiResponse } from "next";
import { bundle } from "@remotion/bundler";
import { renderMedia, getCompositions } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const data = req.body;
    const lastCaptionEnd = data.captions?.[data.captions.length - 1]?.end ?? 2000;

    // Step 1: Create a temporary directory
    const tmpDir = path.resolve("tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    // Step 2: Copy RemotionVideo component into tmp folder
    const sourceComponent = path.resolve("src/app/dashboard/_components/RemotionVideo.tsx");
    const tmpComponent = path.join(tmpDir, "RemotionVideo.tsx");
    fs.copyFileSync(sourceComponent, tmpComponent);

    // Step 3: Create dynamic entry file for Remotion
    const entryFile = path.join(tmpDir, `index-${Date.now()}.tsx`);
    const entryCode = `
      import { registerRoot } from 'remotion';
      import React from 'react';
      import { Composition } from 'remotion';
      import RemotionVideo from './RemotionVideo';

      const defaultProps = {
        script: [],
        imageList: [],
        audioFileUrl: '',
        captions: [],
        setDurationInFrame: () => {},
      };

      export const RemotionRoot = () => (
        <>
          <Composition
            id="RemotionVideo"
            component={RemotionVideo}
            durationInFrames={${Math.ceil((lastCaptionEnd / 1000) * 30)}}
            fps={30}
            width={1280}
            height={720}
            defaultProps={defaultProps}
          />
        </>
      );

      registerRoot(RemotionRoot);
    `;
    fs.writeFileSync(entryFile, entryCode);

    // Step 4: Bundle and render
    console.log("📦 Bundling Remotion...");
    const bundleLocation = await bundle(entryFile);

    console.log("🎬 Getting compositions...");
    const compositions = await getCompositions(bundleLocation, { inputProps: data });
    const composition = compositions.find((c) => c.id === "RemotionVideo");
    if (!composition) throw new Error("Composition 'RemotionVideo' not found");

    const outputFile = path.join(tmpDir, `video-${Date.now()}.mp4`);

    console.log("🎥 Rendering video...");
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputFile,
      inputProps: data,
    });

    // Step 5: Upload to Cloudinary
    console.log("☁️ Uploading to Cloudinary...");
    const uploadResult = await cloudinary.uploader.upload(outputFile, {
      resource_type: "video",
      folder: "remotion_videos",
    });

    // Step 6: Cleanup
    fs.unlinkSync(outputFile);
    fs.unlinkSync(entryFile);
    fs.unlinkSync(tmpComponent);

    console.log("✅ Uploaded:", uploadResult.secure_url);
    res.status(200).json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    console.error("❌ Export video error:", err);
    res.status(500).json({ success: false, error: "Failed to export and upload video" });
  }
}
