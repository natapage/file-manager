import { promises as fs, existsSync } from 'fs';
import { dirname, extname } from 'path';

export async function checkFileExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export function checkArgsExist(args) {
    return args.every(arg => arg !== undefined);
}

export function checkCommpressedFileDestination(destination) {
    const directory = dirname(destination);
    const extension = extname(destination);
    return existsSync(directory) && extension === '.br';
}
