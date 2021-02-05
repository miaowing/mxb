import { Controller, Get, Headers, InternalServerErrorException, Param, Query, Req, Res } from "@nestjs/common";
import { MusicService, SingService } from "../services";
import { Response, Request } from 'express';

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
    async getSongUrl(
        @Param('kind') kind: string,
        @Param('songId') songId: string,
        @Res() res: Response,
    ) {
        const { url } = await this.musicService.getSongUrl(songId, kind);
        res.redirect(url);
    }

    @Get('/kinds/:kind/songs/:songId/stream')
    async getSingSongStream(
        @Param('kind') kind: string,
        @Param('songId') songId: string,
        @Headers('range') range: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { stream, size } = await this.musicService.getSongStream(songId, kind);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', size);
        if (range === 'bytes=0-1') {
            res.setHeader('Content-Range', `bytes 0-1/${size}`);
            res.send('1');
            return;
        }

        res.setHeader('Accept-Ranges', 'bytes');

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
