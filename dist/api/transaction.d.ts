export declare function trans<T>(action: () => T, thisArg?: any): T;
/**
 * A logical transaction.
 * Use this transaction to optimize the dispatch of all the stores.
 * @return {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 */
export declare function transaction(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
