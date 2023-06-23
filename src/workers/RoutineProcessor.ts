import { RoutineModel } from '@/types';

import type { AsyncRequestProvider } from "@/services/AsyncWorkerService";
import type { InstructionState, OperationState, RoutineState, RoutineStateUpdate, ScriptState, SubroutineState } from '@/types';

class RoutineProcessor {
    private _asyncRequestProvider: AsyncRequestProvider;
    private _routine: RoutineModel | undefined;

    constructor(asyncRequestProvider: AsyncRequestProvider) {
        this._asyncRequestProvider = asyncRequestProvider;
    }

    createRoutine: (script: ScriptState) => RoutineState
    = (script) => {
        this._routine = new RoutineModel(RoutineProcessor._createRoutineState(script));
        return this._routine.state;
    }

    update: (deltaTime: number) => RoutineStateUpdate | undefined
    = (deltaTime) => {
        if (this._routine === undefined) {
            console.warn('RoutineProcessor.update called with no routine set.');
            return;
        }

        // convert deltaTime to game units (20ms)
        deltaTime /= 20;

        return this._routine.update(deltaTime);
    }

    private static _createOperationState: (instruction: InstructionState) => OperationState
    = ({ commandId }) => {
        return {
            key: crypto.randomUUID(),
            commandId,
            duration: 42,
            progress: 0,
        };
    };

    private static _createSubroutineState: (script: ScriptState) => SubroutineState
    = ({ instructions }) => {
        const allOperations = instructions.map(RoutineProcessor._createOperationState);
        const executionOrder = allOperations.map(operation => operation.key);
        const operations = allOperations.reduce<{ [key: string]: OperationState }>((lookup, operation) => {
            lookup[operation.key] = operation;
            return lookup;
        }, {});

        return {
            key: crypto.randomUUID(),
            executionOrder,
            operations,
            // TODO: move this elsewhere
            duration: Math.max(0, allOperations.reduce((value, operation) => value + operation.duration + 8, -8)),
        }
    };

    private static _createRoutineState: (script: ScriptState) => RoutineState
    = (script) => {
        if (script.instructions.length === 0) return { key: '', loadOrder: [], subroutines: {}, duration: 0 };

        const subroutine = this._createSubroutineState(script);
        const routineState: RoutineState = {
            key: '',
            loadOrder: [ subroutine.key ],
            subroutines: { [subroutine.key]: subroutine },
            duration: subroutine.duration,
        };

        return routineState;
    }
}

export default RoutineProcessor;
