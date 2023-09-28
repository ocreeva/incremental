import { CommandId } from '@/constants';
import type { IDeltaValue, IGameContext } from '@/types/model';
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
