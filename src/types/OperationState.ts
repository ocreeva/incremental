import type { CommandId } from '@/commands';
import type EntityState from './EntityState';

/**
 * Provides the UI state for an Operation.
 */
declare type OperationState = EntityState & {
    /** The command's ID. */
    commandId: CommandId;
    /** The operation's total duration, in game units (20ms / 1px). */
    duration: number;
    /** The operation's progress to completion, as a percentage (0-100). */
    progress: number;
};

export default OperationState;
