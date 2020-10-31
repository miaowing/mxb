import { Keystone } from "@keystonejs/keystone";
import { createItems } from '@keystonejs/server-side-graphql-client';
import { ContactMessage } from "../interfaces/contact-message.interface";
import { NotificationMessage } from "../interfaces/notification-message.interface";
import { BadRequestException, Injectable } from "@nestjs/common";
import { MetadataService } from "./metadata.service";
import { InjectKeystone } from "../decorators/inject-keystone.decorator";
import { EmailClient } from "../clients";

const NOTIFICATION_EMAIL_TITLE = '[Notification] You have an unread reply on mxb.cc';
const CONTACT_ME_EMAIL_TITLE = '[Notification] Someone contact you on mxb.cc';

@Injectable()
export class NotifyService {
    constructor(
        private readonly metadataService: MetadataService,
        @InjectKeystone() private readonly keystone: Keystone,
        private readonly email: EmailClient,
    ) {
    }

    public async sendMessage(data: ContactMessage) {
        await createItems({
            keystone: this.keystone,
            listKey: 'Message',
            items: [{ data }],
        });
        const meta = await this.metadataService.getMetadata();
        if (!meta || !meta.admin_email) {
            throw new BadRequestException('Send message error, Please contact the administrator');
        }
        return this.email.send<ContactMessage>('contact-me.template.js', meta.admin_email, CONTACT_ME_EMAIL_TITLE, data);
    }

    public async notify(emailAddress: string, data: NotificationMessage) {
        return this.email.send<NotificationMessage>('notification.template.js', emailAddress, NOTIFICATION_EMAIL_TITLE, data);
    }

    public async notifyMe(data: NotificationMessage) {
        const meta = await this.metadataService.getMetadata();
        if (!meta || !meta.admin_email) {
            throw new BadRequestException('Send message error, Please contact the administrator');
        }
        return this.email.send<NotificationMessage>('notification.template.js', meta.admin_email, NOTIFICATION_EMAIL_TITLE, data);
    }
}
