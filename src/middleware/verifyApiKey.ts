import { NextFunction, Request, Response } from 'express';

import { env } from '@/config/env';
import { ERROR_CODES } from '@/constant/error.codes';
import { STATUS_CODES } from '@/constant/status.codes';
import { ApiError } from '@/error/ApiError';
import asyncCatch from '@/error/asyncCatch';

/**
 * Middleware to verify the API key
 * @param req Request
 * @param _res Response
 * @param next NextFunction
 */
export const verifyApiKey = asyncCatch(async (req: Request, _res: Response, next: NextFunction) => {
    const t = req.t;

    // skip the API key verification if disabled on development
    if (env.app.DISABLE_VALIDATE_API_KEY_ON_DEVELOPMENT) return next();

    const apiKey = req.headers['x-api-key'];

    /**
     * Here we are getting the API key from the environment variables
     * You can also store the API key in the database
     * or any other place you want
     *
     * Read more about environment variables here:
     * https://blog.stoplight.io/api-keys-best-practices-to-authenticate-apis
     *
     */
    const ourApiKey = env.app.API_KEY;

    if (!apiKey) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_CODES.UNAUTHORIZED,
            t('api_key_not_found_message', { ns: 'error' }),
            t('api_key_not_found_details', { ns: 'error' }),
            t('api_key_not_found_suggestion', { ns: 'error' }),
        );
    }

    if (apiKey !== ourApiKey) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_CODES.UNAUTHORIZED,
            t('api_key_not_matched_message', { ns: 'error' }),
            t('api_key_not_matched_details', { ns: 'error' }),
            t('api_key_not_matched_suggestion', { ns: 'error' }),
        );
    }

    // add apiKey to the request object
    req.apiKey = apiKey;

    next();
});
