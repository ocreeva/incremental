import type { CommandModel, TimeContext, UpdateContext } from '@/types';

abstract class _CommandModel implements CommandModel {
    private _duration = 42;
    public get duration() { return this._duration; }
    protected set duration(value: number) { this._duration = value; }

    private _elapsed = 0;
    public get elapsed() { return this._elapsed; }
    protected set elapsed(value: number) { this._elapsed = value; }

    public start(_context: UpdateContext): void {
        // noop
    }

    public update(_context: UpdateContext): void {
        // noop
    }

    public finalize(_context: UpdateContext): void {
        // noop
    }

    public progress(_context: UpdateContext, time: TimeContext): void {
        this.elapsed += time.delta;
        if (this.elapsed >= this.duration) {
            time.delta = this.elapsed - this.duration;
            this.elapsed = this.duration;
        } else {
            time.delta = 0;
        }
    }
}

export default _CommandModel;
