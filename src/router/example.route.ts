import { Router } from 'express';

import {
    exampleLocalization,
    exampleMetrics,
    exampleVerifyApiKey,
    fileUploadExample,
    sendEmailExample,
    slowDownExample,
} from '../controller/example';
import upload from '../middleware/multer';
import validateSchema from '../middleware/schema.validation';
import { slowDownApi } from '../middleware/slow-down';
import { verifyApiKey } from '../middleware/verifyApiKey';
import { metricsSchema } from '../schema/example.schema';

const exampleRouter = Router();

exampleRouter.post('/send-email', sendEmailExample);
exampleRouter.post('/file-upload', upload.single('example_file'), fileUploadExample);

exampleRouter.get('/slow-down', slowDownApi, slowDownExample);
exampleRouter.get('/api-key', verifyApiKey, exampleVerifyApiKey);
exampleRouter.get('/localization', exampleLocalization);
exampleRouter.get('/metrics', validateSchema(metricsSchema), exampleMetrics);

export { exampleRouter };
