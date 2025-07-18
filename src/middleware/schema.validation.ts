import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ERROR_CODES } from '@/constant/error.codes';
import { STATUS_CODES } from '@/constant/status.codes';
import { ApiError } from '@/error/ApiError';
import logger from '@/logger/winston.logger';

export default function validateSchema(schema: z.AnyZodObject) {
    return function (req: Request, res: Response, next: NextFunction) {
        const t = req.t;

        try {
            const parsedSchema = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            });

            req.body = parsedSchema.body;
            req.query = parsedSchema.query;
            req.params = parsedSchema.params;
            req.headers = parsedSchema.headers;

            return next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).send({
                    statusCode: STATUS_CODES.INVALID_JSON_CONFIG,
                    message: t('schema_validation_error', { ns: 'error' }),
                    errorList: error.errors.map((e) => ({
                        code: e.code,
                        message: e.message,
                        field: e.path[1],
                    })),
                });

                logger.error(t('schema_validation_error', { ns: 'error' }));
                return;
            }

            logger.error(t('schema_validation_error', { ns: 'error' }));

            throw new ApiError(
                STATUS_CODES.INVALID_JSON_CONFIG,
                ERROR_CODES.INVALID_JSON_CONFIG,
                t('general_error_message', { ns: 'error' }),
                t('general_error_details', { ns: 'error' }),
                t('general_error_suggestion', { ns: 'error' }),
            );
        }
    };
}
