import { Keystone } from "@keystonejs/keystone";
import { Checkbox, Relationship, Text, Url } from "@keystonejs/fields";
import { Role } from "../constants/role.enum";
import { accessHelper } from "../helpers";
import { atTracking } from "@keystonejs/list-plugins";

export function initCommentModel(keystone: Keystone): void {
    keystone.createList('Comment', {
        fields: {
            page: { type: Text },
            name: { type: Text },
            email: { type: Text },
            url: { type: Url },
            content: { type: Text, isMultiline: true } as any,
            reply_to: { type: Relationship, ref: 'Comment', many: false },
            belong_to: { type: Relationship, ref: 'Comment', many: false },
            passed: { type: Checkbox },
            subscribe: { type: Checkbox },
        },
        plugins: [
            atTracking({
                updatedAtField: 'updatedAt',
                createdAtField: 'createdAt',
                format: 'YYYY-MM-DD hh:mm',
                access: true,
            }),
        ],
        access: {
            read: accessHelper.access(Role.ADMIN, Role.ANONYMOUS),
            update: accessHelper.access(Role.ADMIN),
            create: accessHelper.access(Role.ADMIN),
            delete: accessHelper.access(Role.ADMIN),
            auth: false,
        },
    });
}
