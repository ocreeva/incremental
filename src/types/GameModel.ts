import type EntityState from './EntityState';
import type TimeContext from './TimeContext';
import type UpdateContext from './UpdateContext';

declare interface GameModel<TState extends EntityState = EntityState> {
    readonly state: TState;

    start(context: UpdateContext, time: number): void;
    update(context: UpdateContext, time: number): void;
    finalize(context: UpdateContext, time: number): void;
    progress(context: UpdateContext, time: TimeContext): void;
}

export default GameModel;
