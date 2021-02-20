import { PasswordAuthStrategy } from "@keystonejs/auth-password";
import { Keystone } from '@keystonejs/keystone';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import { initModels } from "./models";
import { AdminUIApp } from "@keystonejs/app-admin-ui";
import { NextApp } from "./keystone-next.app";
import * as expressSession from 'express-session';
import * as initMongoStore from 'connect-mongo';
import { ConfigService } from "@nestjs/config";
import { MONGO_URI, SESSION_STORE } from "./constants/env.constants";

export const initKeystone = (config: ConfigService) => {
    const MongoStore = initMongoStore(expressSession);
    const mongoUri = config.get(MONGO_URI, 'localhost:27017');
    const sessionStore = config.get(SESSION_STORE, 'memory');
    const keystone = new Keystone({
        adapter: new MongooseAdapter({ mongoUri: config.get(MONGO_URI) }),
        cookieSecret: 'mxb.cc',
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: false,
        },
        sessionStore: sessionStore === 'mongo' ? new MongoStore({ url: mongoUri }) : undefined,
    });

    initModels(keystone, config);

    const executeGraphQL = keystone.executeGraphQL.bind(keystone);
    const context = keystone.createContext({ skipAccessControl: true })
    // @ts-ignore
    keystone.executeGraphQL = async (params: { context?: any; query?: any, variables?: any }) => {
        const result = await executeGraphQL({ context, ...params });
        if ((result as any).errors) {
            throw (result as any).errors[0];
        }
        return result;
    };

    const authStrategy = keystone.createAuthStrategy({
        type: PasswordAuthStrategy,
        list: 'User',
    });
    const apps = [
        new GraphQLApp({ apiPath: '/api' }),
        new AdminUIApp({
            adminPath: '/admin',
            apiPath: '/api',
            enableDefaultRoute: false,
            authStrategy,
        }),
        new NextApp('packages/next'),
    ];
    return { keystone, apps };
}
