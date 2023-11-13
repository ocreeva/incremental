const SeverityOffset = 30;
const CodeOffset = 16;
const SubcodeOffset = 0;

export enum MessageSeverity {
    Error   = 0x3 << SeverityOffset,
    Warning = 0x2 << SeverityOffset,
    Notice  = 0x1 << SeverityOffset,
    Detail  = 0x0 << SeverityOffset,
}

/**
 * Message IDs are numeric values composed of two parts: a code and a subcode. The message code is further annotated by
 * the default message severity.
 */
enum MessageId {
    OperationInterrupted    = 0x0001 << CodeOffset | MessageSeverity.Notice,
    OperationUnstarted      = 0x0002 << CodeOffset | MessageSeverity.Notice,

    RoutineStopped          = 0x0001 << SubcodeOffset,
    RoutineTimeElapsed      = 0x0002 << SubcodeOffset,

    Mask_Severity   = 0x3    << SeverityOffset,
    Mask_Code       = 0xFFFF << CodeOffset,
    Mask_Subcode    = 0xFFFF << SubcodeOffset,
}

export default MessageId;
