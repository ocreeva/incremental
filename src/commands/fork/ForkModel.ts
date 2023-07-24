import { CommandId } from '@/constants';
import type { EntityId, GameModel, UpdateContext } from '@/types';

import CommandModel from '../CommandModel';

class ForkModel extends CommandModel {
    private readonly scriptId: EntityId;
    private subroutine: GameModel | null = null;

    public constructor(scriptId: EntityId) {
        super(CommandId.Fork);

        this.scriptId = scriptId;
    }

    public override start(context: UpdateContext): void {
        super.start(context);

        context.allocateSubroutineAsync(this.scriptId).then(_ => { this.subroutine = _; });
    }

    public override update(context: UpdateContext): void {
        super.update(context);

        if (this.subroutine !== null) {
            this.subroutine.start(context);
            this.subroutine = null;
        }
    }
}

export default ForkModel;
