import { unlinkSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';

const modules = ['api', 'clients', 'constants', 'enums', 'exceptions', 'helpers', 'interfaces', 'models'];
const rootFiles = ['index', 'config', 'config.example'];
const rootPath = resolve(__dirname, '../src');
const scriptPath = resolve(__dirname, '../scripts');
try {
    cleanRootDir(rootPath);
    cleanDir(scriptPath);
    rootFiles.forEach(file => {
        unlinkSync(resolve(__dirname, '..', file + '.js'));
        unlinkSync(resolve(__dirname, '..', file + '.d.ts'));
    });
} catch {

}

function cleanRootDir(rootPath) {
    const dirs = readdirSync(rootPath);
    dirs.forEach(dir => {
        const path = resolve(rootPath, dir);
        const stats = statSync(path);
        if (stats.isFile() && (dir.includes('.js') || dir.includes('*.d.ts'))) {
            try {
                unlinkSync(path);
            } catch {

            }
        } else if (stats.isDirectory() && modules.includes(dir)) {
            const newRootPath = resolve(__dirname, path);
            cleanDir(newRootPath);
        }
    });
}

function cleanDir(rootPath) {
    const dirs = readdirSync(rootPath);
    dirs.forEach(dir => {
        const path = resolve(rootPath, dir);
        const stats = statSync(path);
        if (stats.isFile() && (dir.includes('.js') || dir.includes('.d.ts'))) {
            try {
                unlinkSync(path);
            } catch {

            }
        } else if (stats.isDirectory()) {
            const newRootPath = resolve(__dirname, path);
            cleanDir(newRootPath);
        }
    });
}
