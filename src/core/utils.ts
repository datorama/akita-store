/** Wraps the provided value in an array, unless the provided value is an array. */
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/** Check if a value is a function */
export function isFunction(value: any) {
  return value instanceof Function;
}

/**
 * Usage : compose functions right to left
 * compose(minus8, add10, multiply10)(4) === 42
 *
 * The resulting function can accept as many arguments as the first function does
 * compose(add2, multiply)(4, 10) === 42
 * @param fns
 * @return {any}
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
