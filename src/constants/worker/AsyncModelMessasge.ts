enum AsyncModelMessage {
    // main -> worker
    CreateRoutine = 'Game/CreateRoutine',

    // worker -> main
    GetCommand = 'Game/GetCommand',
    GetInstruction = 'Game/GetInstruction',
    GetScript = 'Game/GetScript',
}

export default AsyncModelMessage;
