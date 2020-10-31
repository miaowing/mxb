import { Module } from "@nestjs/common";
import { KeystoneModule } from "./keystone.module";
import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { components } from "@nestcloud/common";
import { LoggerModule } from "@nestcloud/logger";
import { HttpModule } from "@nestcloud/http";
import { ScheduleModule } from "@nestcloud/schedule";

@Module({
    imports: [
        KeystoneModule.forRoot(),
        LoggerModule.forRoot(),
        HttpModule.forRoot(),
        ScheduleModule.forRoot(),
    ],
    controllers: components(controllers),
    providers: components(services, clients),
})
export class AppModule {
}
