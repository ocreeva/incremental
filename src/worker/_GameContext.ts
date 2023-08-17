import { CommandId } from '@/constants';
import type { CommandState, GameContext as IGameContext } from '@/types';

import { getAllCommandsAsync } from './client';
import ModelContext from './ModelContext';

class GameContext implements IGameContext {
    public commands: Record<CommandId, CommandState>;

    constructor(commands: Record<CommandId, CommandState>) {
        this.commands = commands;
    }

    public static async createAsync(context: ModelContext): Promise<IGameContext> {
        const record = Object.values(CommandId).reduce<Record<string, CommandState>>(
            (aggregate, id) => {
                aggregate[id] = { id };
                return aggregate;
            }, { }
        );

        const { commands } = await getAllCommandsAsync(context.messageService, { });
        commands.forEach(command => record[command.id] = command);

        return new GameContext(record);
    }
}

export default GameContext;
