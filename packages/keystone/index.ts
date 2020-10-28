require('tls').DEFAULT_MIN_VERSION = 'TLSv1';

import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { resolve } from 'path';

import { initModels } from "./models";
import { AdminApp, CommentApp, EmailApp, StaticApp } from './api';
import { NextApp } from "@keystonejs/app-next";
import { mongoUri } from "./config";

const PROJECT_NAME = "mxb.cc";

const stone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter({ mongoUri }),
    secureCookies: false,
    cookieSecret: 'mxb.cc'
});

initModels(stone);

const executeGraphQL = stone.executeGraphQL.bind(stone);
const context = stone.createContext({ skipAccessControl: true })
// @ts-ignore
stone.executeGraphQL = async (params: { context?: any; query?: any, variables?: any }) => {
    const result = await executeGraphQL({ context, ...params });
    if ((result as any).errors) {
        throw (result as any).errors[0];
    }
    return result;
};

export const keystone = stone;
export const apps = [
    new GraphQLApp({ apiPath: '/api' }),
    new AdminApp(stone),
    new EmailApp(),
    new CommentApp(),
    new StaticApp({
        path: '/public',
        src: resolve(__dirname, '/public'),
    }),
    new NextApp({ dir: 'packages/next' }),
];
