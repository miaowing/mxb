import { PasswordAuthStrategy } from "@keystonejs/auth-password";
import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { initModels } from "./models";
import { mongoUri } from "./config";
import { AdminUIApp } from "@keystonejs/app-admin-ui";
import { NextApp } from "./keystone-next.app";

const PROJECT_NAME = "mxb.cc";

const stone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter({ mongoUri }),
    secureCookies: false,
    cookieSecret: 'mxb.cc',
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: false,
    },
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

const authStrategy = stone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
});

export const keystone = stone;
export const apps = [
    new GraphQLApp({ apiPath: '/api' }),
    new AdminUIApp({
        adminPath: '/admin',
        apiPath: '/api',
        enableDefaultRoute: false,
        authStrategy,
    }),
    new NextApp('packages/next'),
];
