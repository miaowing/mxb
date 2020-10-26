import { Keystone } from "@keystonejs/keystone";
import { Checkbox, Relationship, Text, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";

export function initLinkModel(keystone: Keystone): void {
    keystone.createList('Link', {
        fields: {
            name: { type: Text },
            url: { type: Url },
            description: { type: Text, isMultiline: true } as any,
            tags: { type: Relationship, ref: 'Tag', many: true },
            enable: { type: Checkbox },
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
