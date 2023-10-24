import type { InstructionData, OperationView } from '@/types';

import type IEntityModel from './IEntityModel';

declare type IOperationModel = {
    [P in keyof OperationView]-?: NonNullable<OperationView[P]>;
} & IEntityModel<InstructionData>;

export default IOperationModel;
