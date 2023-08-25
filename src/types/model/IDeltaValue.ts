/**
 * Represents the delta of an incremental value.
 * 
 * @remarks
 * e.g. Time may be represented as a delta value during progress operations.
 */
declare interface IDeltaValue {
    /** Whether there is unallocated delta. */
    readonly hasUnallocated: boolean;

    /** The original delta value, before allocations. */
    readonly originalDelta: number;

    /** The total value, not including any unallocated delta. */
    readonly total: number;

    /**
     * Allocates the delta value, up to a maximum.
     * 
     * @param maximum - The maximum value to allocate.
     * 
     * @returns The value allocated.
     */
    allocate: (maximum: number) => number;

    /**
     * Reset the delta allocations for this value.
     */
    reset: () => void;
}

export default IDeltaValue;
