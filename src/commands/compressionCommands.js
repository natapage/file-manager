import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream, existsSync } from 'fs';
import { dirname, extname } from 'path';
import * as validator from '../utils/validators.js';
import * as logger from '../utils/logger.js';

export async function compressFile(source, destination) {
    if (!validator.checkArgsExist([source, destination])) {
        logger.printInputError();
        return;
    }

    if (!validator.checkCommpressedFileDestination(destination)) {
        console.error("Operation failed: Compression destination must be a valid path to a '.br' file");
        return;
    }

    if (!(await validator.checkFileExists(source))) {
        logger.printOperationError();
        return;
    }

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);
    const brotli = createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
}

export async function decompressFile(source, destination) {
    if (!validator.checkArgsExist([source, destination])) {
        logger.printInputError();
        return;
    }

    if (!validator.checkCommpressedFileDestination(source)) {
        console.error("Operation failed: Decompression source must be a valid path to a '.br' file");
        return;
    }

    if (!(await validator.checkFileExists(source))) {
        logger.printOperationError();
        return;
    }

    const directory = dirname(destination);

    if (!existsSync(directory)) {
        console.error("Operation failed: Decompression destination directory must exist");
        return;
    }

    if (!extname(destination)) {
        console.error("Operation failed: Decompression destination must be a valid file path, not a directory");
        return;
    }

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);
    const brotli = createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);
}
