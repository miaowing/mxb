import { Tag } from "./tag.interface";

export interface Link {
    name: string;
    url: string;
    description: string;
    tags: Tag[];
    type: 'global' | 'inner';
    enable: boolean;
    avatar: {
        publicUrl: string;
    }
}
