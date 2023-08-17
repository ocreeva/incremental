import type EntityState from './EntityState';
import type GameContext from './GameContext';
import type TimeContext from './TimeContext';
import type UpdateContext from './UpdateContext';

declare interface GameModel<TState extends EntityState = EntityState> {
    readonly state: TState;

    start(game: GameContext, context: UpdateContext, time: number): void;
    update(game: GameContext, context: UpdateContext, time: number): void;
    finalize(game: GameContext, context: UpdateContext, time: number): void;
    progress(game: GameContext, context: UpdateContext, time: TimeContext): void;
}

export default GameModel;
