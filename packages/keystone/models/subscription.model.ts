import { Keystone } from "@keystonejs/keystone";
import { Text } from "@keystonejs/fields";
import { accessHelper } from "../helpers";
import { Role } from "../constants/role.enum";

export function initSubscriptionModel(keystone: Keystone): void {
    keystone.createList('EmailSubscription', {
        fields: {
            email: { type: Text },
        },
        access: {
            read: accessHelper.access(Role.ADMIN),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: true,
        },
    } as any);
}
