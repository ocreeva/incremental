/**
 * Enumerates the unique identifiers of all commands.
 */
enum CommandId {
    Boot = 'boot',

    Child = 'child',

    Elevate = 'elevate',

    Fork = 'fork',

    Login = 'login',
    Login_Files = 'login-files',
    Login_HR = 'login-hr',
    Login_Hub = 'login-hub',
    Login_Root = 'login-root',
    Login_Security = 'login-security',

    Overclock = 'overclock',

    Scan = 'scan',
    Scan_Files = 'scan-files',
    Scan_HR = 'scan-hr',
    Scan_Hub = 'scan-hub',
    Scan_Root = 'scan-root',
    Scan_Security = 'scan-security',
}

export default CommandId;
