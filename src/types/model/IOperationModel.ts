import { MessageId } from '@/constants';
import { InstructionData, OperationView } from '@/types';

import IEntityModel from './IEntityModel';

declare type IOperationModel = {
    [P in keyof Omit<OperationView, 'messages'>]-?: NonNullable<OperationView[P]>;
} & IEntityModel<InstructionData> & {
    readonly messages: ReadonlyArray<MessageId>;
    addMessage(message: MessageId): void;
};

export default IOperationModel;
