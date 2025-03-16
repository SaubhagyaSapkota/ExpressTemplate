import { Request } from 'express';
import sgMail from '@sendgrid/mail';

import { env } from '../config/env';
import { ERROR_CODES } from '../constant/error.codes';
import { STATUS_CODES } from '../constant/status.codes';
import { ApiError } from '../error/ApiError';
import logger from '../logger/winston.logger';
import { twiloSendgridType } from '../schema/sendgrid.schema';

sgMail.setApiKey(env.sendgrid.SEND_GRID_API_KEY);

/**
 * @description Send email using SendGrid
 *
 * @param {Request} req - Express request object (used for translations)
 * @param {twiloSendgridType} payload - The email options
 * @param {string} payload.to - Recipient email address
 * @param {string} payload.templateId - SendGrid template ID
 * @param {object} payload.dynamicTemplateData - Dynamic data for the template
 *
 * @returns {Promise<void>}
 * @throws {ApiError} Throws an ApiError with translated messages if sending email fails
 *
 * @example
 * await sendEmail(req, {
 *   to: 'recipient@example.com',
 *   templateId: 'd-template-id-from-sendgrid',
 *   dynamicTemplateData: { name: 'John', resetLink: 'https://example.com/reset' }
 * });
 *
 * @see https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-nodejs
 * @see https://app.sendgrid.com/guide
 */
export const sendEmail = async (req: Request, payload: twiloSendgridType) => {
    const t = req.t;
    try {
        return await sgMail.send({
            from: env.sendgrid.SEND_GRID_FROM_EMAIL,
            to: payload.to,
            templateId: payload.templateId,
            dynamicTemplateData: payload.dynamicTemplateData,
        });
    } catch (error) {
        logger.error(error);
        throw new ApiError(
            STATUS_CODES.GENERAL_ERROR,
            ERROR_CODES.GENERAL_ERROR,
            t('email_not_sent_message', { ns: 'error' }),
            t('email_not_sent_details', { ns: 'error' }),
            t('email_not_sent_suggestion', { ns: 'error' }),
        );
    }
};
