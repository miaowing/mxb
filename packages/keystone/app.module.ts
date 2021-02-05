import { Module } from "@nestjs/common";
import { KeystoneModule } from "./keystone.module";
import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { components } from "@nestcloud/common";
import { LoggerModule } from "@nestcloud/logger";
import { HttpModule } from "@nestcloud/http";
import { ScheduleModule } from "@nestcloud/schedule";
import { redisDatabase, redisHost, redisPassword, redisPort } from "./config";
import { RedisModule } from "@nestcloud/redis";

@Module({
    imports: [
        KeystoneModule.forRoot(),
        LoggerModule.forRoot(),
        HttpModule.forRoot(),
        ScheduleModule.forRoot(),
        RedisModule.forRootAsync({
            inject: [],
            useFactory: () => {
                return {
                    host: redisHost,
                    port: redisPort,
                    password: redisPassword,
                    db: redisDatabase,
                }
            },
        }),
    ],
    controllers: components(controllers),
    providers: components(services, clients),
})
export class AppModule {
}
