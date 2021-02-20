const {CAPTCHA_APP_ID, EXTERNAL_URL} = require("../keystone/constants/env.constants");
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withCSS(withLess({
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(svg|png|jpg)/,
            loaders: [
                'url-loader'
            ],
        });

        const originalEntry = config.entry
        config.entry = async () => {
            const entries = await originalEntry()

            if (
                entries['main.js'] &&
                !entries['main.js'].includes('./polyfills.js')
            ) {
                entries['main.js'].unshift(path.resolve(__dirname, './polyfills.js'))
            }

            return entries
        }

        return config
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        serverUrl: process.env[EXTERNAL_URL],
        captchaAppId: process.env[CAPTCHA_APP_ID],
    },
    images: {
        domains: ['mxbcc.oss-cn-beijing.aliyuncs.com'],
    },
    pageExtensions: ['tsx', 'page.tsx'],
}));
