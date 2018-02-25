/** Wraps the provided value in an array, unless the provided value is an array. */
export declare function coerceArray<T>(value: T | T[]): T[];
/** Check if a value is a function */
export declare function isFunction(value: any): boolean;
/**
 * Usage : compose functions right to left
 * compose(minus8, add10, multiply10)(4) === 42
 *
 * The resulting function can accept as many arguments as the first function does
 * compose(add2, multiply)(4, 10) === 42
 * @param fns
 * @return {any}
 */
export declare const compose: (...fns: any[]) => any;
