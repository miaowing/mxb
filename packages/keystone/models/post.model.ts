import { Keystone } from "@keystonejs/keystone";
import { Checkbox, File, Relationship, Text, Url } from "@keystonejs/fields";
import { Wysiwyg } from "@keystonejs/fields-wysiwyg-tinymce";
import { Markdown } from '@keystonejs/fields-markdown';
import { accessHelper } from "../helpers";
import { atTracking } from "@keystonejs/list-plugins";
import { Role } from "../constants/role.enum";
import { OSSAdapterClient } from "../clients/oss-adapter.client";

export function initPostModel(keystone: Keystone, ossAdapter: OSSAdapterClient): void {
    keystone.createList('Post', {
        fields: {
            key: { type: Text },
            title: { type: Text },
            tags: { type: Relationship, ref: 'Tag', many: true },
            keywords: { type: Text },
            description: { type: Text, isMultiline: true } as any,
            thumb: {
                type: File,
                adapter: ossAdapter,
                label: '缩略图',
            },
            cover: {
                type: File,
                adapter: ossAdapter,
                label: '封面图',
            },
            content: { type: Markdown },
            html_content: { type: Wysiwyg },
            publish: { type: Checkbox, label: '发布' },
            top: { type: Checkbox, label: '置顶' },
            source: { type: Text, label: '来源' },
            source_url: { type: Url },
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
        labelField: 'title',
    } as any);
}
