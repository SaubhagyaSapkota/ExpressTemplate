import type { NextFunction, Request, Response } from 'express';

/**
 * Generic type for asynchronous Express route handlers or middleware
 * that preserves parameter types throughout the request chain.
 */
export type TAsyncFunction<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown> = (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
) => Promise<void>;

/**
 * Utility function to wrap asynchronous Express route handlers or middleware
 * and catch any errors that occur, passing them to the next error-handling middleware.
 * This version preserves the type information of the request parameters.
 *
 * @param fn - The asynchronous function to wrap
 * @returns A new function that catches errors and passes them to the next middleware
 */
export default function asyncCatch<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
    fn: TAsyncFunction<P, ResBody, ReqBody, ReqQuery>,
) {
    return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
