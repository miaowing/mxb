import { executeDefaultServer } from './utils';
import * as entryFile from '../index';

async function bootstrap() {
  return executeDefaultServer(entryFile, undefined);
}

bootstrap();
