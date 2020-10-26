import { Tag } from "./tag.interface";

export interface Post {
    id: string;
    key: string;
    title: string;
    tags: Tag[];
    keywords: string;
    description: string;
    thumb: {
        publicUrl: string;
    };
    cover: {
        publicUrl: string;
    }
    content: string;
    html_content: string;
    publish: boolean;
    top: boolean;
    source: string;
    source_url: string;
    createdAt: string;
    updatedAt: string;
}
