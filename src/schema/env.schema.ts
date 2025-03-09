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

    firebase: z
        .object({
            FIREBASE_PROJECT_ID: z.string(),
            FIREBASE_STORAGE_BUCKET: z.string(),
            FIREBASE_PRIVATE_KEY: z.string(),
            FIREBASE_CLIENT_EMAIL: z.string(),
            FIREBASE_DATABASE_ID: z.string(),
        })
        .optional(),

    twillo: z
        .object({
            TWILO_ACCOUNT_SID: z.string(),
            TWILO_AUTH_TOKEN: z.string(),
            TWILO_SERVICE_SID: z.string(),
        })
        .optional(),

    sendgrid: z
        .object({
            SAND_GRID_API_KEY: z.string(),
            SAND_GRID_FROM_EMAIL: z.string().email(),
        })
        .optional(),

    template: z
        .object({
            TEMPLATE_WELCOME: z.string(),
        })
        .optional(),
});

export type envType = z.TypeOf<typeof envSchema>;
