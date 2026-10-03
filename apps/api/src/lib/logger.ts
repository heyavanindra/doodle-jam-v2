import { createLogger, type Logger, type LoggerOptions } from '@repo/logger';
import { configs } from '../configs/configs.js';

export const logger = createLogger(configs.NODE_ENV);
export { createLogger, type Logger, type LoggerOptions };
export default logger;
