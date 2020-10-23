import * as terminalLink from 'terminal-link';
import * as express from 'express';
import * as ciInfo from 'ci-info';
import chalk from 'chalk';
import * as path from 'path';

import { DEFAULT_ENTRY, DEFAULT_PORT } from './constants';

const ttyLink = (text, path, port) => {
    if (ciInfo.isCI) {
        return;
    }
    const url = `http://localhost:${port}${path}`;
    const link = terminalLink(url, url, { fallback: () => url });
    console.log(`🔗 ${chalk.green(text)}\t${link}`);
};

function extractAppMeta(apps, dev) {
    let adminPath;
    let graphiqlPath;
    let apiPath;

    apps.forEach(app => {
        switch (app.constructor.name) {
            case 'AdminUIApp': {
                adminPath = app.adminPath;
                break;
            }
            case 'GraphQLApp': {
                apiPath = app._apiPath;
                graphiqlPath = dev ? app._graphiqlPath : undefined;
                break;
            }
        }
    });

    return {
        adminPath,
        graphiqlPath,
        apiPath,
    };
}

export async function executeDefaultServer(entryFile, distDir) {
    let status = 'start-server';

    console.log('Starting Keystone server');
    const app = express();
    app.set('trust proxy', true);
    app.use((req, res, next) => {
        if (status === 'started') {
            next();
        } else {
            res.format({
                default: () => res.sendFile(path.resolve(__dirname, './loading.html')),
                'text/html': () => res.sendFile(path.resolve(__dirname, './loading.html')),
                'application/json': () => res.json({ loading: true, status }),
            });
        }
    });

    const { server } = await new Promise((resolve, reject) => {
        const server = app.listen(DEFAULT_PORT, error => {
            if (error) {
                return reject(error);
            }
            return resolve({ server });
        });
    });

    console.log(`Keystone server listening on port ${DEFAULT_PORT}`);
    console.log('Initialising Keystone instance');

    status = 'init-keystone';

    // Allow the spinner time to flush its output to the console.
    await new Promise(resolve => setTimeout(resolve, 100));

    const {
        keystone,
        apps = [],
        configureExpress = () => {
        },
        cors,
        pinoOptions,
    } = entryFile;

    configureExpress(app);

    console.log('Initialised Keystone instance');
    console.log('Connecting to database');

    status = 'db-connect';

    const dev = process.env.NODE_ENV !== 'production';

    const { middlewares } = await keystone.prepare({ apps, distDir, dev, cors, pinoOptions });

    await keystone.connect();

    console.log('Connected to database');
    console.log('Preparing to accept requests');

    app.use(middlewares);
    status = 'started';
    console.log(chalk.green.bold(`Keystone instance is ready at http://localhost:${DEFAULT_PORT} 🚀`));

    const { adminPath, graphiqlPath, apiPath } = extractAppMeta(apps, dev);

    /* eslint-disable no-unused-expressions */
    adminPath && ttyLink('Keystone Admin UI:', adminPath, DEFAULT_PORT);
    graphiqlPath && ttyLink('GraphQL Playground:', graphiqlPath, DEFAULT_PORT);
    apiPath && ttyLink('GraphQL API:\t', apiPath, DEFAULT_PORT);
    /* eslint-enable no-unused-expressions */

    return { port: DEFAULT_PORT, server };
}
