const crash: (message?: string) => never
= message => { throw new Error(message); }

export default crash;
