import next from 'next';
import { resolve } from 'path';
import nextBuild from 'next/dist/build';

export class NextApp {
    private readonly _dir: string;

    constructor(private readonly dir: string) {
        if (!dir || typeof dir !== 'string') {
            throw new Error('NextApp requires a "dir" option, which must be a string.');
        }

        this._dir = resolve(dir);
    }

    async prepareMiddleware({ dev }) {
        const nextApp = next({ dir: this._dir, dev });
        await nextApp.prepare();
        return (req, res, next) => {
            if (
                req.url.startsWith('/nest-api') ||
                req.url.startsWith('/favicon') ||
                req.url.startsWith('/rss.xml')
            ) {
                return next();
            }
            return nextApp.getRequestHandler()(req, res, next);
        };
    }

    async build() {
        return nextBuild(this._dir);
    }
}
