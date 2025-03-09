import { Router } from 'express';

import { slowDownExample } from '../controller/test';
import { slowDownApi } from '../middleware/slow-down';

const testRouter = Router();

testRouter.get('/slow-down', slowDownApi, slowDownExample);

export { testRouter };
