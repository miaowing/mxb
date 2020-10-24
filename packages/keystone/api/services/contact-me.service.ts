import { email } from '../../clients';
import { Keystone } from "@keystonejs/keystone";
import { GET_RECEIVERS } from "../graphql/email.gql";
import { ContactMessage } from "../../interfaces/contact-message.interface";

export class ContactMeService {
    public async sendMessage(keystone: Keystone, data: ContactMessage) {
        await keystone.createItems({
            Message: [data],
        });
        const res = await keystone.executeQuery(GET_RECEIVERS, {} as any);
        const receivers = res.data.allReceivers.map(item => item.email);
        return email.send<ContactMessage>('contact-me.template.jsx', receivers, '来自ZF.INK的消息', data);
    }
}
