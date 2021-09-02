import { Body, Get, Header, Post, Query } from "@nestcloud/http";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NeteaseClient {
    @Post(`https://music.mxb.cc/login/cellphone?flag=mxbcc`)
    login(
        @Body('phone') phone: string,
        @Body('password') password: string,
        @Body('countrycode') countryCode?: string,
    ): any {
    }

    @Get(`https://music.mxb.cc/login/refresh`)
    refresh(@Header('Cookie') cookie: string): any {
    }

    @Get(`https://music.mxb.cc/song/url`)
    getSongUrl(@Header('Cookie') cookie: string, @Query('id') id: string): any {
    }

    @Get(`https://music.mxb.cc/song/detail`)
    getSongsDetail(@Header('Cookie') cookie: string, @Query('ids') ids: string) {
    }

    @Get(`https://music.mxb.cc/playlist/detail`)
    getPlaylistDetail(@Header('Cookie') cookie: string, @Query('id') id: string): any {
    }

    @Get(`https://music.mxb.cc/lyric`)
    getLyric(@Query('id') id: string): any {
    }
}
