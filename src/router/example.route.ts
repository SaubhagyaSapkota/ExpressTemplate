import { Router } from 'express';

import { exampleLocalization, exampleVerifyApiKey, fileUploadExample, sendEmailExample, slowDownExample } from '../controller/example';
import upload from '../middleware/multer';
import { slowDownApi } from '../middleware/slow-down';
import { verifyApiKey } from '../middleware/verifyApiKey';

const exampleRouter = Router();

exampleRouter.post('/send-email', sendEmailExample);
exampleRouter.post('/file-upload', upload.single('example_file'), fileUploadExample);

exampleRouter.get('/slow-down', slowDownApi, slowDownExample);
exampleRouter.get('/api-key', verifyApiKey, exampleVerifyApiKey);
exampleRouter.get('/localization', exampleLocalization);

export { exampleRouter };
