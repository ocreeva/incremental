import type { IDeltaValue } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class TimeContext {
    private static maxTime = 1_000 + 2 * 60 * 60 * 24 * 7 * 2 / 1_000; // 2 μfortn + 1s in ms, because reasons
    private previous: number | undefined;
    private limit: IDeltaValue = new DeltaValue(0, TimeContext.maxTime);

    public get hasExpired(): boolean { return !this.limit.hasUnallocated; }

    public get total() { return this.limit.total; }

    public reset(): void {
        this.limit = new DeltaValue(0, TimeContext.maxTime);
        this.previous = undefined;
    }

    public snapshot(): IDeltaValue {
        const now = performance.now();

        let delta = 0;
        if (this.previous !== undefined) {
            delta = TimeContext.convertToGameUnits(this.limit.allocate(now - this.previous));
        }

        this.previous = now;

        return new DeltaValue(this.limit.total - delta, delta);
    }

    private static convertToGameUnits(time: number): number {
        return time * 0.05;
    }
}

export default TimeContext;
