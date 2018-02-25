"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CRUD = /** @class */ (function () {
    function CRUD() {
    }
    /**
     *
     * @param {T} state
     * @param {EntityState[]} entities
     * @param idKey
     * @returns {T}
     * @private
     */
    CRUD.prototype._set = function (state, entities, idKey) {
        var toHashMap = this.keyBy(entities, idKey);
        return __assign({}, state, { entities: toHashMap, ids: entities.map(function (entity) { return entity[idKey]; }) });
    };
    /**
     *
     * @param {T} state
     * @param {EntityState[]} entities
     * @param idKey
     * @returns {T}
     * @private
     */
    CRUD.prototype._add = function (state, entities, idKey) {
        var addedEntities = {};
        var addedIds = [];
        entities.forEach(function (entity) {
            var entityId = entity[idKey];
            if (state.entities[entityId] === undefined) {
                addedEntities[entityId] = entity;
                addedIds.push(entityId);
            }
        });
        return __assign({}, state, { entities: __assign({}, state.entities, addedEntities), ids: state.ids.concat(addedIds) });
    };
    /**
     *
     * @param {T} state
     * @param {ID[]} ids
     * @param newState
     * @returns {T}
     * @private
     */
    CRUD.prototype._update = function (state, ids, newState) {
        var updatedEntities = ids.reduce(function (acc, id) {
            var newEntity = state.entities[id].assign(newState);
            acc[id] = newEntity;
            return acc;
        }, {});
        return __assign({}, state, { entities: __assign({}, state.entities, updatedEntities) });
    };
    /**
     *
     * @param {T} state
     * @param {ID[] | null} ids
     * @returns {T}
     * @private
     */
    CRUD.prototype._remove = function (state, ids) {
        if (!ids)
            return this._removeAll(state);
        var removed = ids.reduce(function (acc, id) {
            var _a = id, entity = acc[_a], rest = __rest(acc, [typeof _a === "symbol" ? _a : _a + ""]);
            return rest;
        }, state.entities);
        return __assign({}, state, { entities: removed, ids: state.ids.filter(function (current) { return ids.indexOf(current) === -1; }) });
    };
    /**
     *
     * @param {T} state
     * @param {ID} active
     * @returns {T}
     * @private
     */
    CRUD.prototype._removeAll = function (state, active) {
        var newState = __assign({}, state, { entities: {}, ids: [] });
        if (active) {
            newState.active = active;
        }
        return newState;
    };
    /**
     *
     * @param {any[]} entities
     * @param {string} id
     * @returns {any}
     */
    CRUD.prototype.keyBy = function (entities, id) {
        if (id === void 0) { id = 'id'; }
        return entities.reduce(function (acc, entity) {
            acc[entity[id]] = entity;
            return acc;
        }, {});
    };
    return CRUD;
}());
exports.CRUD = CRUD;
