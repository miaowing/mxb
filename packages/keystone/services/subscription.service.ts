import { Injectable } from "@nestjs/common";
import { InjectKeystone } from "../decorators/inject-keystone.decorator";
import { createItem } from "@keystonejs/server-side-graphql-client";

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectKeystone() private readonly keystone,
    ) {
    }

    async subscribe(email: string) {
        await createItem({ keystone: this.keystone, listKey: 'Subscription', item: { email } });
    }
}
