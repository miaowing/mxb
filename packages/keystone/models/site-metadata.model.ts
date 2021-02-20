import { Keystone } from "@keystonejs/keystone";
import { File, Text, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { OSSAdapterClient } from "../clients/oss-adapter.client";

export function initSiteMetadataModel(keystone: Keystone, ossAdapter: OSSAdapterClient): void {
    keystone.createList('SiteMeta', {
        fields: {
            title: { type: Text },
            keywords: { type: Text },
            description: { type: Text },
            icp: { type: Text },
            icp_url: { type: Url },
            avatar: {
                type: File,
                adapter: ossAdapter,
                label: 'avatar',
            },
            avatar_background: {
                type: File,
                adapter: ossAdapter,
                label: 'avatar background',
            },
            qrcode: {
                type: File,
                adapter: ossAdapter,
                label: 'qrcode',
            },
            admin_name: { type: Text },
            admin_email: { type: Text },
            address: { type: Text },
            header_script: { type: Text, isMultiline: true }
        },
        access: {
            read: accessHelper.access(Role.ADMIN, Role.ANONYMOUS),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: false,
        },
    } as any);
}
