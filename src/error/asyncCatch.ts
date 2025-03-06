import type { NextFunction, Request, Response } from 'express';

export type TAsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Utility function to wrap asynchronous Express route handlers or middleware
 * and catch any errors that occur, passing them to the next error-handling middleware.
 *
 * @param fn - The asynchronous function to wrap
 * @returns A new function that catches errors and passes them to the next middleware
 */
export default function asyncCatch(fn: TAsyncFunction) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
