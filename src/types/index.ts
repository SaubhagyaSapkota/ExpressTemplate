import { Request } from 'express';

export interface RateLimitInfo {
    current: number;
    limit: number;
    remaining: number;
    resetTime: Date;
}

export interface RequestWithRateLimit extends Request {
    rateLimit?: RateLimitInfo;
}
