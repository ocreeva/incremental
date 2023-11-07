import { ErrorCode } from '@/constants';
import { ModelStatus } from '@/constants/worker';

import IDeltaValue from './IDeltaValue';
import IGameContext from './IGameContext';

declare interface IEntityModel<TSource = void, TCaller = void> {
    /** The model's status. */
    readonly status: ModelStatus;

    initializeAsync(game: IGameContext, source: TSource): Promise<void>;

    synchronize(time: number): void;

    start(time: number, caller: TCaller): void;
    finalize(time: number, caller: TCaller): void;
    abort(time: number, error: ErrorCode, caller: TCaller): void;

    update(timeDelta: IDeltaValue, caller: TCaller): void;
}

export default IEntityModel;
