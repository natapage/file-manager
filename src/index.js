import { homedir } from 'os';
import { chdir } from 'process';
import { handleCommand } from './utils/commandHandler.js';
import { getUsername } from './utils/argsParser.js';
import * as logger from './utils/logger.js';

const username = getUsername();
logger.printWelcomeMessage(username);

const homeDirectory = homedir();
chdir(homeDirectory);

logger.printCurrentDirectory();

process.stdin.on('data', async (data) => {
    const input = data.toString().trim();

    try {
        await handleCommand(input, username);
    } catch (error) {
        logger.printOperationError();
    }

    logger.printCurrentDirectory();
});

process.on('SIGINT', () => logger.printExitMessage(username));
