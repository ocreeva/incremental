enum ErrorCode {
    None = 0,

    /**
     * The error cause is represented by the 4 low-order bytes of the error code.
     */
    RoutineStopped      = 1,
    RoutineTimeElapsed  = 2,

    CauseMask = 0xFFFF,

    /**
     * The error code is represented by the 4 high-order bytes of the error code.
     */

    OperationInterrupted    = 1 << 16,
    OperationUnstarted      = 2 << 16,

    CodeMask = 0xFFFF << 16,
}

export default ErrorCode;
