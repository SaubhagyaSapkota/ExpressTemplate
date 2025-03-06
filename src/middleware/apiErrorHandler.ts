import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../error/ApiError';
import { STATUS_CODES } from '../constant/status.codes';
import { ERROR_CODES } from '../constant/error.codes';
import { apiErrorFormat } from '../error/apiErrorFormat';

export function apiErrorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
    const t = req.t;

    /**
     * Create an instance of ApiError
     */
    const error = new ApiError(
        err.statusCode || STATUS_CODES.GENERAL_ERROR,
        err.errorCode || ERROR_CODES.GENERAL_ERROR,
        err.message || t('general_error_message', { ns: 'error' }),
        err.details || t('general_error_details', { ns: 'error' }),
        err.suggestion || t('general_error_suggestion', { ns: 'error' }),
    );

    // Format the error
    const formatedError = apiErrorFormat(req, error);

    // Send error response
    res.status(error.statusCode).json(formatedError);

    // Move to the next middleware with the error
    next();
}
