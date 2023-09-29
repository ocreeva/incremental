import type { CommandId } from '@/constants';

import type CommandView from './CommandView';
import type ICommandDesign from './ICommandDesign';

declare interface ICommandDesignConstructor {
    /** The command's ID. */
    readonly id: CommandId;

    /**
     * Constructs a command's design incorporating the command's view state.
     * 
     * @param view - The command's view state.
     * 
     * @returns The command's design.
     */
    new(view: CommandView): ICommandDesign;
}

export default ICommandDesignConstructor;
