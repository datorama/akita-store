import { Observable } from "rxjs/Observable";
/**
 * Start a new transaction batch
 */
export declare function startBatch(): void;
/**
 * End the transaction
 */
export declare function endBatch(): void;
/**
 * Whether we're inside batch
 * @return {boolean}
 */
export declare function isInTransactionBatch(): boolean;
/**
 * @return {Observable<boolean>}
 */
export declare function transactionCommit(): Observable<boolean>;
