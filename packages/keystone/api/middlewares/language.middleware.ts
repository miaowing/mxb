export const languageMiddleware = () => (req, res, next) => {
    if (req.headers['accept-language'] && req.headers['accept-language'].includes('en')) {
        req.language = 'en-us';
    } else {
        req.language = 'zh-cn';
    }
    next();
};
