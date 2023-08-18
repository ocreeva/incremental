import { CommandId } from '@/constants';
import type { GameContext, UpdateContext } from '@/types';

import CommandModel from '../CommandModel';

class ScanModel extends CommandModel {
    constructor() {
        super(CommandId.Scan);
    }

    public override finalize(game: GameContext, context: UpdateContext, time: number): void {
        super.finalize(game, context, time);

        context.updateCommand(CommandId.ScanHub, { id: CommandId.ScanHub, progress: 30 });
    }
}

export default ScanModel;
