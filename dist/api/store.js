"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var operators_1 = require("rxjs/operators");
var error_1 = require("../core/error");
var transaction_util_1 = require("../core/transaction.util");
var utils_1 = require("../core/utils");
function logger(_a) {
    var storeName = _a.storeName, currentState = _a.currentState, newState = _a.newState;
    console.group(storeName);
    console.log("%c prev state ", 'font-weight: bold; color: darkgrey', currentState);
    console.log("%c next state ", 'font-weight: bold; color: hotpink', newState);
    console.groupEnd();
    return newState;
}
var PRE_MIDDLEWARES = [logger];
/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
var Store = /** @class */ (function () {
    /**
     *
     * Initial the store with the state
     *
     * @param initialState
     */
    function Store(initialState) {
        /**
         * Actions waiting for the end of the batch
         */
        this.pendingTransactionActions = [];
        this._store = new BehaviorSubject_1.BehaviorSubject(initialState);
    }
    /**
     * Select a slice from the store
     *
     * this.store.select(state => state.entities)
     *
     * @param {(store: T) => R} project
     * @returns {Observable<R>}
     */
    Store.prototype._select = function (project) {
        return this._store$.pipe(operators_1.map(project), operators_1.distinctUntilChanged());
    };
    /**
     *
     * Get the raw state value
     *
     * @returns {S}
     */
    Store.prototype.value = function () {
        return this._store.getValue();
    };
    /**
     *
     * Update the store with a new value
     *
     * @param {(state: S) => S} newStateFn
     */
    Store.prototype.setState = function (newStateFn) {
        if (transaction_util_1.isInTransactionBatch()) {
            // subscribe to the transaction end only once
            if (!this.pendingTransactionActions.length) {
                this.watchTransaction();
            }
            this.pendingTransactionActions.push(newStateFn);
        }
        else {
            var prevState = this.value();
            var newState = newStateFn(prevState);
            // make sure the new state is immutable
            if (prevState === newState) {
                throw new error_1.AkitaImmutabilityError(prevState);
            }
            this.dispatch(newState);
        }
    };
    /**
     *
     * @param {S} state
     */
    Store.prototype.dispatch = function (state) {
        this._store.next(state);
    };
    Object.defineProperty(Store.prototype, "_store$", {
        /**
         *
         *
         * @returns {Observable<S>}
         * @private
         */
        get: function () {
            return this._store.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.watchTransaction = function () {
        var _this = this;
        transaction_util_1.transactionCommit()
            .subscribe(function () {
            var prevState = _this.value();
            var newState = utils_1.compose.apply(void 0, _this.pendingTransactionActions)(prevState);
            _this.pendingTransactionActions = [];
            _this.dispatch(newState);
        });
    };
    /**
     *
     * @param newState
     * @private
     */
    Store.prototype._addMiddlewares = function (newState) {
        var _this = this;
        PRE_MIDDLEWARES.forEach(function (middleware) {
            return middleware({
                newState: newState,
                currentState: _this.value(),
                storeName: _this.constructor.name
            });
        });
    };
    return Store;
}());
exports.Store = Store;
