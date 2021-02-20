import { emailSender } from '@keystonejs/email';
import { EmailAttachment } from "../interfaces/email-attachment.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
    MAILER_HOST,
    MAILER_NAME,
    MAILER_PASS,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_USER
} from "../constants/env.constants";

@Injectable()
export class EmailClient {
    constructor(
        private readonly config: ConfigService,
    ) {
    }

    public async send<T extends any>(tpl: string, to: string | string[], title: string, data: T, attachments?: EmailAttachment[]) {
        const jsxEmailSender = emailSender.jsx({
            root: `${__dirname}/../templates`,
            transport: 'nodemailer',
        });

        await jsxEmailSender(tpl).send(data, {
            nodemailerConfig: {
                host: this.config.get(MAILER_HOST),
                port: this.config.get(MAILER_PORT),
                secure: this.config.get(MAILER_SECURE) === 'true',
                auth: {
                    user: this.config.get(MAILER_USER),
                    pass: this.config.get(MAILER_PASS),
                    name: this.config.get(MAILER_NAME),
                },
            },
            attachments,
            subject: title,
            to: typeof to === "string" ? to : to.join(','),
            from: {
                name: this.config.get(MAILER_NAME),
                email: this.config.get(MAILER_USER),
            }
        });
    }
}
