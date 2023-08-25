import crash from './crash';

const assert: (value: unknown, message?: string | undefined) => asserts value
= (value, message) => value || crash(message);

export default assert;
