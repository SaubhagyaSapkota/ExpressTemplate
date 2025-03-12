import { NextFunction, Request, Response } from 'express';

import { env } from '../config/env';
import { ERROR_CODES } from '../constant/error.codes';
import { STATUS_CODES } from '../constant/status.codes';
import { ApiError } from '../error/ApiError';
import asyncCatch from '../error/asyncCatch';

/**
 * Middleware to verify the API key
 * @param req Request
 * @param _res Response
 * @param next NextFunction
 */
export const verifyApiKey = asyncCatch(async (req: Request, _res: Response, next: NextFunction) => {
    const t = req.t;

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
            t('apiKeyNotFoundMessage', { ns: 'error' }),
            t('apiKeyNotFoundDetails', { ns: 'error' }),
            t('apiKeyNotFoundSuggestion', { ns: 'error' }),
        );
    }

    if (apiKey !== ourApiKey) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            ERROR_CODES.UNAUTHORIZED,
            t('apiKeyNotMatchedMessage', { ns: 'error' }),
            t('apiKeyNotMatchedDetails', { ns: 'error' }),
            t('apiKeyNotMatchedSuggestion', { ns: 'error' }),
        );
    }

    next();
});
