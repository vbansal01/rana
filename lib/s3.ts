import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export interface PresignResult {
  uploadUrl: string;   // PUT to this URL directly from the browser
  publicUrl: string;   // Final public URL to save in Supabase
}

/**
 * Generate a 60-second presigned PUT URL for an event image.
 * Key format: events/<eventId>/<timestamp>.<ext>
 */
export async function getEventImagePresignedUrl(
  eventId: string,
  contentType: string,
  fileSize: number
): Promise<PresignResult> {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error(`Unsupported type: ${contentType}. Allowed: jpg, png, webp, gif`);
  }
  if (fileSize > MAX_SIZE) {
    throw new Error(`File too large (max 5 MB)`);
  }

  const ext = contentType.split("/")[1].replace("jpeg", "jpg");
  const key = `events/${eventId}/${Date.now()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ContentLength: fileSize,
    CacheControl: "public, max-age=31536000, immutable",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  const publicUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;

  return { uploadUrl, publicUrl };
}
