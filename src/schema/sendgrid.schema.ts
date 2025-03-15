import { z } from 'zod';

export const twiloSendgridSchema = z.object({
    to: z.string({ required_error: 'to (receiver) is required' }).email(),
    templateId: z.string({ required_error: 'templateId is required' }),
    dynamicTemplateData: z.record(z.any()),
});

export type twiloSendgridType = z.infer<typeof twiloSendgridSchema>;
