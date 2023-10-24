import { CommandId } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';

class ChildOperationModel extends OperationModel { }

class ChildModel extends CommandModel {
    public constructor() { super(CommandId.Child, ChildOperationModel); }
}

registerModel(new ChildModel());
