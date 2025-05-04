import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import { fileExists } from '../utils/validators.js';
import { printOperationError } from '../utils/logger.js';

export async function calculateHash(path) {
    if (!(await fileExists(path))) {
        printOperationError();
        return;
    }
    const data = await fs.readFile(path);
    const hash = createHash('sha256').update(data).digest('hex');
    console.log(hash);
}
