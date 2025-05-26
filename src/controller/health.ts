import { Request, Response } from 'express';

import asyncCatch from '@/error/asyncCatch';
import { customSuccessResponse } from '@/utils/customSuccessResponse';
import quicker from '@/utils/quicker';

export const getHealth = asyncCatch(async (req: Request, res: Response) => {
    customSuccessResponse(res, 200, req.t('good_api_health_check'), {
        application: quicker.getApplicationHealth(),
        system: quicker.getSystemHealth(),
        timestamp: Date.now(),
    });
});
