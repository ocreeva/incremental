import type TimeContext from './TimeContext';
import type UpdateContext from './UpdateContext';

declare interface GameModel {
    start(context: UpdateContext): void;
    update(context: UpdateContext): void;
    finalize(context: UpdateContext): void;
    progress(context: UpdateContext, time: TimeContext): void;
}

export default GameModel;
