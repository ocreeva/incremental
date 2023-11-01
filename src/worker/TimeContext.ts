import { CommandId } from '@/constants';
import { IDeltaValue, IGameContext } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class TimeContext {
    private static readonly bootTimeInMS = 1_000;
    private static readonly gameTimeInMS = 60 * 60 * 24 * 7 * 2 / 1_000;
    private static readonly maxTimeByOverclockLevel: Record<number, number> = {
        [0]: Math.floor(TimeContext.bootTimeInMS +  2 * TimeContext.gameTimeInMS),
        [1]: Math.floor(TimeContext.bootTimeInMS +  5 * TimeContext.gameTimeInMS),
        [2]: Math.floor(TimeContext.bootTimeInMS +  9 * TimeContext.gameTimeInMS),
        [3]: Math.floor(TimeContext.bootTimeInMS + 14 * TimeContext.gameTimeInMS),
        [4]: Math.floor(TimeContext.bootTimeInMS + 20 * TimeContext.gameTimeInMS),
        [5]: Math.floor(TimeContext.bootTimeInMS + 27 * TimeContext.gameTimeInMS),
    };

    private previous = 0;
    private limit: IDeltaValue = new DeltaValue(0, 0);

    public constructor(game: IGameContext) {
        const overclockCommand = game.commands[CommandId.Overclock];
        overclockCommand.on('level', this.handleOverclockLevelChange);
        this.handleOverclockLevelChange(overclockCommand.level);
    }

    public get hasExpired(): boolean { return !this.limit.hasUnallocated; }

    private _maxDuration = 0;
    public get maxDuration() { return this._maxDuration; }
    private set maxDuration(value: number) { this._maxDuration = value; }

    public get total() { return this.limit.total; }

    public reset(): void {
        this.limit = new DeltaValue(0, this.maxDuration);
        this.previous = performance.now();
    }

    public snapshot(): IDeltaValue {
        const total = this.limit.total;
        const delta = this.limit.allocate(Math.floor(performance.now() - this.previous));
        this.previous += delta;

        return new DeltaValue(total, delta);
    }

    private handleOverclockLevelChange: (level: number) => void
    = ((_this: TimeContext) => (level: number) => { _this.maxDuration = TimeContext.maxTimeByOverclockLevel[level]; })(this);
}

export default TimeContext;
