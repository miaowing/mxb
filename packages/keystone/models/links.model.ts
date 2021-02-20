import { Keystone } from "@keystonejs/keystone";
import { Checkbox, Relationship, Text, Url, Select, File } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { OSSAdapterClient } from "../clients/oss-adapter.client";

export function initLinkModel(keystone: Keystone, ossAdapter: OSSAdapterClient): void {
    keystone.createList('Link', {
        fields: {
            name: { type: Text },
            url: { type: Url },
            description: { type: Text, isMultiline: true } as any,
            avatar: {
                type: File,
                adapter: ossAdapter,
                label: '头像',
            },
            tags: { type: Relationship, ref: 'Tag', many: true },
            type: { type: Select, options: 'global, inner' },
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
