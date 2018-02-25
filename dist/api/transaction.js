"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A logical transaction.
 * Use this transaction to optimize the dispatch of all the stores.
 * @param {() => T} action
 * @param {any} thisArg
 * @return {T}
 */
var transaction_util_1 = require("../core/transaction.util");
function trans(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    transaction_util_1.startBatch();
    try {
        return action.apply(thisArg);
    }
    finally {
        transaction_util_1.endBatch();
    }
}
exports.trans = trans;
/**
 * A logical transaction.
 * Use this transaction to optimize the dispatch of all the stores.
 * @return {(target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 */
function transaction() {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return trans(function () {
                return originalMethod.apply(_this, args);
            }, this);
        };
        return descriptor;
    };
}
exports.transaction = transaction;
