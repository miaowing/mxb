import * as express from 'express';
import 'express-async-errors';
import * as BodyParser from 'body-parser';
import { languageMiddleware } from "./middlewares/language.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";

export class EmailApp {
    prepareMiddleware({ keystone, dev, distDir }) {
        const middleware = express();
        middleware.use(BodyParser.json());
        middleware.use(languageMiddleware());
        middleware.post('/email-app/trial-apply', async (req, res, next) => {
            const language = req.get('x-language') ?? 'zh-cn';
            res.json({ success: true });
        });
        middleware.post('/email-app/download-apply', async (req, res, next) => {
            const language = req.get('x-language') ?? 'zh-cn';
            res.json({ success: true });
        });
        middleware.use(errorHandler());
        return middleware;
    }
}
