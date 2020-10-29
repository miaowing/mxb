const env = process.env ?? {} as any;

export const port = env.PORT ?? 3000;
export const mongoUri = env.MONGO_URI ?? 'mongodb://localhost:27017/mxb-cc';
export const externalUrl = env.EXTERNAL_URL ?? 'https://mxb.cc';
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
