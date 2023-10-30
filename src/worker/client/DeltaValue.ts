import { IDeltaValue } from '@/types/model';

class DeltaValue implements IDeltaValue {
    private unallocated = 0;

    constructor(total: number, delta: number) {
        this.originalTotal = total;
        this.originalDelta = delta;

        this.reset();
    }

    public get hasUnallocated() { return this.unallocated > 0; }

    public originalDelta: number;
    public originalTotal: number;

    public get total() { return this.originalTotal + this.originalDelta - this.unallocated; }

    public allocate(maximum: number): number {
        const allocation = Math.min(this.unallocated, maximum);
        this.unallocated -= allocation;
        return allocation;
    }

    public reset(): void {
        this.unallocated = this.originalDelta;
    }
}

export default DeltaValue;
