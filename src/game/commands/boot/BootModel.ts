import { CommandId } from '@/constants';
import CommandModel, { registerModel } from '@/game/commands/_/CommandModel';
import OperationModel from '@/game/commands/_/OperationModel';

class BootOperationModel extends OperationModel { }

class BootModel extends CommandModel {
    public constructor() { super(CommandId.Boot, BootOperationModel); }
}

registerModel(new BootModel());
