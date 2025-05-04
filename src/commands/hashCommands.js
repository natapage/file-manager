import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import { checkFileExists, checkArgsExist } from '../utils/validators.js';
import * as logger from '../utils/logger.js';

export async function calculateHash(path) {
    if (!checkArgsExist([path])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(path))) {
        logger.printOperationError();
        return;
    }
    const data = await fs.readFile(path);
    const hash = createHash('sha256').update(data).digest('hex');
    console.log(hash);
}
