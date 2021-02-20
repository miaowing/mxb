import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { captcha } from 'tencentcloud-sdk-nodejs';
import { ConfigService } from "@nestjs/config";
import { CAPTCHA_APP_ID, CAPTCHA_SECRET_KEY, TENCENT_SECRET_ID, TENCENT_SECRET_KEY } from "../constants/env.constants";

const TencentCaptchaClient = captcha.v20190722.Client;

@Injectable()
export class CaptchaClient {
    constructor(
        private readonly config: ConfigService,
    ) {
    }

    async valid(ticket: string, ip: string, randStr: string) {
        const client = new TencentCaptchaClient({
            credential: {
                secretKey: this.config.get(TENCENT_SECRET_KEY),
                secretId: this.config.get(TENCENT_SECRET_ID),
            },
            region: 'ap-shanghai',
            profile: {},
        });

        let res;
        try {
            res = await client.DescribeCaptchaResult({
                CaptchaType: 9,
                Ticket: ticket,
                UserIp: ip,
                Randstr: randStr,
                CaptchaAppId: Number(this.config.get(CAPTCHA_APP_ID, 0)),
                AppSecretKey: this.config.get(CAPTCHA_SECRET_KEY),
                BusinessId: 10000,
                SceneId: 1,
                NeedGetCaptchaTime: 1,
            });
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }

        if (res?.CaptchaCode !== 1) {
            throw new BadRequestException(res?.CaptchaMsg);
        }
    }
}
