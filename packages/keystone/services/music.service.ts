import { NeteaseService } from "./netease.service";
import { SingService } from "./sing.service";
import * as shuffle from 'shuffle-array';
import { Injectable } from "@nestjs/common";
import * as request from "request";
import * as Stream from "stream";

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
        const total = songs.length;
        const start = Math.random() * (total - limit);
        return {
            total,
            tracks: songs.slice(start, start + limit),
        };
    }

    async getSongUrl(songId: string, kind: string): Promise<Stream> {
        let url;
        switch (kind) {
            case 'netease':
                url = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
                break;
            default:
                url = await this.singService.getSongUrl(songId, kind);
        }
        return request.get(decodeURIComponent(url), {
            headers: {
                'User-Agent': '5sing%E5%8E%9F%E5%88%9B%E9%9F%B3%E4%B9%90/6081002 CFNetwork/978.0.7 Darwin/18.5.0',
                'Accept-Encoding': 'gzip,deflate'
            }
        });
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
