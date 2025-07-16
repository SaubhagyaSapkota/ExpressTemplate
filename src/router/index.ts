import { Router } from 'express';

import { exampleRouter } from '@/router/example.route';
import { healthRouter } from '@/router/health.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/example', exampleRouter);

export default router;
