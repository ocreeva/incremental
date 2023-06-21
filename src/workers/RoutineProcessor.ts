import { AsyncRequestProvider } from "@/services/AsyncWorkerService";
import { Instruction, Operation, Routine, Script, Subroutine } from "@/types";

class RoutineProcessor {
    private _asyncRequestProvider: AsyncRequestProvider;
    private _deltaTime: number = 0;
    private _routine: Routine | undefined;

    constructor(asyncRequestProvider: AsyncRequestProvider) {
        this._asyncRequestProvider = asyncRequestProvider;
    }

    createRoutine: (script: Script) => Routine
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

    private static _createOperation: (instruction: Instruction) => Operation
    = ({ commandId }) => {
        return {
            id: crypto.randomUUID(),
            commandId,
            executionTime: 1,
            progress: 0,
        };
    };

    private static _createSubroutine: (script: Script) => Subroutine
    = ({ instructions }) => {
        const operations = instructions.map(RoutineProcessor._createOperation);
        return {
            id: crypto.randomUUID(),
            operations,
            // TODO: move this elsewhere
            executionTime: operations.reduce((value, operation) => value + operation.executionTime, 0.16),
        }
    };

    private static _createRoutine: (script: Script) => Routine
    = (script) => {
        const subroutine = this._createSubroutine(script);
        return {
            subroutines: [ subroutine ],
            executionTime: subroutine.executionTime,
        };
    }
}

export default RoutineProcessor;
