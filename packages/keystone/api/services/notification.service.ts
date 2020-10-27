import { email } from '../../clients';
import { Keystone } from "@keystonejs/keystone";
import { createItems } from '@keystonejs/server-side-graphql-client';
import { ContactMessage } from "../../interfaces/contact-message.interface";
import { BadRequestException } from "../exceptions";
import { NotificationMessage } from "../../interfaces/notification-message.interface";
import { metadataService } from "./metadata.service";

const NOTIFICATION_EMAIL_TITLE = '[Notification] You have an unread reply on zf.ink';
const CONTACT_ME_EMAIL_TITLE = '[Notification] Someone contact you on zf.ink';

export class NotificationService {
    public async sendMessage(keystone: Keystone, data: ContactMessage) {
        await createItems({
            keystone,
            listKey: 'Message',
            items: [{ data }],
        });
        const meta = await metadataService.getMetadata(keystone);
        if (!meta || !meta.admin_email) {
            throw new BadRequestException('Send message error, Please contact the administrator');
        }
        return email.send<ContactMessage>('contact-me.template.js', meta.admin_email, CONTACT_ME_EMAIL_TITLE, data);
    }

    public async notify(keystone: Keystone, emailAddress: string, data: NotificationMessage) {
        return email.send<NotificationMessage>('notification.template.js', emailAddress, NOTIFICATION_EMAIL_TITLE, data);
    }

    public async notifyMe(keystone: Keystone, data: NotificationMessage) {
        const meta = await metadataService.getMetadata(keystone);
        if (!meta || !meta.admin_email) {
            throw new BadRequestException('Send message error, Please contact the administrator');
        }
        return email.send<NotificationMessage>('notification.template.js', meta.admin_email, NOTIFICATION_EMAIL_TITLE, data);
    }
}

export const notificationService = new NotificationService();
