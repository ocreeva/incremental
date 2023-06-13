import type Subroutine from './Subroutine';

/**
 * Represents a routine comprising all of the subroutines which execute during one time cycle.
 * 
 * @interface Routine
 * @subroutines {Subroutine[]} The routine's subroutines.
 */
interface Routine {
    subroutines: Subroutine[];
}

export default Routine;
