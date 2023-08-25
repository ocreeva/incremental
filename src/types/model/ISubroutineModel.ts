import type { EntityId, SubroutineState } from '@/types';

import type IEntityModel from './IEntityModel';

declare type ISubroutineModel = {
    [P in keyof SubroutineState]: SubroutineState[P];
} & IEntityModel<EntityId>;

export default ISubroutineModel;
