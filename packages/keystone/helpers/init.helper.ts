import chalk from "chalk";
import * as terminalLink from 'terminal-link';
import * as ciInfo from 'ci-info';

export class InitHelper {
    ttyLink(logger, text, path, port) {
        if (ciInfo.isCI) {
            return;
        }
        const url = `http://localhost:${port}${path}`;
        const link = terminalLink(url, url, { fallback: () => url });
        logger.log(`🔗 ${chalk.green(text)}\t${link}`);
    };

    extractAppMeta(apps, dev) {
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
}
