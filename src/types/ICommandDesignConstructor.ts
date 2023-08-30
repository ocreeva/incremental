import type { CommandId } from '@/constants';
import type CommandState from './CommandState';
import type ICommandDesign from './ICommandDesign';

declare interface ICommandDesignConstructor {
    /** The command's ID. */
    readonly id: CommandId;

    /**
     * Constructs a command's design incorporating the command's state.
     * 
     * @param state - The command's state.
     * 
     * @returns The command's design.
     */
    new(state: CommandState): ICommandDesign;
}

export default ICommandDesignConstructor;
