import { EntityId } from '@reduxjs/toolkit';

import { SubroutineView } from '@/types';

import IEntityModel from './IEntityModel';

declare type ISubroutineModel = {
    [P in keyof SubroutineView]-?: NonNullable<SubroutineView[P]>;
} & IEntityModel<EntityId>;

export default ISubroutineModel;
