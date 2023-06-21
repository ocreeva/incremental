import type { AsyncRequestProvider } from "@/services/AsyncWorkerService";
import type { InstructionState, OperationState, RoutineState, ScriptState, SubroutineState } from '@/types';

class RoutineProcessor {
    private _asyncRequestProvider: AsyncRequestProvider;
    private _deltaTime: number = 0;
    private _routine: RoutineState | undefined;

    constructor(asyncRequestProvider: AsyncRequestProvider) {
        this._asyncRequestProvider = asyncRequestProvider;
    }

    createRoutine: (script: ScriptState) => RoutineState
    = (script) => this._routine = RoutineProcessor._createRoutine(script);

    update: (deltaTime: number) => void
    = (deltaTime) => {
        this._deltaTime += deltaTime;

        if (this._routine === undefined) {
            console.warn('RoutineProcessor.update called with no routine set.');
            return;
        }

        console.log('delta time:', deltaTime, this._deltaTime);
    }

    private static _createOperation: (instruction: InstructionState) => OperationState
    = ({ commandId }) => {
        return {
            key: crypto.randomUUID(),
            commandId,
            duration: 1,
            progress: 0,
        };
    };

    private static _createSubroutine: (script: ScriptState) => SubroutineState
    = ({ instructions }) => {
        const operations = instructions.map(RoutineProcessor._createOperation);
        return {
            key: crypto.randomUUID(),
            operations,
            // TODO: move this elsewhere
            duration: operations.reduce((value, operation) => value + operation.duration, 0.16),
        }
    };

    private static _createRoutine: (script: ScriptState) => RoutineState
    = (script) => {
        const subroutine = this._createSubroutine(script);
        return {
            key: '',
            subroutines: [ subroutine ],
            duration: subroutine.duration,
        };
    }
}

export default RoutineProcessor;
