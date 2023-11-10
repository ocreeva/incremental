const CodeOffset = 16;
const SubcodeOffset = 0;

/** Message IDs are numeric values composed of two parts: a code and a subcode. */
enum MessageId {
    OperationInterrupted    = 0x0001 << CodeOffset,
    OperationUnstarted      = 0x0002 << CodeOffset,

    RoutineStopped          = 0x0001 << SubcodeOffset,
    RoutineTimeElapsed      = 0x0002 << SubcodeOffset,

    Mask_Code       = 0xFFFF << CodeOffset,
    Mask_Subcode    = 0xFFFF << SubcodeOffset,
}

export default MessageId;
