import { Request, Response } from 'express';

import asyncCatch from '../error/asyncCatch';
import { DELAY_AFTER_REQUEST_COUNT, DELAY_AFTER_REQUEST_COUNT_EXCIDED_IN_MS, WINDOW_IN_MILI_SECONDS } from '../middleware/slow-down';
import { RequestWithRateLimit } from '../types';
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
