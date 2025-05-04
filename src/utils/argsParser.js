export function getUsername() {
    const username = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];
    return username && username !== 'your_username' ? username : 'Guest';
}
