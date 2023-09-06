import type { EntityId, SubroutineState } from '@/types';

import type IEntityModel from './IEntityModel';

declare type ISubroutineModel = {
    [P in keyof SubroutineState]-?: NonNullable<SubroutineState[P]>;
} & IEntityModel<EntityId>;

export default ISubroutineModel;
