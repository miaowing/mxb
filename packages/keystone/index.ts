import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { resolve } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import chalk from "chalk";
import { initHelper } from "./helpers";
import { Logger } from "@nestjs/common";
import { LOGGER } from "@nestcloud/common";
import { loggerConfig } from "./logger";
import { ConfigService } from "@nestjs/config";
import { PORT } from "./constants/env.constants";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: loggerConfig,
    });

    const logger = app.get<Logger>(LOGGER);
    const config = app.get<ConfigService>(ConfigService);
    const { keystone, apps } = app.get('KEYSTONE_JS_WRAPPER');

    logger.log('Initialising Keystone instance');

    const dev = process.env.NODE_ENV !== 'production';
    const port = config.get(PORT, 3000);
    const { middlewares } = await keystone.prepare({
        apps,
        dev,
        distDir: !dev ? `${__dirname}/admin` : 'dist',
    });

    logger.log('Initialised Keystone instance');

    app.use(middlewares);
    app.useStaticAssets(resolve(__dirname, 'public'));
    await app.listen(port);

    logger.log('Connecting to database');

    await keystone.connect();

    logger.log('Connected to database');
    logger.log(chalk.green.bold(`Keystone instance is ready at http://localhost:${port} 🚀`));

    const { adminPath, graphiqlPath, apiPath } = initHelper.extractAppMeta(apps, dev);
    adminPath && initHelper.ttyLink(logger, 'Keystone Admin UI:', adminPath, port);
    graphiqlPath && initHelper.ttyLink(logger, 'GraphQL Playground:', graphiqlPath, port);
    apiPath && initHelper.ttyLink(logger, 'GraphQL API:\t', apiPath, port);
}

bootstrap();
