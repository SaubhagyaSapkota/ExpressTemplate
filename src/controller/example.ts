import { Request, Response } from 'express';

import { env } from '../config/env';
import { ERROR_CODES } from '../constant/error.codes';
import { STATUS_CODES } from '../constant/status.codes';
import { sendEmail } from '../email/sendgrid';
import { ApiError } from '../error/ApiError';
import asyncCatch from '../error/asyncCatch';
import { DELAY_AFTER_REQUEST_COUNT, DELAY_AFTER_REQUEST_COUNT_EXCIDED_IN_MS, WINDOW_IN_MILI_SECONDS } from '../middleware/slow-down';
import { metricsType, sendEmailType } from '../schema/example.schema';
import { RequestWithRateLimit } from '../types/types';
import { customSuccessResponse } from '../utils/customSuccessResponse';

export const slowDownExample = asyncCatch(async (req: RequestWithRateLimit, res: Response) => {
    const t = req.t;

    // Track the number of requests in the current window
    // Since we may not have access to the internal counter, we can estimate
    const requestCount = req.rateLimit?.current || 0;

    // Calculate expected delay based on our configuration
    let expectedDelay = 0;

    // If the request count exceeds the threshold, calculate the delay
    if (requestCount > DELAY_AFTER_REQUEST_COUNT) expectedDelay = requestCount * DELAY_AFTER_REQUEST_COUNT_EXCIDED_IN_MS;

    // Calculate time remaining in the current window
    const resetTime = req.rateLimit?.resetTime || new Date(Date.now() + WINDOW_IN_MILI_SECONDS);
    const timeRemaining = Math.max(0, resetTime.getTime() - Date.now());

    customSuccessResponse(res, 200, t('api_slow_down_test'), {
        requestCount,
        expectedDelay: `${expectedDelay}ms`,
        timeBeforeReset: `${Math.floor(timeRemaining / 1000)} seconds`,
        delayStatus: requestCount <= DELAY_AFTER_REQUEST_COUNT ? t('no_delay') : t('request_being_slowed_down'),
    });
});

export const sendEmailExample = asyncCatch(async (req: Request<{}, {}, sendEmailType['body'], {}>, res: Response) => {
    const t = req.t;
    const payload = req.body;

    // Sending email
    const [emailResponse] = await sendEmail(req, {
        templateId: env.template.TEMPLATE_WELCOME,

        to: payload.to,
        dynamicTemplateData: payload.dynamicTemplateData,
    });

    customSuccessResponse(res, 200, t('email_sent'), emailResponse);
});

export const exampleVerifyApiKey = asyncCatch(async (req: Request, res: Response) => {
    const t = req.t;

    customSuccessResponse(res, 200, t('api_key_verified'), {
        apiKey: req.apiKey,
        apiKeyStatus: t('api_key_verified'),
    });
});

export const exampleLocalization = asyncCatch(async (req: Request, res: Response) => {
    const t = req.t;

    customSuccessResponse(res, 200, t('localization_test'), {
        localization: t('localization_test'),
        details: t('localization_test_details'),
    });
});

export const fileUploadExample = asyncCatch(async (req: Request, res: Response) => {
    const t = req.t;
    const file = req.file as Express.Multer.File;

    if (!file) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_CODES.NOT_FOUND,
            t('file_not_found_message', { ns: 'error' }),
            t('file_not_found_details', { ns: 'error' }),
            t('file_not_found_suggestion', { ns: 'error' }),
        );
    }

    customSuccessResponse(res, 200, t('file_upload'), {
        file: file.originalname,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        message: t('file_uploaded_message'),
    });
});

export const exampleMetrics = asyncCatch(async (req: Request<{}, {}, {}, metricsType['query']>, res: Response) => {
    const t = req.t;
    const { loop } = req.query;
    // convert the count and loop to number
    const loopNumber = Number(loop);
    let Loop = 0;

    // Start timing
    const startTime = Date.now();

    // loop through the count and loop
    for (let j = 0; j < loopNumber; j++) {
        Loop++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Calculate total time taken in seconds
    const Time = (Date.now() - startTime) / 1000;

    customSuccessResponse(res, 200, t('metrics_api'), {
        message: t('metrics_api_message'),
        details: t('metrics_api_loop_message', { time: Time, loop: Loop }),
    });
});
