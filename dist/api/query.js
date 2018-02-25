"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Query = /** @class */ (function () {
    function Query(store) {
        this.store = store;
    }
    /**
     * Select a slice from the store
     *
     * this.query.select(state => state.entities)
     *
     * @param {(store: T) => R} project
     * @returns {Observable<R>}
     */
    Query.prototype.select = function (project) {
        return this.store._select(project);
    };
    /**
     * Get the current state
     * @return {S}
     */
    Query.prototype.get = function () {
        return this.store.value();
    };
    return Query;
}());
exports.Query = Query;
