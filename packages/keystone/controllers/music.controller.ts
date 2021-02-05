import { Controller, Get, InternalServerErrorException, Param, Query, Res } from "@nestjs/common";
import { MusicService, SingService } from "../services";
import * as request from 'request';

@Controller('/nest-api/music')
export class MusicController {
    constructor(
        private readonly musicService: MusicService,
        private readonly singService: SingService,
    ) {
    }

    @Get()
    async get(@Query('limit') limit: number) {
        return this.musicService.getSongs(limit);
    }

    @Get('/kinds/:kind/songs/:songId')
    async getSingSongUrl(
        @Param('kind') kind: string,
        @Param('songId') songId: string,
        @Res() res,
    ) {
        const stream = await this.musicService.getSongUrl(songId, kind);
        try {
            stream.pipe(res);
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    @Get('/kinds/:kind/songs/:songId/lyric')
    async getLyric(@Param('kind') kind: string, @Param('songId') songId: string) {
        return this.musicService.getLyric(songId, kind);
    }
}
