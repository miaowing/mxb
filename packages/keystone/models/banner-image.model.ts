import { Keystone } from "@keystonejs/keystone";
import { File, Text, Integer } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { OSSAdapterClient } from "../clients/oss-adapter.client";

export function initBannerImageModel(keystone: Keystone, ossAdapter: OSSAdapterClient): void {
    keystone.createList('BannerImage', {
        fields: {
            image: {
                type: File,
                adapter: ossAdapter,
                label: '图片',
            },
            content: { type: Text },
            sort: { type: Integer }
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
