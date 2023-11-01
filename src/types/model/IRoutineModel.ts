import { EntityId } from '@reduxjs/toolkit';

import { RoutineView } from '@/types';

import IEntityModel from './IEntityModel';

declare interface _IRoutineModel {
    /**
     * Allocates an idle or new subroutine to execute a specified script.
     * 
     * @param scriptId - The script's ID.
     * 
     * @returns The subroutine's ID.
     */
    allocateSubroutineAsync: (scriptId: EntityId) => Promise<EntityId>;
}

/**
 * Represents the model for a routine.
 */
declare type IRoutineModel = {
    [P in keyof RoutineView]-?: NonNullable<RoutineView[P]>;
} & IEntityModel<EntityId> & _IRoutineModel;

export default IRoutineModel;
