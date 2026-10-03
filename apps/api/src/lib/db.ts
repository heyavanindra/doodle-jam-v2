import { createDb } from '@repo/db/client';
import { configs } from '../configs/configs.js';

export const { pool, db } = createDb({ databaseUrl: configs.DATABASE_URL });
