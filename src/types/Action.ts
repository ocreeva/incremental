/**
 * Declares a method that has 0 or more parameters and does not return a value.
 */
declare type Action<T1 = never, T2 = never>
= [T1] extends [never] ? () => void
: [T2] extends [never] ? (arg: T1) => void
: (arg1: T1, arg2: T2) => void;

export default Action;
