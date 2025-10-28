import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Initialize ElevenLabs client
const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

// Convert Readable → Buffer
// Convert either Web ReadableStream or Node Readable → Buffer
async function anyStreamToBuffer(stream: any): Promise<Buffer> {
  // ✅ Case 1: Web ReadableStream (Edge runtime)
  if (typeof stream.getReader === "function") {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    return Buffer.concat(chunks.map((c) => Buffer.from(c)));
  }

  // ✅ Case 2: Node Readable (Node runtime)
  if (typeof stream.on === "function") {
    const chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  }

  throw new Error("Unsupported stream type");
}

// Timeout helper
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out")), ms)
  );
  return Promise.race([promise, timeout]);
}

export async function POST(req: NextRequest) {
  try {
    const { text, id } = await req.json();
    console.log("id", id, "text", text);

    if (!text || !id) {
      return NextResponse.json(
        { error: "Missing 'text' or 'id' field" },
        { status: 400 }
      );
    }

    // ✅ Check available voices (only runs once if you log it manually)
    // const voices = await client.voices.getAll();
    // console.log(voices);

    // 🟢 Use a valid default voice (e.g., "21m00Tcm4TlvDq8ikWAM") — this one always exists
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // "Rachel" sometimes returns 404

    // Generate speech
    const audioStream = await withTimeout(
      client.textToSpeech.convert(voiceId, {
        text,
        model_id: "eleven_turbo_v2", // or "eleven_monolingual_v1"
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
      20000
    );

    console.log("audioStream type:", typeof audioStream, audioStream);

     const audioBuffer = await anyStreamToBuffer(audioStream);

    // --- ☁️ Upload to Cloudinary ---
    const downloadUrl = await uploadToCloudinary(audioBuffer, id);

    return NextResponse.json({ result: downloadUrl });
  } catch (error: any) {
    let errorMessage = "Unknown error occurred";
    let statusCode = 500;

    if (error?.message) errorMessage = error.message;
    if (errorMessage.includes("timed out")) statusCode = 504;

    console.error("Error during ElevenLabs TTS:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}





const uploadToCloudinary = async (audioContent: Buffer, id: string) => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ai-short-video-files",
        public_id: id,
        resource_type: "video", // needed for audio files
        format: "mp3",
      },
      (error, result) => {
        console.log('cloudinary upload error',error,'result',result)
        if (error) return reject(error);
        resolve((result as any).secure_url);
      }
    );
    console.log('uploadStream',uploadStream)

    // Convert Buffer → Readable stream for Cloudinary
    Readable.from(audioContent).pipe(uploadStream);
  });
};