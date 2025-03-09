import type { Request, Response } from 'express';
import { slowDown } from 'express-slow-down';

/**
 *
 * Hi folks! 👋
 * This middleware implements a "speed limit" approach to rate limiting,
 * gradually slowing down responses rather than blocking them completely.
 *
 * For more information, you can go through the documentation.
 * @documentation https://www.npmjs.com/package/express-slow-down
 */

export const WINDOW_IN_MILI_SECONDS = 15 * 60 * 1000;
export const DELAY_AFTER_REQUEST_COUNT = 3;
export const DELAY_AFTER_REQUEST_COUNT_EXCIDED_IN_MS = 100;

/**
 * So:
 *
 * - requests 1-3 are not delayed.
 * - request 4 is delayed by 400ms
 * - request 5 is delayed by 500ms
 * - request 6 is delayed by 600ms
 *
 * and so on. After 15 minutes, the delay is reset to 0.
 */
export const slowDownApi = slowDown({
    windowMs: WINDOW_IN_MILI_SECONDS,
    delayAfter: DELAY_AFTER_REQUEST_COUNT,
    delayMs: (hits) => hits * DELAY_AFTER_REQUEST_COUNT_EXCIDED_IN_MS,

    message: (req: Request, _res: Response) => ({
        error: req.t('throttleing_message', { ns: 'error' }),
    }),
});
