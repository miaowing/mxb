import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ContactMessage } from "../interfaces/contact-message.interface";
import { NotifyService } from "../services";

@Controller('/nest-api/contacts')
export class ContactMeController {
    constructor(
        private readonly notifyService: NotifyService,
    ) {
    }

    @Post()
    async contactMe(@Body() message: ContactMessage) {
        if (!message.name || !message.email || !message.message) {
            throw new BadRequestException('params required');
        }
        await this.notifyService.sendMessage(message);
        return { success: true };
    }
}
