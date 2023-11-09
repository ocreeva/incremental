import { ErrorCode } from '@/constants';
import { InstructionData, OperationView } from '@/types';

import IEntityModel from './IEntityModel';

declare type IOperationModel = {
    [P in keyof Omit<OperationView, 'errors'>]-?: NonNullable<OperationView[P]>;
} & IEntityModel<InstructionData> & {
    readonly errors: ReadonlyArray<ErrorCode>;
    addError(error: ErrorCode): void;
};

export default IOperationModel;
