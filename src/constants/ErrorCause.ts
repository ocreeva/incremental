enum ErrorCause {
    Unspecified = 0,

    RoutineStopped      = 0x1,
    RoutineTimeElapsed  = 0x2,

    Mask = 0xFFFF,
}

export default ErrorCause;
