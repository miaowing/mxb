import { Keystone } from "@keystonejs/keystone";
import { Checkbox, Text } from "@keystonejs/fields";
import { accessHelper } from "../helpers";
import { Role } from "../constants/role.enum";

export function initReceiverModel(keystone: Keystone): void {
    keystone.createList('Receiver', {
        fields: {
            email: { type: Text },
            enable: { type: Checkbox },
            description: { type: Text, isMultiline: true }
        },
        labelField: 'email',
        access: {
            read: accessHelper.access(Role.ADMIN),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: true,
        },
    } as any);
}
