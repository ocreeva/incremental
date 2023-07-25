import { CommandId } from '@/constants';
import type { EntityId, GameModel, UpdateContext } from '@/types';

import CommandModel from '../CommandModel';

class ForkModel extends CommandModel {
    private readonly scriptId: EntityId;

    private startTime = 0;
    private subroutine: GameModel | null = null;

    public constructor(scriptId: EntityId) {
        super(CommandId.Fork);

        this.scriptId = scriptId;
    }

    public override start(context: UpdateContext, time: number): void {
        super.start(context, time);

        this.startTime = time;

        context.allocateSubroutineAsync(this.scriptId).then(_ => { this.subroutine = _; });
    }

    public override update(context: UpdateContext, time: number): void {
        super.update(context, time);

        if (this.subroutine !== null) {
            this.subroutine.start(context, this.startTime);

            const delta = time - this.startTime;
            if (delta > 0) {
                this.subroutine.progress(context, { delta, total: time });
            }

            this.subroutine = null;
        }
    }
}

export default ForkModel;
