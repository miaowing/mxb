import { Module } from "@nestjs/common";
import { KeystoneModule } from "./keystone.module";
import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { components } from "@nestcloud/common";
import { LoggerModule } from "@nestcloud/logger";
import { HttpModule } from "@nestcloud/http";
import { ScheduleModule } from "@nestcloud/schedule";
import { RedisModule } from "@nestcloud/redis";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./constants/env.constants";
import { resolve } from 'path';

@Module({
    imports: [
        KeystoneModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                resolve(__dirname, '.env.production'),
                resolve(__dirname, '.env.development'),
                resolve(__dirname, '.env'),
            ]
        }),
        LoggerModule.forRoot(),
        HttpModule.forRoot(),
        ScheduleModule.forRoot(),
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    host: config.get(REDIS_HOST, 'localhost'),
                    port: config.get(REDIS_PORT, 6379),
                    password: config.get(REDIS_PASSWORD),
                    db: config.get(REDIS_DB, 0),
                }
            },
        }),
    ],
    controllers: components(controllers),
    providers: components(services, clients),
})
export class AppModule {
}
