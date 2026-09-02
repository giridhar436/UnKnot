import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  FIREWORKS_API_KEY: z.string().min(1),
  OCR_PROVIDER: z.string().default("fireworks_vision"),
});

let _env: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (_env) return _env;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "Missing environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment configuration. Check .env.local");
  }
  _env = parsed.data;
  return _env;
}
