import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { singUsername, singPassword } from "../config";
import { InjectLogger } from "@nestcloud/logger";
import { SingClient } from "../clients";
import { createHash } from 'crypto';
import { InjectRedis } from "@nestcloud/redis";
import { Redis } from 'ioredis';
import { SING_LOVE_SONGS, SING_SONG_URL, SING_TOKEN, SING_USER_ID } from "../constants/redis.constants";
import * as shuffle from 'shuffle-array';

@Injectable()
export class SingService implements OnModuleInit {
    private readonly SIGN_KEY = '5SING_KUGOU';

    constructor(
        private readonly singClient: SingClient,
        @InjectLogger()
        private readonly logger: Logger,
        @InjectRedis()
        private readonly redis: Redis,
    ) {
    }

    async getLyric(songId: string, kind: string) {
        const { data: { dynamicWords } } = await this.singClient.getSong(songId, kind);
        return { lyric: dynamicWords };
    }

    async getSongUrl(songId: string, kind: string): Promise<string> {
        let url = await this.redis.get(`${SING_SONG_URL}:${kind}:${songId}`);
        if (!url) {
            const { data, success } = await this.singClient.getSongUrl(songId, kind);
            if (!success) {
                throw new NotFoundException();
            }
            url = data?.squrl ?? data?.hqurl ?? data?.lqurl;
        }

        return url;
    }

    async getSongs() {
        const cache = await this.redis.get(SING_LOVE_SONGS);
        let songs: any[] = [];
        if (cache) {
            songs = JSON.parse(cache);
        } else {
            songs = await this.refreshSongs();
        }
        shuffle(songs);
        return songs;
    }

    async refreshSongs() {
        const userId = await this.redis.get(SING_USER_ID);
        const token = await this.redis.get(SING_TOKEN);
        const { data } = await this.singClient.getLoveSongs(userId, token);
        const songs = (data ?? []).map(item => ({
            id: item.ID,
            name: item.SN,
            ar: [{
                id: item?.user?.ID,
                name: item?.user?.NN,
            }],
            al: {
                id: item?.user?.ID,
                name: item?.user?.NN,
                picUrl: item?.user?.I,
            },
            kind: item.SK,
        }));
        await this.redis.set(SING_LOVE_SONGS, JSON.stringify(songs), 'EX', 60 * 60 * 24);
        return songs;
    }

    async onModuleInit(): Promise<void> {
        const md5 = createHash('md5');
        const sign = md5.update(`${singUsername}${this.SIGN_KEY}${singPassword}`).digest('hex');

        const token = await this.redis.get(SING_TOKEN);
        if (!token) {
            try {
                const { data, code, msg } = await this.singClient.login(singUsername, singPassword, sign);
                if (code !== 0) {
                    this.logger.error(`init 5sing api error: ${JSON.stringify(msg)}`);
                    return;
                }
                await this.redis.set(SING_USER_ID, data.userid);
                await this.redis.set(SING_TOKEN, data.sign);
            } catch (e) {
                this.logger.error(`init 5sing api error`, e);
            }
        }
    }
}
