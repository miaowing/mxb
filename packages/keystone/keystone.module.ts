import { DynamicModule, Global, Module } from '@nestjs/common';
import { Keystone } from "@keystonejs/keystone";
import { keystone } from "./keystone";

@Global()
@Module({})
export class KeystoneModule {
    static forRoot(): DynamicModule {
        const keystoneProvider = {
            provide: 'KEYSTONE_JS',
            useFactory: (): Keystone => keystone,
        }
        return {
            module: KeystoneModule,
            providers: [keystoneProvider],
            exports: [keystoneProvider],
        };
    }
}
