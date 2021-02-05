const env = process.env ?? {} as any;

export const port = env.PORT ?? 3000;
export const mongoUri = env.MONGO_URI ?? 'mongodb://localhost:27017/mxb-cc';
export const externalUrl = env.EXTERNAL_URL ?? 'https://mxb.cc';
export const sessionStore = env.SESSION_STORE ?? 'memory';
export const redisHost = env.REDIS_HOST ?? 'localhost';
export const redisPort = env.REDIS_PORT ?? '6379';
export const redisPassword = env.REDIS_PORT;
export const redisDatabase = env.REDIS_DB ?? 0;

export const playlistId = env.PLAYLIST_ID ?? '127474627';
export const neteasePhone = env.NETEASE_PHONE ?? '';
export const neteasePassword = env.NETEASE_PASSWORD ?? '';
export const neteaseCountryCode = env.NETEASE_COUNTRY_CODE ?? '86';
export const singUsername = env.SING_USERNAME;
export const singPassword = env.SING_PASSWORD;


export const mailer = {
    host: env.MAILER_HOST ?? 'smtp.mxhichina.com',
    port: env.MAILER_PORT ?? 465,
    secure: env.MAILER_SECURE ?? true,
    auth: {
        name: '猫小白',
        user: env.MAILER_USER ?? '',
        pass: env.MAILER_PASS ?? ''
    },
};
export const oss = {
    accessKey: env.ALI_ACCESS_KEY ?? ' ',
    secretKey: env.ALI_SECRET_KEY ?? ' ',
    region: env.ALI_REGION ?? 'oss-cn-beijing',
    bucket: env.ALI_BUCKET ?? 'zf-ink',
    folder: env.UPLOAD_FOLDERS ?? 'uploads',
}

export const tencentSecretId = env.TENCENT_SECRET_ID ?? '';
export const tencentSecretKey = env.TENCENT_SECRET_KEY ?? '';
export const captchaAppId = env.CAPTCHA_APP_ID ?? '';
export const captchaSecretKey = env.CAPTCHA_SECRET_KEY ?? '';
