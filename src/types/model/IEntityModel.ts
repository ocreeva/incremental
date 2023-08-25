import type { ModelStatus } from '@/constants/worker';

import type IDeltaValue from './IDeltaValue';
import type IGameContext from './IGameContext';

declare interface IEntityModel<TSource = void> {
    readonly status: ModelStatus;

    initializeAsync(game: IGameContext, source: TSource): Promise<void>;

    start(time: number): void;
    synchronize(time: number): void;
    finalize(time: number): void;
    abort(time: number): void;

    update(timeDelta: IDeltaValue): void;
}

export default IEntityModel;
