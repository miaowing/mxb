import { NeteaseService } from "./netease.service";
import { SingService } from "./sing.service";
import * as shuffle from 'shuffle-array';
import { Injectable } from "@nestjs/common";
import * as request from "request";
import * as Stream from "stream";
import { randomHelper } from "../helpers";

@Injectable()
export class MusicService {
    constructor(
        private readonly neteaseService: NeteaseService,
        private readonly singService: SingService,
    ) {
    }

    async getSongs(limit = 10) {
        const songs = []
            .concat(await this.neteaseService.getSongs())
            .concat(await this.singService.getSongs());
        shuffle(songs);
        return {
            total: songs.length,
            tracks: randomHelper.getRandomArrayElements(songs, limit),
        };
    }

    async getSongUrl(songId: string, kind: string): Promise<{ url: string, size: number }> {
        let url: { url: string, size: number };
        switch (kind) {
            case 'netease':
                url = await this.neteaseService.getSongUrl(songId);
                break;
            default:
                url = await this.singService.getSongUrl(songId, kind);
        }
        return url;
    }

    async getSongStream(songId: string, kind: string): Promise<{ stream: Stream, size: number }> {
        const url = await this.getSongUrl(songId, kind);
        const stream = request.get(decodeURIComponent(url.url), {
            headers: {
                'User-Agent': '5sing%E5%8E%9F%E5%88%9B%E9%9F%B3%E4%B9%90/6081002 CFNetwork/978.0.7 Darwin/18.5.0',
                'Accept-Encoding': 'gzip,deflate'
            }
        });
        return { stream, size: url.size };
    }

    async getLyric(songId: string, kind: string) {
        switch (kind) {
            case 'netease':
                return this.neteaseService.getLyric(songId);
            default:
                return this.singService.getLyric(songId, kind);
        }
    }
}
