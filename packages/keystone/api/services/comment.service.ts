import { Keystone } from "@keystonejs/keystone";
import { Comment } from "../../interfaces/comment.interface";
import { createItem } from '@keystonejs/server-side-graphql-client';
import { GET_COMMENT } from "../graphql/comment.gql";
import { BadRequestException } from "../exceptions";
import { metadataService } from "./metadata.service";
import { notificationService } from "./notification.service";
import { externalUrl } from '../../config';

export class CommentService {
    async isAdmin(keystone: Keystone, name: string, email: string): Promise<boolean> {
        const metadata = await metadataService.getMetadata(keystone);
        return name === metadata.admin_name || email === metadata.admin_email;
    }

    async commit(keystone: Keystone, comment: Comment) {
        const data = {
            page: comment.page,
            name: comment.name,
            email: comment.email,
            url: comment.url,
            content: comment.content,
            subscribe: comment.subscribe,
            reply_to: null,
            belong_to: null,
            passed: true,
        }
        if ((comment.replyTo && !comment.belongTo) || (!comment.replyTo && comment.belongTo)) {
            throw new BadRequestException('Invalid request');
        }

        let replyEmail;
        let isSubscribe;
        if (comment.replyTo) {
            const res = await keystone.executeGraphQL({
                query: GET_COMMENT,
                variables: { id: comment.replyTo, page: comment.page },
            });
            const reply = res.data.Comment;
            data.reply_to = { connect: { id: reply.id } };
            replyEmail = reply.email;
            isSubscribe = reply.subscribe;
        }
        if (comment.belongTo) {
            const res = await keystone.executeGraphQL({
                query: GET_COMMENT,
                variables: { id: comment.belongTo, page: comment.page },
            });
            data.belong_to = { connect: { id: res.data.Comment.id } };
        }

        const { id } = await createItem({ keystone, listKey: 'Comment', item: data });

        if (isSubscribe) {
            const meta = await metadataService.getMetadata(keystone);
            if (replyEmail) {
                notificationService.notify(keystone, replyEmail, {
                    content: comment.content,
                    url: `${externalUrl}${comment.page}#${comment.replyTo}`
                });
            } else {
                notificationService.notifyMe(keystone, {
                    content: comment.content,
                    url: `${externalUrl}${comment.page}#${id}`
                })
            }
        }

        return id;
    }
}

export const commentService = new CommentService();
