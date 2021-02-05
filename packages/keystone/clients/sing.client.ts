import { Get, Header, Query, SetQuery } from "@nestcloud/http";
import { SING_VERSION } from "../constants/version.constants";


export class SingClient {
    @Get('http://mobileapi.5sing.kugou.com/user/login')
    @SetQuery('version', SING_VERSION)
    async login(
        @Query('username') username: string,
        @Query('password') password: string,
        @Query('sign') sign: string,
    ): Promise<any> {
    }

    @Get('http://mobileapi.5sing.kugou.com/song/getSongUrl')
    @SetQuery('version', SING_VERSION)
    async getSongUrl(@Query('songid') songId: string, @Query('songtype') songType: string): Promise<any> {
    }

    @Get('http://mobileapi.5sing.kugou.com/song/newget')
    @SetQuery('version', SING_VERSION)
    async getSong(@Query('songid') songId: string, @Query('songtype') songType: string): Promise<any> {
    }

    @Get('http://mobileapi.5sing.kugou.com/song/collection')
    @SetQuery('pageindex', 1)
    @SetQuery('pagesize', 9223372036854775807)
    // @SetQuery('version', SING_VERSION)
    async getLoveSongs(
        @Query('userid') userId: string,
        @Header('sign') @Query('sign') token: string,
    ): Promise<any> {
    }
}
