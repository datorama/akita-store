"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalstate_1 = require("./globalstate");
var Subject_1 = require("rxjs/Subject");
var of_1 = require("rxjs/observable/of");
var globalState = globalstate_1.getGlobalState();
/**
 * Start a new transaction batch
 */
function startBatch() {
    if (!isInTransactionBatch()) {
        globalState.batchTransaction = new Subject_1.Subject();
    }
    globalState.batchTransactions++;
}
exports.startBatch = startBatch;
/**
 * End the transaction
 */
function endBatch() {
    if (--globalState.batchTransactions === 0) {
        globalState.batchTransaction.next(true);
        globalState.batchTransaction.complete();
    }
}
exports.endBatch = endBatch;
/**
 * Whether we're inside batch
 * @return {boolean}
 */
function isInTransactionBatch() {
    return globalState.batchTransactions > 0;
}
exports.isInTransactionBatch = isInTransactionBatch;
/**
 * @return {Observable<boolean>}
 */
function transactionCommit() {
    return globalState.batchTransaction ? globalState.batchTransaction.asObservable() : of_1.of(true);
}
exports.transactionCommit = transactionCommit;
