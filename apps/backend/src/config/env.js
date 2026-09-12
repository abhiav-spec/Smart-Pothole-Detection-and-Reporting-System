import "dotenv/config";
import { z } from "zod";

const cleanString = (schema) =>
  z.preprocess((val) => (typeof val === "string" ? val.replace(/^["']|["']$/g, "").trim() : val), schema);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().default(5000),

  DATABASE_URL: cleanString(z.string().min(1)),
  DIRECT_URL: cleanString(z.string().optional()),

  FRONTEND_URL: cleanString(z.string().url()),

  JWT_ACCESS_SECRET: cleanString(z.string().min(32)),
  JWT_REFRESH_SECRET: cleanString(z.string().min(32)),

  JWT_ACCESS_EXPIRES_IN: cleanString(z.string().default("15m")),
  JWT_REFRESH_EXPIRES_IN: cleanString(z.string().default("7d")),

  AI_SERVICE_URL: cleanString(z.string().url()),

  IMAGEKIT_PUBLIC_KEY: cleanString(z.string().optional()),
  IMAGEKIT_PRIVATE_KEY: cleanString(z.string().optional()),
  IMAGEKIT_URL_ENDPOINT: cleanString(z.string().optional()),

  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(50),

  LOG_LEVEL: cleanString(z.string().default("info")),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().default(10),
  UPLOAD_RATE_LIMIT_MAX: z.coerce.number().default(15)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
