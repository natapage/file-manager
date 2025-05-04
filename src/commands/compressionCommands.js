import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { fileExists } from '../utils/validators.js';
import { printOperationError } from '../utils/logger.js';

export async function compressFile(source, destination) {
    if (!(await fileExists(source))) {
        printOperationError();
        return;
    }
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);
    const brotli = createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
}

export async function decompressFile(source, destination) {
    if (!(await fileExists(source))) {
        printOperationError();
        return;
    }
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);
    const brotli = createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);
}
