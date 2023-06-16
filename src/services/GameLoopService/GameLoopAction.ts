enum GameLoopAction {
    // main -> worker
    CreateRoutineAsync = 'GameLoop/CreateRoutine',
    Start = 'GameLoop/Start',
    Stop = 'GameLoop/Stop',
    Tick = 'GameLoop/Tick',

    // worker -> main
    GetScript = 'GameLoop/GetScript',
}

export default GameLoopAction;
