import type { OperationState } from './OperationTypes';
import type { RoutineState } from './RoutineTypes';
import type { SubroutineState } from './SubroutineTypes';

/**
 * A message with a string type and an associated payload.
 * 
 * @template P The type of the message's payload.
 * @template T The type used for the message type.
 * @template R The type of the message's request ID. (optional)
 */
export type PayloadMessage<P = void, T extends string = string, R extends string | never = never> = {
    payload: P;
    type: T;
} & ([R] extends [never] ? {} : {
    requestId: R;
});

export type CreateRoutineResponsePayload = {
    operations: OperationState[];
    subroutines: SubroutineState[];
    routine: RoutineState;
};
