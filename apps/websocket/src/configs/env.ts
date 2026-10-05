import { parseEnv, redisEnv, websocketEnv } from '@repo/env';

const appEnv = websocketEnv.extend(redisEnv.shape);

export const env = parseEnv(appEnv, 'websocket-app');
