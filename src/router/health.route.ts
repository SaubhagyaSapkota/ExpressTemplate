import { Router } from 'express';

import { getHealth } from '@/controller/health';

const healthRouter = Router();

healthRouter.get('/', getHealth);

export { healthRouter };
