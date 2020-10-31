import { BadRequestException, Body, Controller, ForbiddenException, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { Comment } from "../interfaces/comment.interface";
import { CommentService } from "../services";
import { InjectKeystone } from "../decorators/inject-keystone.decorator";
import { Keystone } from "@keystonejs/keystone";

@Controller('/nest-api/comments')
export class CommentController {
    constructor(
        @InjectKeystone() private readonly keystone: Keystone,
        private readonly commentService: CommentService,
    ) {
    }

    @Post()
    async comment(@Body() comment: Comment, @Req() req: Request) {
        if (!comment.name || !comment.email || !comment.content) {
            throw new BadRequestException('params required');
        }

        const isLogin = !!(req as any).session.keystoneItemId;
        if (!isLogin) {
            const isAdmin = await this.commentService.isAdmin(comment.name, comment.email);
            if (isAdmin) {
                throw new ForbiddenException('Cannot use the admin account publish comment');
            }
        }

        const id = await this.commentService.commit(comment);
        return { success: true, id };
    }
}
