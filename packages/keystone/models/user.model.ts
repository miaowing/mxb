import { Keystone } from "@keystonejs/keystone";
import { Password, Select, Text } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";

export function initUserModel(keystone: Keystone): void {
    keystone.createList('User', {
        fields: {
            name: { type: Text },
            email: {
                type: Text,
                isUnique: true,
            },
            role: { type: Select, options: `${Role.ADMIN}` },
            password: {
                type: Password,
            },
        },
        access: {
            read: accessHelper.access(Role.ADMIN),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: true,
        },
    });
}
