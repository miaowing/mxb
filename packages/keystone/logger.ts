import { NestLogger } from "@nestcloud/logger";
import { resolve } from "path";

export const loggerConfig = new NestLogger({
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
});
