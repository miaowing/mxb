import { Keystone } from "@keystonejs/keystone";
import { File, Text, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { ossAdapter } from "../clients";

export function initSiteMetadataModel(keystone: Keystone): void {
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
            external_url: { type: Url },
            admin_name: { type: Text },
            admin_email: { type: Text },
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
