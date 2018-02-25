/**
 * A logical transaction.
 * Use this transaction to optimize the dispatch of all the stores.
 * @param {() => T} action
 * @param {any} thisArg
 * @return {T}
 */
import {endBatch, startBatch} from "../core/transaction.util";

export function trans<T>(action: () => T, thisArg = undefined): T {
  startBatch();
  try {
    return action.apply(thisArg)
  } finally {
    endBatch();
  }
}


/**
 * A logical transaction.
 * Use this transaction to optimize the dispatch of all the stores.
 * @return {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 */
export function transaction() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function ( ...args) {
      return trans(() => {
        return originalMethod.apply(this, args);
      }, this);
    };

    return descriptor;
  };
}
