enum AsyncModelMessage {
    // main -> worker
    CreateRoutine = 'Game/CreateRoutine',

    // worker -> main
    GetCommandData = 'Game/GetCommandData',
    GetInstruction = 'Game/GetInstruction',
    GetScript = 'Game/GetScript',
}

export default AsyncModelMessage;
