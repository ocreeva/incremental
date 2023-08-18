import { CommandId } from '@/constants';
import type { CommandState, GameModel } from '@/types';

import CommandData, { registerData } from '../_CommandData';
import ScanModel from './ScanModel';

class ScanData extends CommandData {
    public readonly id = CommandId.Scan;

    public override createModel(): GameModel<CommandState> {
        return new ScanModel();
    }
}

class ScanHubData extends CommandData {
    public readonly id = CommandId.ScanHub;

    public override createModel(): GameModel<CommandState> {
        throw Error("ScanHubData does not support the 'createModel' method.");
    }
}

registerData(new ScanData());
registerData(new ScanHubData());
