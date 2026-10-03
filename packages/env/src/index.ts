import { z } from 'zod';

export const dbEnv = z.object({
  DATABASE_URL: z.url(),
});

export const redisEnv = z.object({
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().positive().max(65535).default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().optional(),
});

export const awsEnv = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET: z.string(),
  AWS_BUCKET_REGION: z.string(),
});

export const authEnv = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export const resendEnv = z.object({
  RESEND_API_KEY: z.string().min(1),
});

export const appEnv = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.string().default('debug'),
});

export const webClientEnv = z.object({
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:4000'),
  NEXT_PUBLIC_WEB_URL: z.url().default('http://localhost:3000'),
});

export function parseEnv<T extends z.ZodType>(schema: T, label: string): z.infer<T> {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error(`Invalid environment variables for ${label}:`);
    console.error(result.error.issues);
    process.exit(1);
  }
  return result.data;
}
