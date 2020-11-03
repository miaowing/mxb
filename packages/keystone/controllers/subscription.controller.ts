import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { SubscriptionService } from "../services";

@Controller('/nest-api/subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService,
    ) {
    }

    @Post()
    async subscribe(@Body('email') email: string) {
        if (!email) {
            throw new BadRequestException('params required');
        }

        await this.subscriptionService.subscribe(email);
    }
}
