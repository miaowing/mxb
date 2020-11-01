import { Controller, Get, Query } from "@nestjs/common";
import { MusicService } from "../services";

@Controller('/nest-api/music')
export class MusicController {
    constructor(
        private readonly musicService: MusicService,
    ) {
    }

    @Get()
    async get(@Query('limit') limit: number) {
        return this.musicService.getLikeList(limit);
    }
}
