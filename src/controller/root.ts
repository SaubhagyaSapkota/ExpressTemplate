import { Request, Response } from 'express';

import packageJson from '../../package.json';
import { env } from '../config/env';
import { ERROR_CODES } from '../constant/error.codes';
import { STATUS_CODES } from '../constant/status.codes';
import { ApiError } from '../error/ApiError';
import asyncCatch from '../error/asyncCatch';
import { customSuccessResponse } from '../utils/customSuccessResponse';

const appName = packageJson.name;
const appEnverionment = env.app.NODE_ENV;
const appVersion = packageJson.version;

export const root = asyncCatch(async (req: Request, res: Response) => {
    const t = req.t;
    /**
     * Check if the required environment variables are set
     * If not, throw an error
     */
    if (!appName || !appVersion || !appEnverionment) {
        throw new ApiError(
            STATUS_CODES.INVALID_JSON_CONFIG,
            ERROR_CODES.INVALID_JSON_CONFIG,
            t('invalid_package_message', { ns: 'error' }),
            t('invalid_package_details', { ns: 'error' }),
            t('invalid_package_suggestion', { ns: 'error' }),
        );
    }

    /**
     * Send a welcome message with the app name, version, and environment
     */
    customSuccessResponse(res, 200, t('welcome'), {
        appName,
        appVersion,
        appEnverionment,
    });
});
