import helmet from 'helmet';
import morgan from 'morgan';
import ruid from 'express-ruid';
import compression from 'compression';
import useragent from 'express-useragent';
import express, { type Express } from 'express';

import router from './router';
import { env } from './config/env';
import { rootRouter } from './router/root.route';
import { apiErrorHandler } from './middleware/apiErrorHandler';
import { routeNotFoundHandler } from './middleware/route.not.found';
import i18nMiddleware from './middleware/i18Next';
import { rateLimiter } from './config/rate-limiter';

// Initialize express app
const app: Express = express();

//  middlewares
app.use(helmet());
app.use(i18nMiddleware);
app.use(express.json());
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));
app.use(ruid({ setHeader: true }));
app.use(morgan(env.app.LOG_LEVEL));

// Rate limiter
app.use(rateLimiter);

// Compression
app.use(compression());

// Routes
app.use('/', rootRouter);
app.use('/api/v0', router);

// Route not found handler
app.use(routeNotFoundHandler);

// Global error handler
app.use(apiErrorHandler);

export default app;
