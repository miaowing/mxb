import { mailer } from '../../../config';
import { emailSender } from '@keystonejs/email';
import { EmailAttachment } from "../interfaces/email-attachment.interface";

export class EmailClient {
    public async send<T extends any>(tpl: string, to: string | string[], title: string, data: T, attachments?: EmailAttachment[]) {
        const jsxEmailSender = emailSender.jsx({
            root: `${__dirname}/../templates`,
            transport: 'nodemailer',
        });

        await jsxEmailSender(tpl).send(data, {
            nodemailerConfig: mailer,
            attachments,
            subject: title,
            to: typeof to === "string" ? to : to.join(','),
            from: {
                name: mailer.auth.name,
                email: mailer.auth.user
            }
        });
    }
}
