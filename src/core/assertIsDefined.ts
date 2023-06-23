import crash from './crash';

const assertIsDefined: <T>(t: T | undefined, errorMessage: string) => asserts t is T
= (t, errorMessage) => t !== undefined || crash(errorMessage);

export default assertIsDefined;
