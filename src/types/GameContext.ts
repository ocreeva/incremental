import type { CommandId } from '@/constants';

import type CommandState from './CommandState';

/**
 * Represents contextual information about the state of the game. Intended for
 * use within the GameModel worker, where the Redux-hosted game state isn't
 * readily available.
 */
declare interface GameContext {
    commands: Record<CommandId, CommandState>;
}

export default GameContext;
