import { Keystone } from "@keystonejs/keystone";
import { Text } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";

export function initBannerModel(keystone: Keystone): void {
    keystone.createList('Banner', {
        fields: {
            key: { type: Text },
            title: { type: Text },
            content: { type: Text, isMultiline: true } as any,
        },
        access: {
            read: accessHelper.access(Role.ADMIN, Role.ANONYMOUS),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: false,
        },
    });
}
