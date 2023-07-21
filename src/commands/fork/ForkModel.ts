import type { EntityId, GameModel, UpdateContext } from '@/types';

import CommandModel from '../_CommandModel';

class ForkModel extends CommandModel {
    private readonly scriptId: EntityId;
    private subroutine: GameModel | null = null;

    public constructor(scriptId: EntityId) {
        super();

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
