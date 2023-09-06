/**
 * Enumerates the target entities for commands.
 */
enum CommandTarget {
    /** Command does not target another entity. */
    None = 'none',

    /** Command targets a host. */
    Host = 'host',

    /** Command targets a script. */
    Script = 'script',
}

export default CommandTarget;
