import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { captcha } from 'tencentcloud-sdk-nodejs';
import { tencentSecretId, tencentSecretKey, captchaSecretKey, captchaAppId } from '../config';

const TencentCaptchaClient = captcha.v20190722.Client;

@Injectable()
export class CaptchaClient {
    async valid(ticket: string, ip: string, randStr: string) {
        const client = new TencentCaptchaClient({
            credential: {
                secretKey: tencentSecretKey,
                secretId: tencentSecretId,
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
                CaptchaAppId: Number(captchaAppId),
                AppSecretKey: captchaSecretKey,
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
