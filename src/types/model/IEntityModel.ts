import type { ModelStatus } from '@/constants/worker';

import type IDeltaValue from './IDeltaValue';
import type IGameContext from './IGameContext';

declare interface IEntityModel<TSource = void, TCaller = void> {
    /** The model's status. */
    readonly status: ModelStatus;

    initializeAsync(game: IGameContext, source: TSource): Promise<void>;

    synchronize(time: number): void;

    start(time: number, caller: TCaller): void;
    finalize(time: number, caller: TCaller): void;
    abort(time: number, caller: TCaller): void;

    update(timeDelta: IDeltaValue, caller: TCaller): void;
}

export default IEntityModel;
