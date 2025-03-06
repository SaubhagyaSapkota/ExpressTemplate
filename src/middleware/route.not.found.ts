import type { Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { STATUS_CODES } from '../constant/status.codes';
import { ERROR_CODES } from '../constant/error.codes';

/**
 * Route not found handler
 * @param req Request
 * @param _res Response
 * @returns void
 */
export const routeNotFoundHandler = (req: Request, res: Response) => {
    const t = req.t;

    throw new ApiError(
        STATUS_CODES.ROUTE_NOT_FOUND,
        ERROR_CODES.ROUTE_NOT_FOUND,
        t('routeNotFoundMessage', { ns: 'error' }),
        t('routeNotFoundDetails', { ns: 'error' }),
        t('routeNotFoundSuggestion', { ns: 'error' }),
    );
};
