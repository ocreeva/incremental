import { InstructionData, OperationView } from '@/types';

import IEntityModel from './IEntityModel';

declare type IOperationModel = {
    [P in keyof OperationView]-?: NonNullable<OperationView[P]>;
} & IEntityModel<InstructionData>;

export default IOperationModel;
