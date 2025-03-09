import { Router } from 'express';

import { healthRouter } from './health.route';
import { testRouter } from './test.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/test', testRouter);

export default router;
