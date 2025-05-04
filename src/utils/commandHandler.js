import * as navigation from '../commands/navigationCommands.js';
import * as fileOperations from '../commands/fileCommands.js';
import * as osInfo from '../commands/osCommands.js';
import * as hash from '../commands/hashCommands.js';
import * as compression from '../commands/compressionCommands.js';
import * as logger from '../utils/logger.js';

export async function handleCommand(input, username) {
    const [command, ...args] = input.split(' ');
    const arg1 = args[0];
    const arg2 = args[1];

    switch (command) {
        case 'up':
            navigation.up();
            break;
        case 'cd':
            navigation.changeDirectory(arg1);
            break;
        case 'ls':
            await navigation.listDirectory();
            break;
        case 'cat':
            await fileOperations.readFile(arg1);
            break;
        case 'add':
            await fileOperations.createFile(arg1);
            break;
        case 'rn':
            await fileOperations.renameFile(arg1, arg2);
            break;
        case 'rm':
            await fileOperations.deleteFile(arg1);
            break;
        case 'cp':
            await fileOperations.copyFile(arg1, arg2);
            break;
        case 'mv':
            await fileOperations.moveFile(arg1, arg2);
            break;
        case 'os':
            osInfo.getOSInfo(arg1);
            break;
        case 'hash':
            await hash.calculateHash(arg1);
            break;
        case 'compress':
            await compression.compressFile(arg1, arg2);
            break;
        case 'decompress':
            await compression.decompressFile(arg1, arg2);
            break;
        case 'mkdir':
            await navigation.createDirectory(arg1);
            break;
        case '.exit':
            logger.printExitMessage(username);
            break;
        default:
            logger.printInputError();
    }
}
