const env = process.env ?? {} as any;

export const mongoUri = env.MONGO_URI ?? 'mongodb://localhost:27017/yanrongyun-com';
export const externalUrl = env.EXTERNAL_URL ?? 'http://localhost:3000';
export const mailer = {
    host: env.MAILER_HOST ?? 'smtp.mxhichina.com',
    port: env.MAILER_PORT ?? 465,
    secure: env.MAILER_SECURE ?? true,
    auth: {
        user: env.MAILER_USER ?? '',
        pass: env.MAILER_PASS ?? ''
    },
};
export const sms = {
    accessKey: env.ALI_ACCESS_KEY ?? '',
    secretKey: env.ALI_SECRET_KEY ?? '',
};
export const redis = {
    host: env.REDIS_HOST ?? 'localhost',
    port: env.REDIS_PORT ?? 6379,
};
export const captcha = {
    registerAppKey: env.ALI_REGISTER_CAPTCHA_KEY ?? '',
}
export const oss = {
    region: 'oss-cn-beijing',
    bucket: 'yanrong-tech',
    folder: 'uploads',
}
