import { Router, Request, Response } from 'express';

import quicker from '../utils/quicker';
import asyncCatch from '../error/asyncCatch';
import { customSuccessResponse } from '../utils/customSuccessResponse';

const healthRouter = Router();

/**
 * @openapi
 * /api/v0/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check API
 *     description: Checks the health status of the API to ensure it is running properly.
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "API is healthy"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
healthRouter.get(
    '/',
    asyncCatch(async (req: Request, res: Response) => {
        customSuccessResponse(res, 200, req.t('good_api_health_check'), {
            application: quicker.getApplicationHealth(),
            system: quicker.getSystemHealth(),
            timestamp: Date.now(),
        });
    }),
);

export { healthRouter };
