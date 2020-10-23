import { AdminUIApp } from "@keystonejs/app-admin-ui";
import { PasswordAuthStrategy } from "@keystonejs/auth-password";
import { Keystone } from "@keystonejs/keystone";

export class AdminApp extends AdminUIApp {
    constructor(keystone: Keystone) {
        const authStrategy = keystone.createAuthStrategy({
            type: PasswordAuthStrategy,
            list: 'User',
        });
        super({
            adminPath: '/admin',
            apiPath: '/api',
            enableDefaultRoute: false,
            authStrategy,
        })
    }
}
