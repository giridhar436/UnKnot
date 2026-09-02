import { v2 as cloudinary } from "cloudinary";
import { getEnv } from "@/lib/env";

let configured = false;

function ensureConfig() {
  if (configured) return;
  const env = getEnv();
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  original_filename: string;
  bytes: number;
  mime_type?: string;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "raw" | "auto";
    originalFilename?: string;
  } = {}
): Promise<UploadResult> {
  ensureConfig();

  const { folder = "unknot", resourceType = "auto", originalFilename } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        ...(originalFilename ? { original_filename: originalFilename } : {}),
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          resource_type: result.resource_type,
          format: result.format,
          original_filename: result.original_filename || originalFilename || "unknown",
          bytes: result.bytes,
          mime_type:
            (result as Record<string, unknown>).resource_type === "image"
              ? `image/${result.format}`
              : (result as Record<string, string>).mime_type || "application/octet-stream",
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  ensureConfig();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (result.result !== "ok" && result.result !== "not found") {
        reject(new Error(`Cloudinary delete failed: ${result.result}`));
        return;
      }
      resolve();
    });
  });
}

export function getCloudinaryUrl(publicId: string): string {
  ensureConfig();
  return cloudinary.url(publicId, { secure: true });
}
