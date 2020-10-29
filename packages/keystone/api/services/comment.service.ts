import { Keystone } from "@keystonejs/keystone";
import { Comment } from "../../interfaces/comment.interface";
import { createItem } from '@keystonejs/server-side-graphql-client';
import { GET_COMMENT } from "../graphql/comment.gql";
import { externalUrl } from '../../config';
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectKeystone } from "../../decorators/inject-keystone.decorator";
import { MetadataService } from "./metadata.service";
import { NotifyService } from "./notify.service";

@Injectable()
export class CommentService {
    constructor(
        @InjectKeystone() private readonly keystone: Keystone,
        private readonly metadataService: MetadataService,
        private readonly notifyService: NotifyService,
    ) {
    }

    async isAdmin(name: string, email: string): Promise<boolean> {
        const metadata = await this.metadataService.getMetadata();
        return name === metadata.admin_name || email === metadata.admin_email;
    }

    async commit(comment: Comment) {
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
            const res = await this.keystone.executeGraphQL({
                query: GET_COMMENT,
                variables: { id: comment.replyTo, page: comment.page },
            });
            const reply = res.data.Comment;
            data.reply_to = { connect: { id: reply.id } };
            replyEmail = reply.email;
            isSubscribe = reply.subscribe;
        }
        if (comment.belongTo) {
            const res = await this.keystone.executeGraphQL({
                query: GET_COMMENT,
                variables: { id: comment.belongTo, page: comment.page },
            });
            data.belong_to = { connect: { id: res.data.Comment.id } };
        }

        const { id } = await createItem({ keystone: this.keystone, listKey: 'Comment', item: data });

        if (isSubscribe) {
            const meta = await this.metadataService.getMetadata();
            if (replyEmail) {
                this.notifyService.notify(replyEmail, {
                    content: comment.content,
                    url: `${externalUrl}${comment.page}#${comment.replyTo}`
                });
            } else {
                this.notifyService.notifyMe({
                    content: comment.content,
                    url: `${externalUrl}${comment.page}#${id}`
                })
            }
        }

        return id;
    }
}
