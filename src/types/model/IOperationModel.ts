import type { InstructionState, OperationState } from '@/types';

import type IEntityModel from './IEntityModel';

declare type IOperationModel = {
    [P in keyof OperationState]: OperationState[P];
} & IEntityModel<InstructionState>;

export default IOperationModel;
