enum GameLoopMessageType {
    // main -> worker
    CreateRoutineAsync = 'GameLoop/CreateRoutine',
    Start = 'GameLoop/Start',
    Stop = 'GameLoop/Stop',
    Tick = 'GameLoop/Tick',

    // worker -> main
    GetScript = 'GameLoop/GetScript',
    UpdateState = 'GameLoop/UpdateState',
}

export default GameLoopMessageType;
