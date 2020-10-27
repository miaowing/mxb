import * as express from 'express';
import 'express-async-errors';
import * as BodyParser from 'body-parser';
import { languageMiddleware } from "./middlewares/language.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { ContactMessage } from "../interfaces/contact-message.interface";
import { notificationService } from "./services";
import { BadRequestException } from "./exceptions";

export class EmailApp {
    prepareMiddleware({ keystone, dev, distDir }) {
        const middleware = express();
        middleware.use(BodyParser.json());
        middleware.use(languageMiddleware());
        middleware.post('/email-app/messages', async (req, res, next) => {
            const data = req.body as ContactMessage;
            if (!data.name || !data.email || !data.message) {
                throw new BadRequestException('params required');
            }
            await notificationService.sendMessage(keystone, data);
            res.json({ success: true });
        });
        middleware.use(errorHandler());
        return middleware;
    }
}
