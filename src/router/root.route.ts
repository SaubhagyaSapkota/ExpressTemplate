import { Router } from 'express';

import { root } from '@/controller/root';

const rootRouter = Router();

rootRouter.get('/', root);

export { rootRouter };
