import {getGlobalState} from "./globalstate";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {of} from "rxjs/observable/of";

const globalState = getGlobalState();

/**
 * Start a new transaction batch
 */
export function startBatch() {
  if (!isInTransactionBatch()) {
    globalState.batchTransaction = new Subject();
  }
  
  globalState.batchTransactions++;
}

/**
 * End the transaction
 */
export function endBatch() {
  if (--globalState.batchTransactions === 0) {
    globalState.batchTransaction.next(true);
    globalState.batchTransaction.complete();
  }
}

/**
 * Whether we're inside batch
 * @return {boolean}
 */
export function isInTransactionBatch() {
  return globalState.batchTransactions > 0;
}

/**
 * @return {Observable<boolean>}
 */
export function transactionCommit(): Observable<boolean> {
  return globalState.batchTransaction ? globalState.batchTransaction.asObservable() : of(true);
}