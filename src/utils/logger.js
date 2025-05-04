import { cwd } from 'process';

export function printCurrentDirectory() {
    console.log(`You are currently in ${cwd()}`);
}

export function printInputError() {
    console.error('Invalid input');
}

export function printOperationError() {
    console.error('Operation failed');
}

export function printExitMessage(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}

export function printWelcomeMessage(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
}
