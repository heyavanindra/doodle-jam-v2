import { z } from 'zod';
import { appEnv, redisEnv, parseEnv } from '@repo/env';

export const envSchema = appEnv.extend(redisEnv.shape);

export type ConfigTypes = z.infer<typeof envSchema>;
export const configs = Object.freeze(parseEnv(envSchema, 'worker'));
