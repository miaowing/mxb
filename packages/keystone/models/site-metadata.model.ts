import { Keystone } from "@keystonejs/keystone";
import { Text, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";

export function initSiteMetadataModel(keystone: Keystone): void {
    keystone.createList('SiteMeta', {
        fields: {
            title: { type: Text },
            icp: { type: Text },
            icp_url: { type: Url },
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
