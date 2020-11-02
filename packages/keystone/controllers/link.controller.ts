import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from 'express';
import { Base64 } from 'js-base64';

@Controller('/nest-api/links')
export class LinkController {
    @Get('/:url')
    go(@Param('url') url: string, @Res() res: Response) {
        const link = Base64.decode(url);
        res.redirect(link);
    }
}
