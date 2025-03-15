import { Router } from 'express';

import { exampleRouter } from './example.route';
import { healthRouter } from './health.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/example', exampleRouter);

export default router;
