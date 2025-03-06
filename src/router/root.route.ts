import { Router, Response, Request } from 'express';

import { env } from '../config/env';
import packageJson from '../../package.json';
import asyncCatch from '../error/asyncCatch';
import { ApiError } from '../error/ApiError';
import { STATUS_CODES } from '../constant/status.codes';
import { ERROR_CODES } from '../constant/error.codes';
import { customSuccessResponse } from '../utils/customSuccessResponse';

const rootRouter = Router();

const appName = packageJson.name;
const appEnverionment = env.app.ENV;
const appVersion = packageJson.version;

/**
 * @openapi
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Welcome message
 *     responses:
 *       200:
 *         description: Successful response
 */
rootRouter.get(
    '/',
    asyncCatch(async (req: Request, res: Response) => {
        const t = req.t;
        /**
         * Check if the required environment variables are set
         * If not, throw an error
         */
        if (!appName || !appVersion || !appEnverionment) {
            throw new ApiError(
                STATUS_CODES.INVALID_JSON_CONFIG,
                ERROR_CODES.INVALID_JSON_CONFIG,
                t('invalidPackageMessage', { ns: 'error' }),
                t('invalidPackageDetails', { ns: 'error' }),
                t('invalidPackageSuggestion', { ns: 'error' }),
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
    }),
);

export { rootRouter };
