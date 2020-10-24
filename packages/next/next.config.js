const config = require('../../config');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withCSS(withLess({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    webpack: (config, options) => {
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
        serverUrl: config.externalUrl,
    },
}));
