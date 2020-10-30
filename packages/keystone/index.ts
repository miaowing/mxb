import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { apps, keystone } from "./keystone";
import { NestLogger } from "@nestcloud/logger";
import { resolve } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import chalk from "chalk";
import { initHelper } from "./helpers";
import { Logger } from "@nestjs/common";
import { LOGGER } from "@nestcloud/common";
import { port } from "./config";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: new NestLogger({
            level: 'debug',
            transports: [
                {
                    transport: 'console',
                    colorize: true,
                    datePattern: 'YYYY-MM-DD HH:mm:ss',
                    label: 'mxb',
                    level: 'debug',
                },
                {
                    transport: 'dailyRotateFile',
                    datePattern: 'YYYY-MM-DD HH:mm:ss',
                    label: 'mxb',
                    filename: resolve(__dirname, '../../logs/mxb-%DATE%.log'),
                    zippedArchive: true,
                    level: 'debug',
                    maxSize: '20m',
                    maxFiles: '14d'
                } as any,
            ]
        }),
    });

    const logger = app.get<Logger>(LOGGER);

    logger.log('Initialising Keystone instance');

    const dev = process.env.NODE_ENV !== 'production';
    const { middlewares } = await keystone.prepare({
        apps: apps as any,
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
