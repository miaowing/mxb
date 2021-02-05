import { Body, Get, Header, Post, Query } from "@nestcloud/http";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NeteaseClient {
    @Post('https://mxb.cc/apis/music/login/cellphone?flag=mxbcc')
    login(
        @Body('phone') phone: string,
        @Body('password') password: string,
        @Body('countrycode') countryCode?: string,
    ): any {
    }

    @Get('https://mxb.cc/apis/music/login/refresh')
    refresh(@Header('Cookie') cookie: string): any {
    }

    @Get('https://mxb.cc/apis/music/song/url')
    getSongUrl(@Header('Cookie') cookie: string, @Query('id') id: string): any {
    }

    @Get('https://mxb.cc/apis/music/song/detail')
    getSongsDetail(@Header('Cookie') cookie: string, @Query('ids') ids: string) {
    }

    @Get('https://mxb.cc/apis/music/playlist/detail')
    getPlaylistDetail(@Header('Cookie') cookie: string, @Query('id') id: string): any {
    }

    @Get('https://mxb.cc/apis/music/lyric')
    getLyric(@Query('id') id: string): any {
    }
}
