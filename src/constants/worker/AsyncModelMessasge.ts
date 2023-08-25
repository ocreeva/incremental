enum AsyncModelMessage {
    // main -> worker
    CreateRoutine = 'Game/CreateRoutine',

    // worker -> main
    GetAllCommands = 'Game/GetAllCommands',
    GetInstruction = 'Game/GetInstruction',
    GetScript = 'Game/GetScript',
}

export default AsyncModelMessage;
