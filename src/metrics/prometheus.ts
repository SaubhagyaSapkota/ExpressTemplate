import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 2, 5],
});

export const prometheus = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInSeconds = duration[0] + duration[1] / 1e9;
        httpRequestDuration.labels(req.method, req.route ? req.route.path : req.path, String(res.statusCode)).observe(durationInSeconds);
    });

    next();
};

export const metrics = async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
};
