import dotenvFlow from 'dotenv-flow';
import { envSchema } from '../schema/env.schema';
import logger from './winston';

dotenvFlow.config();

const parsedEnv = envSchema.safeParse({
    app: {
        ENV: process.env.ENV,
        PORT: process.env.PORT,
        METRIX_PORT: process.env.METRIX_PORT,
        LOG_LEVEL: process.env.LOG_LEVEL,
        CLIENT_URL: process.env.CLIENT_URL,
        API_KEY: process.env.API_KEY,
        DISABLE_RATE_LIMITER: process.env.DISABLE_RATE_LIMITER,
    },
    firebase: {
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        DATABASE_ID: process.env.DATABASE_ID,
    },
    twillo: {
        ACCOUNT_SID: process.env.ACCOUNT_SID,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
        SERVICE_SID: process.env.SERVICE_SID,
    },
    sendgrid: {
        API_KEY: process.env.API_KEY,
        FROM_EMAIL: process.env.FROM_EMAIL,
    },
    template: {
        WELCOME: process.env.WELCOME,
    },
});

/**
 * Check if the environment variables are valid
 * If not, log the error and exit the process
 */
if (!parsedEnv.success) {
    logger.error(parsedEnv.error.errors);
    process.exit(1);
}

export const env = parsedEnv.data;
