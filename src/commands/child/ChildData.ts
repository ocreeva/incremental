import { CommandId } from '@/constants';
import type { CommandState, GameModel } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ChildModel from './ChildModel';

class ChildData extends CommandData {
    public readonly id = CommandId.Child;

    public override createModel(): GameModel<CommandState> {
        return new ChildModel();
    }
}

registerData(new ChildData());
