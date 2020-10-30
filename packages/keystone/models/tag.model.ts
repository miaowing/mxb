import { Keystone } from "@keystonejs/keystone";
import { Text, Integer } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";

export function initTagModel(keystone: Keystone): void {
    keystone.createList('Tag', {
        fields: {
            key: { type: Text },
            name: { type: Text },
            description: { type: Text, isMultiline: true } as any,
            sort: { type: Integer },
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
