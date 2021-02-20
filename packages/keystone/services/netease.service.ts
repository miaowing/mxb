import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { NeteaseClient } from "../clients";
import { Interval } from "@nestcloud/schedule";
import { InjectLogger } from "@nestcloud/logger";
import { InjectRedis } from "@nestcloud/redis";
import { Redis } from "ioredis";
import { NETEASE_COOKIE, NETEASE_SONG_URL, NETEASE_SONGS } from "../constants/redis.constants";
import * as shuffle from 'shuffle-array';
import { ConfigService } from "@nestjs/config";
import { NETEASE_COUNTRY_CODE, NETEASE_PASSWORD, NETEASE_PHONE, PLAYLIST_ID } from "../constants/env.constants";

@Injectable()
export class NeteaseService implements OnModuleInit {
    private cookie: string;

    constructor(
        private readonly netease: NeteaseClient,
        @InjectLogger()
        private readonly logger: Logger,
        @InjectRedis()
        private readonly redis: Redis,
        private readonly config: ConfigService,
    ) {
    }

    async getLyric(songId: string) {
        const { lrc } = await this.netease.getLyric(songId);
        return { lyric: lrc?.lyric };
    }

    async getSongUrl(songId: string): Promise<{ url: string, size: number }> {
        let cache = await this.redis.get(`${NETEASE_SONG_URL}:${songId}`);
        if (cache) {
            return JSON.parse(cache);
        }

        const cookie = await this.redis.get(NETEASE_COOKIE);
        const { data } = await this.netease.getSongUrl(cookie, songId);
        const { url, size } = data[0] ?? {};
        if (!url) {
            throw new NotFoundException();
        }
        await this.redis.set(
            `${NETEASE_SONG_URL}:${songId}`,
            JSON.stringify({ url, size }),
            'EX',
            60 * 60 * 24,
        );

        // const url = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
        return { url, size };
    }

    async getSongs() {
        const cache = await this.redis.get(NETEASE_SONGS);
        let songs = [];
        if (cache) {
            songs = JSON.parse(cache);
        } else {
            songs = await this.refreshSongs();
        }

        shuffle(songs);
        return songs;
    }

    @Interval(5 * 60 * 1000)
    async refreshSongs() {
        const cookie = await this.redis.get(NETEASE_COOKIE);
        const playlistId = this.config.get(PLAYLIST_ID);
        const { playlist: { tracks } } = await this.netease.getPlaylistDetail(cookie, playlistId);
        await this.redis.set(NETEASE_SONGS, JSON.stringify(tracks), 'EX', 60 * 60);
        return tracks;
    }

    @Interval(5 * 60 * 1000)
    async refreshToken() {
        if (this.cookie) {
            try {
                const result = await this.netease.refresh(this.cookie);
                if (result.code === 200) {
                    this.logger.log('refresh netease token success');
                    return;
                }
            } catch (e) {
                this.logger.error(`refresh netease token error`, e);
            }
        }

        return this.onModuleInit();
    }

    async onModuleInit(): Promise<void> {
        const cookie = await this.redis.get(NETEASE_COOKIE);
        if (!cookie) {
            try {
                const result = await this.netease.login(
                    this.config.get(NETEASE_PHONE),
                    this.config.get(NETEASE_PASSWORD),
                    this.config.get(NETEASE_COUNTRY_CODE),
                );
                if (result.code === 200) {
                    this.cookie = result.cookie;

                    await this.redis.set(NETEASE_COOKIE, result.cookie);
                    this.logger.log(`init netease api success`);
                    return;
                }
                this.logger.error(`init netease api error: ${JSON.stringify(result)}`);
            } catch (e) {
                this.logger.error(`init netease api error`, e);
            }
        }
    }
}
