import { Module } from "@nestjs/common";
import { KeystoneModule } from "./keystone.module";
import * as controllers from './api/controllers';
import * as services from './api/services';
import { components } from "@nestcloud/common";
import { LoggerModule } from "@nestcloud/logger";

@Module({
    imports: [
        KeystoneModule.forRoot(),
        LoggerModule.forRoot(),
    ],
    controllers: components(controllers),
    providers: components(services),
})
export class AppModule {
}
