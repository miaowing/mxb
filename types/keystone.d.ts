declare module "@keystonejs/server-side-graphql-client" {
    import { Keystone } from "@keystonejs/keystone";

    export function createItems(options: {
        keystone: Keystone,
        listKey: string;
        items: {data: any}[];
    }): any;

    export function createItem(options: {
        keystone: Keystone,
        listKey: string;
        item: any;
    }): any;
}
