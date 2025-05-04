import { promises as fs } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { basename, resolve } from 'path';
import { checkFileExists, checkArgsExist } from '../utils/validators.js';
import * as logger from '../utils/logger.js';

export async function readFile(path) {
    if (!checkArgsExist([path])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(path))) {
        logger.printOperationError();
        return;
    }

    const data = await fs.readFile(path, 'utf-8');
    console.log(data);
}

export async function createFile(name) {
    if (!checkArgsExist([name])) {
        logger.printInputError();
        return;
    }
    try {
        await fs.writeFile(name, '', { flag: 'wx' });
    } catch {
        logger.printOperationError();
    }
}

export async function renameFile(filePath, newName) {
    if (!checkArgsExist([filePath, newName])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(filePath))) {
        logger.printOperationError();
        return;
    }

    const { dirname, resolve } = await import('path');
    const directory = dirname(filePath);
    const newPath = resolve(directory, newName);
    await fs.rename(filePath, newPath);
}

export async function deleteFile(path) {
    if (!checkArgsExist([path])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(path))) {
        logger.printOperationError();
        return;
    }
    await fs.unlink(path);
}

export async function copyFile(source, destination) {
    if (!checkArgsExist([source, destination])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(source))) {
        logger.printOperationError();
        return;
    }

    const destinationPath = resolve(destination, basename(source));
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

    return new Promise((resolve, reject) => {
        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', resolve);
        readStream.pipe(writeStream);
    });
}

export async function moveFile(source, destination) {
    if (!checkArgsExist([source, destination])) {
        logger.printInputError();
        return;
    }
    if (!(await checkFileExists(source))) {
        logger.printOperationError();
        return;
    }

    const destinationPath = resolve(destination, basename(source));
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destinationPath);

    try {
        await new Promise((resolve, reject) => {
            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
            readStream.pipe(writeStream);
        });
        await fs.unlink(source);
    } catch {
        logger.printOperationError();
    }
}
