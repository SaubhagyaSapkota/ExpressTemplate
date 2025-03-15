import { z } from 'zod';

export const sendEmailSchema = z.object({
    body: z.object({
        to: z.string({ required_error: 'to (receiver) is required' }).email(),
        dynamicTemplateData: z.record(z.any()),
    }),
});

export type sendEmailType = z.infer<typeof sendEmailSchema>;
