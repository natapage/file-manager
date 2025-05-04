import { chdir, cwd } from 'process';
import { resolve, dirname } from 'path';
import { mkdir } from 'fs/promises';
import * as logger from '../utils/logger.js';
import { checkArgsExist } from '../utils/validators.js';

export function up() {
    const currentDir = cwd();
    const parentDir = dirname(currentDir);
    if (currentDir !== parentDir && currentDir !== resolve('/')) {
        chdir(parentDir);
    }
}

export async function changeDirectory(path) {
    if (!checkArgsExist([path])) {
        logger.printInputError();
        return;
    }

    try {
        const newPath = resolve(cwd(), path);
        chdir(newPath);
    } catch {
        logger.printOperationError();
    }
}

export async function listDirectory() {
    try {
        const { readdir } = await import('fs/promises');
        const files = await readdir(cwd(), { withFileTypes: true });

        const directories = files.filter(file => file.isDirectory());
        const regularFiles = files.filter(file => !file.isDirectory());

        const tableData = [
            ...directories.map(dir => ({ Name: dir.name, Type: 'directory' })),
            ...regularFiles.map(file => ({ Name: file.name, Type: 'file' }))
        ];

        console.table(tableData);
    } catch {
        logger.printOperationError();
    }
}

export async function createDirectory(directoryName) {
    if (!checkArgsExist([directoryName])) {
        logger.printInputError();
        return;
    }
    try {
        const newPath = resolve(cwd(), directoryName);
        await mkdir(newPath);
    } catch (error) {
        logger.printOperationError();
    }
}
