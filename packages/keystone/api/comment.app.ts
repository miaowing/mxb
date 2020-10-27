import * as express from 'express';
import 'express-async-errors';
import * as BodyParser from 'body-parser';
import { languageMiddleware } from "./middlewares/language.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { BadRequestException, ForbiddenException } from "./exceptions";
import { Comment } from "../interfaces/comment.interface";
import { commentService } from "./services";

export class CommentApp {
    prepareMiddleware({ keystone, dev, distDir }) {
        const middleware = express();
        middleware.use(BodyParser.json());
        middleware.use(languageMiddleware());
        middleware.post('/comment-app/comments', async (req, res, next) => {
            const data = req.body as Comment;
            if (!data.name || !data.email || !data.url || !data.content) {
                throw new BadRequestException('params required');
            }

            const isLogin = !!(req as any).session.keystoneItemId;
            if (!isLogin) {
                const isAdmin = await commentService.isAdmin(keystone, data.name, data.email);
                if (isAdmin) {
                    throw new ForbiddenException('Cannot use the admin account publish comment');
                }
            }

            const id = await commentService.commit(keystone, data);
            res.json({ success: true, id });
        });
        middleware.use(errorHandler());
        return middleware;
    }
}
