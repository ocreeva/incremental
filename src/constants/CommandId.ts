/**
 * Enumerates the unique identifiers of all commands.
 */
enum CommandId {
    Boot = 'boot',

    Child = 'child',

    Elevate = 'elevate',

    Fork = 'fork',

    Index = 'index',
    Index_Hub = 'index-hub',
    Index_Files = 'index-files',
    Index_HR = 'index-hr',
    Index_Security = 'index-security',
    Index_Core = 'index-core',

    Login = 'login',
    Login_Files = 'login-files',
    Login_HR = 'login-hr',
    Login_Security = 'login-security',
    Login_Core = 'login-core',
    Login_Hub = 'login-hub',

    Overclock = 'overclock',

    Scan = 'scan',
    Scan_Hub = 'scan-hub',
    Scan_Files = 'scan-files',
    Scan_HR = 'scan-hr',
    Scan_Security = 'scan-security',
    Scan_Core = 'scan-core',
}

export default CommandId;
