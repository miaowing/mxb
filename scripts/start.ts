import * as path from 'path';
import { executeDefaultServer } from './utils';
import { DEFAULT_DIST_DIR } from './constants';
import * as entryFile from '../packages/keystone/.keystone';

async function bootstrap() {
    // @ts-ignore
    process.env.NODE_ENV = 'production';

    const distDir = path.resolve(__dirname, '../', DEFAULT_DIST_DIR);
    return executeDefaultServer(entryFile, distDir);
}

bootstrap();
