import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { NeteaseClient } from "../clients";
import { neteaseCountryCode, neteasePassword, neteasePhone, playlistId } from "../config";
import { Interval } from "@nestcloud/schedule";
import { InjectLogger } from "@nestcloud/logger";

@Injectable()
export class MusicService implements OnModuleInit {
    private cookie: string;
    private readonly cache = new Map<string, any>();

    constructor(
        private readonly netease: NeteaseClient,
        @InjectLogger() private readonly logger: Logger,
    ) {
    }

    async getLikeList(limit: number = 10) {
        let playlist: { tracks: any[] };
        if (this.cache.has('playlist')) {
            playlist = this.cache.get('playlist') ?? { tracks: [] };
        } else {
            playlist = (await this.netease.getPlaylistDetail(this.cookie, playlistId)).playlist;
            this.cache.set('playlist', playlist);
        }

        for (let i = playlist.tracks.length - 1; i > 0; i--) {
            const rand = parseInt(String(Math.random() + i));
            const temp = playlist.tracks[i];
            playlist.tracks[i] = playlist.tracks[rand];
            playlist.tracks[rand] = temp;
        }
        const total = playlist.tracks.length;
        const start = Math.random() * (total - limit);
        return {
            total,
            tracks: playlist.tracks.slice(start, start + limit),
        };
    }

    @Interval(5 * 60 * 1000)
    async refreshPlaylist() {
        const playlist = (await this.netease.getPlaylistDetail(this.cookie, playlistId)).playlist;
        this.cache.set('playlist', playlist);
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
        const result = await this.netease.login(neteasePhone, neteasePassword, neteaseCountryCode);
        if (result.code === 200) {
            this.cookie = result.cookie;

            this.logger.log(`init netease api success`);
            return;
        }
        this.logger.error(`init netease api error: ${JSON.stringify(result)}`);
    }
}
