import { CommandId } from '@/constants';
import type { IDeltaValue, IGameContext } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class TimeContext {
    private static readonly bootTime = 1_000;
    private static readonly microfortnight = 60 * 60 * 24 * 7 * 2 / 1_000;
    private static readonly maxTimeByOverclockLevel: Record<number, number> = {
        [0]: TimeContext.bootTime +  2 * TimeContext.microfortnight,
        [1]: TimeContext.bootTime +  5 * TimeContext.microfortnight,
        [2]: TimeContext.bootTime +  9 * TimeContext.microfortnight,
        [3]: TimeContext.bootTime + 14 * TimeContext.microfortnight,
        [4]: TimeContext.bootTime + 20 * TimeContext.microfortnight,
        [5]: TimeContext.bootTime + 27 * TimeContext.microfortnight,
    };

    private readonly game: IGameContext;

    private previous: number | undefined;
    private limit: IDeltaValue = new DeltaValue(0, 0);

    public constructor(game: IGameContext) {
        this.game = game;
    }

    public get hasExpired(): boolean { return !this.limit.hasUnallocated; }

    public get total() { return this.limit.total; }

    public reset(): void {
        const { level } = this.game.commands[CommandId.Overclock];
        const maxTime = TimeContext.maxTimeByOverclockLevel[level];
        this.limit = new DeltaValue(0, TimeContext.convertToGameUnits(maxTime));
        this.previous = undefined;
    }

    public snapshot(): IDeltaValue {
        const now = TimeContext.convertToGameUnits(performance.now());

        let delta = 0;
        if (this.previous !== undefined) {
            delta = this.limit.allocate(now - this.previous);
        }

        this.previous = now;

        return new DeltaValue(this.limit.total - delta, delta);
    }

    private static convertToGameUnits(time: number): number {
        return time * 0.05;
    }
}

export default TimeContext;
