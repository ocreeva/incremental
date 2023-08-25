import type { IDeltaValue } from '@/types/model';
import { DeltaValue } from '@/worker/client';

class TimeContext {
    private previous: number | undefined;

    private _total = 0;
    public get total() { return this._total; }
    private set total(value: number) { this._total = value; }

    public reset(): void {
        this.previous = undefined;
        this.total = 0;
    }

    public snapshot(): IDeltaValue {
        const now = performance.now();

        let delta = 0;
        if (this.previous !== undefined) {
            delta = TimeContext.convertToGameUnits(now - this.previous);
        }

        // create the snapshot before updating the overall total
        const snapshot = new DeltaValue(this.total, delta);

        this.previous = now;
        this.total += delta;

        return snapshot;
    }

    private static convertToGameUnits(time: number): number {
        return time * 0.05;
    }
}

export default TimeContext;
