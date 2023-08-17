/**
 * Represent elapsed time for an executing routine.
 */
declare type TimeContext = {
    /**
     * The time delta when progressing a game model.
     */
    delta: number;

    /**
     * The total elapsed time.
     */
    readonly total: number;
};

export default TimeContext;
