import { DynamicModule, Global, Module } from '@nestjs/common';
import { Keystone } from "@keystonejs/keystone";
import { initKeystone } from "./keystone";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({})
export class KeystoneModule {
    static forRoot(): DynamicModule {
        const keystoneWrapperProvider = {
            provide: 'KEYSTONE_JS_WRAPPER',
            useFactory: (config: ConfigService): { keystone: Keystone, apps: any[] } => {
                return initKeystone(config);
            },
            inject: [ConfigService]
        }
        const keystoneProvider = {
            provide: 'KEYSTONE_JS',
            useFactory: ({ keystone, apps }): Keystone => {
                return keystone;
            },
            inject: ['KEYSTONE_JS_WRAPPER']
        }
        return {
            module: KeystoneModule,
            providers: [keystoneProvider, keystoneWrapperProvider],
            exports: [keystoneProvider],
        };
    }
}
