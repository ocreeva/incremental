import type { CommandId } from '@/constants';
import type { CommandState, GameContext, GameModel, TimeContext, UpdateContext } from '@/types';

abstract class CommandModel implements GameModel<CommandState> {
    public readonly state: CommandState;

    constructor(id: CommandId) {
        this.state = { id };
    }

    public start(_game: GameContext, _context: UpdateContext, _time: number): void {
        // noop
    }

    public update(_game: GameContext, _context: UpdateContext, _time: number): void {
        // noop
    }

    public finalize(_game: GameContext, _context: UpdateContext, _time: number): void {
        // noop
    }

    public progress(_game: GameContext, _context: UpdateContext, _time: TimeContext): void {
        // noop
    }
}

export default CommandModel;
