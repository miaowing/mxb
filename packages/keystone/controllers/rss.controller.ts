import { Controller, Get, Res } from "@nestjs/common";
import { RssService } from "../services";
import { Response } from 'express';

@Controller('/rss.xml')
export class RssController {
    constructor(
        private readonly rssService: RssService
    ) {
    }

    @Get()
    async get(@Res() res: Response) {
        const rss = await this.rssService.getRSS();
        console.log(rss);
        res.header('Content-Type', 'text/xml');
        res.send(rss);
    }
}
