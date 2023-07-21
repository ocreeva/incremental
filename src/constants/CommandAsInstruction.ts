/**
 * Enumerates the behaviors of commands when presented as instructions.
 */
enum CommandAsInstruction {
    /** Default behavior. */
    Default = 'default',

    /** Instruction targets a script. */
    TargetScript = 'targetScript',
}

export default CommandAsInstruction;
