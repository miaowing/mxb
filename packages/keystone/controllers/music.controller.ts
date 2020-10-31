import { Controller, Get } from "@nestjs/common";
import { MusicService } from "../services";

@Controller('/nest-api/music')
export class MusicController {
    constructor(
        private readonly musicService: MusicService,
    ) {
    }

    @Get()
    async get() {
        return this.musicService.getLikeList();
    }
}
