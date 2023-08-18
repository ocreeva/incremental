import { CommandId } from '@/constants';
import type { CommandState, GameModel } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import BootModel from './BootModel';

class BootData extends CommandData {
    public readonly id = CommandId.Boot;

    public override createModel(): GameModel<CommandState> {
        return new BootModel();
    }
}

registerData(new BootData());
