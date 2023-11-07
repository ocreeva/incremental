enum ErrorCode {
    None = 0,

    OperationInterrupted    = 0x10000,
    OperationUnstarted      = 0x20000,

    Mask = 0xFFFF0000,
}

export default ErrorCode;
