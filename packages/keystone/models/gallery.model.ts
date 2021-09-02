import { Keystone } from "@keystonejs/keystone";
import { File, Text, Checkbox, Integer, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { OSSAdapterClient } from "../clients/oss-adapter.client";

export function initGalleryModel(keystone: Keystone, ossAdapter: OSSAdapterClient): void {
    keystone.createList('Gallery', {
        fields: {
            title: { type: Text },
            description: { type: Text },
            thumb: {
                type: File,
                adapter: ossAdapter,
                label: '背景',
            },
            cover: {
                type: File,
                adapter: ossAdapter,
                label: 'Icon',
            },
            sort: { type: Integer },
            url: { type: Url },
            publish: { type: Checkbox, label: '发布' }
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
