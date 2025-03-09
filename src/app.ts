import express, { type Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ruid from 'express-ruid';
import useragent from 'express-useragent';
import helmet from 'helmet';
import morgan from 'morgan';
import requestIp from 'request-ip';

import { env } from './config/env';
import { apiErrorHandler } from './middleware/apiErrorHandler';
import i18nMiddleware from './middleware/i18Next';
import { rateLimiter } from './middleware/rate-limiter';
import { routeNotFoundHandler } from './middleware/route.not.found';
import router from './router';
import { rootRouter } from './router/root.route';

/**
 * Initialize Express application
 */
const app: Express = express();

/**
 * CORE MIDDLEWARE
 * Essential middleware that should run first for every request
 */

// Request identification
app.use(ruid({ setHeader: true })); // Assigns a unique ID to each request
app.use(requestIp.mw()); // Extracts client IP address
app.use(useragent.express()); // Parses user agent information

/**
 * LOCALIZATION MIDDLEWARE
 * Handles internationalization and language preferences
 */
app.use(i18nMiddleware); // Adds internationalization support

/**
 * SECURITY MIDDLEWARE
 * Protection-related middleware to secure the application
 */
app.use(helmet()); // Sets various HTTP headers for security
app.use(
    cors({
        // Cross-Origin Resource Sharing configuration
        origin: env.app.CLIENT_URL,
        credentials: true,
    }),
);
app.use(rateLimiter); // Limits request rate to prevent abuse

/**
 * PARSING MIDDLEWARE
 * Handles request body and data parsing
 */
app.use(express.json({ limit: '16kb' })); // JSON body parser
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // URL-encoded data parser
app.use(cookieParser()); // Cookie parser

/**
 * PERFORMANCE & UTILITY MIDDLEWARE
 * Enhances response delivery and application performance
 */
app.use(compression()); // Compresses response bodies
app.use(express.static('public')); // Serves static files from public directory

/**
 * LOGGING MIDDLEWARE
 * Request logging for debugging and monitoring
 */
app.use(morgan(env.app.LOG_LEVEL)); // HTTP request logger

/**
 * ROUTES
 * Application routes and API endpoints
 */
app.use('/', rootRouter); // Base routes
app.use('/api/v0', router); // API v0 routes

/**
 * ERROR HANDLING MIDDLEWARE
 * Must be placed after all routes to catch errors
 */
app.use(routeNotFoundHandler); // Handles 404 errors for undefined routes
app.use(apiErrorHandler); // Global API error handler

export default app;
