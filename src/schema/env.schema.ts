import { z } from 'zod';

/**
 * @description
 *  truthy values are values that are considered true
 *  in the context of environment variables
 */
const TRUTHY_VALUES = ['true', 't', '1'];

export const envSchema = z.object({
    app: z.object({
        NODE_ENV: z.enum(['development', 'production', 'test']),
        PORT: z.string().transform(Number),
        METRIX_PORT: z.string().transform(Number),
        /***
         * log levels are options according to morgan
         *  for more info visit https://github.com/expressjs/morgan#readme
         */
        LOG_LEVEL: z.enum(['dev', 'short', 'combined', 'common', 'short', 'tiny']),
        CLIENT_URL: z.string().url(),
        DISABLE_RATE_LIMITER: z.string().transform((val) => {
            return TRUTHY_VALUES.includes(val.toLowerCase());
        }),
    }),

    firebase: z.object({
        PROJECT_ID: z.string(),
        STORAGE_BUCKET: z.string(),
        PRIVATE_KEY: z.string(),
        CLIENT_EMAIL: z.string(),
        DATABASE_ID: z.string(),
    }),

    twillo: z.object({
        ACCOUNT_SID: z.string(),
        AUTH_TOKEN: z.string(),
        SERVICE_SID: z.string(),
    }),

    sendgrid: z.object({
        API_KEY: z.string(),
        FROM_EMAIL: z.string().email(),
    }),

    template: z.object({
        WELCOME: z.string(),
    }),
});

export type envType = z.TypeOf<typeof envSchema>;
