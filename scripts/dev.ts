import { executeDefaultServer } from './utils';
import * as entryFile from '../packages/keystone';

async function bootstrap() {
  return executeDefaultServer(entryFile, undefined);
}

bootstrap();
