import type { TimeContext, UpdateContext } from '@/types';

import CommandModel from '../_CommandModel';

class ForkModel extends CommandModel {
    public override start(_context: UpdateContext): void {
        console.log('start');
    }

    public override update(_context: UpdateContext): void {
        console.log('update');
    }

    public override finalize(_context: UpdateContext): void {
        console.log('finalize');
    }

    public override progress(context: UpdateContext, time: TimeContext): void {
        super.progress(context, time);

        console.log('progress', time.delta, time.total);
    }
}

export default ForkModel;
