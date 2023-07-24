import type EntityState from './EntityState';
import type TimeContext from './TimeContext';
import type UpdateContext from './UpdateContext';

declare interface GameModel<TState extends EntityState = EntityState> {
    readonly state: TState;

    start(context: UpdateContext): void;
    update(context: UpdateContext): void;
    finalize(context: UpdateContext): void;
    progress(context: UpdateContext, time: TimeContext): void;
}

export default GameModel;
