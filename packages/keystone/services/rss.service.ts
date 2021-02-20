import { Injectable } from "@nestjs/common";
import { Keystone } from "@keystonejs/keystone";
import { InjectKeystone } from "../decorators/inject-keystone.decorator";
import { MetadataService } from "./metadata.service";
import * as RSS from 'rss';
import { GET_POSTS } from "../graphql/post.gql";
import { Post } from "../interfaces/post.interface";
import { EXTERNAL_URL } from "../constants/env.constants";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RssService {
    constructor(
        @InjectKeystone()
        private readonly keystone: Keystone,
        private readonly metaService: MetadataService,
        private readonly config: ConfigService,
    ) {
    }

    async getRSS() {
        const meta = await this.metaService.getMetadata();
        const externalUrl = this.config.get(EXTERNAL_URL, 'https://mxb.cc');
        const feed = new RSS({
            title: meta.title,
            description: meta.description,
            feed_url: `${externalUrl}/rss.xml`,
            site_url: externalUrl,
            image_url: meta?.avatar?.publicUrl,
            managingEditor: meta.admin_email,
            webMaster: meta.admin_email,
            copyright: `${new Date().getFullYear()} ${meta.title}`,
            language: 'zh',
            ttl: '60',
        });
        const res = await this.keystone.executeGraphQL({ query: GET_POSTS, variables: { skip: 0, first: 10 } });
        const posts = res.data.allPosts as Post[];
        posts.forEach(post => feed.item({
            title: post.title,
            description: post.description,
            url: `${externalUrl}/posts/${post.key}`,
            author: meta.title,
            date: post.createdAt,
        }));

        return feed.xml();
    }
}
