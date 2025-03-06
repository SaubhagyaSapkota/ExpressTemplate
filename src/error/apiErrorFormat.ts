import { v4 } from 'uuid';
import { Request } from 'express';

import { ApiError } from './ApiError';
import { env } from '../config/env';

/**
 *
 * @description: This function will format the error response in a structured way.
 */
export const apiErrorFormat = (req: Request, error: ApiError) => {
    return {
        success: false,
        status: 'error',
        statusCode: error.statusCode,
        error: {
            errorId: v4(),
            name: error.name,

            code: error.errorCode,
            message: error.message,
            details: error.details,
            suggestion: error.suggestion,

            ip: req.ip,
            /**
             *  Hi folks, I have added this note to let you know that
             * @note "ip": "::ffff:192.168.18.165", is a common practice in Node.js and it's not a bug.
             * @description IPv4 addresses appear as IPv6-mapped (e.g., ::ffff:192.168.x.x) due to IPv6 compatibility.
             *
             * @see IPv4-mapped IPv6 addresses in Node.js
             * @link https://blog.apify.com/ipv4-mapped-ipv6-in-nodejs
             *
             * @see IPv4-mapped IPv6 addresses
             * @link https://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
             */

            url: req.originalUrl,
            method: req.method,

            timestamp: error.timestamp.toISOString(),

            /**
             * @description: This is a DEV mode only feature.
             * It will show the stack trace of the error.
             */
            stack: env.app.ENV === 'development' ? error.stack : 'Please enable DEV mode to see the stack trace',
        },
    };
};
