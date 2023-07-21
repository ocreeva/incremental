import type { TimeContext } from '@/types';

class _TimeContext implements TimeContext {
    private _total = 0;
    private previous: number | undefined;

    public delta = 0;
    public get total(): number { return this._total; }
    private set total(value: number) { this._total = value; }

    public reset(): void {
        this.previous = undefined;
        this.delta = 0;
        this.total = 0;
    }

    public snapshot(): void {
        const now = performance.now();

        if (this.previous !== undefined) {
            this.delta = _TimeContext.convertToGameUnits(now - this.previous);
        }

        this.previous = now;
        this.total += this.delta;
    }

    private static convertToGameUnits(time: number): number {
        return time * 0.05;
    }
}

export default _TimeContext;
