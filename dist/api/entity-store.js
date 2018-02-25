"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crud_1 = require("../core/crud");
var utils_1 = require("../core/utils");
var store_1 = require("./store");
/**
 * Inject the class once to the store, so we can leverage the same instance
 */
var CRUD = new crud_1.CRUD();
/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
var EntityStore = /** @class */ (function (_super) {
    __extends(EntityStore, _super);
    /**
     *
     * Initial the store with the state
     *
     * @param initialState
     */
    function EntityStore(initialState, idKey) {
        if (idKey === void 0) { idKey = 'id'; }
        var _this = _super.call(this, initialState) || this;
        _this.idKey = idKey;
        /** CRUD operations */
        _this._crud = CRUD;
        return _this;
    }
    /**
     * Replace current collection with provided collection
     *
     * this.store.set([Entity, Entity]);
     * this.store.set(Entity);
     *
     * @param {E[] | E} entities
     */
    EntityStore.prototype.set = function (entities) {
        var _this = this;
        this.setState(function (state) { return _this._crud._set(state, utils_1.coerceArray(entities), _this.idKey); });
    };
    /**
     * Add or Update an entitiy in the collection
     *
     * this.store.createOrUpdate(ID, Entity);
     *
     * @param ID id
     * @param E entity
     */
    EntityStore.prototype.createOrUpdate = function (id, entity) {
        var currState = this.value();
        var hasEntity = !!currState.entities[id];
        if (hasEntity) {
            this.update(id, entity);
        }
        else {
            this.add(entity);
        }
    };
    /**
     * Add an entitiy/s to the collection
     *
     * this.store.add([Entity, Entity]);
     * this.store.add(Entity);
     *
     * @param {E[]} entities
     */
    EntityStore.prototype.add = function (entities) {
        var _this = this;
        this.setState(function (state) { return _this._crud._add(state, utils_1.coerceArray(entities), _this.idKey); });
    };
    /**
     *
     * Update entity/entities in the collection
     *
     * this.store.update(3, {
     *   name: 'New Name'
     * });
     *
     * this.store.update([1,2,3], {
     *   name: 'New Name'
     * });
     *
     *
     * this.store.update(null, {
     *   name: 'New Name'
     * });
     *
     * @param id
     * @param newState
     */
    EntityStore.prototype.update = function (id, newState) {
        var _this = this;
        var ids = id == null ? this.value().ids : utils_1.coerceArray(id);
        this.setState(function (state) { return _this._crud._update(state, ids, newState); });
    };
    /**
     *
     * Remove one/multi entities from the collection
     *
     * this.store.remove(5);
     *
     * this.store.remove([1,2,3]);
     *
     * this.store.remove();
     *
     * @param id
     */
    EntityStore.prototype.remove = function (id) {
        var _this = this;
        var ids = id ? utils_1.coerceArray(id) : null;
        this.setState(function (state) { return _this._crud._remove(state, ids); });
    };
    /**
     *
     * Set the active entity
     *
     * @param {number} id
     */
    EntityStore.prototype.setActive = function (id) {
        this.setState(function (state) {
            return __assign({}, state, { active: id });
        });
    };
    return EntityStore;
}(store_1.Store));
exports.EntityStore = EntityStore;
/**
 *
 * @returns {EntityState}
 */
exports.getInitialState = function () {
    return ({
        entities: {},
        ids: []
    });
};
/**
 *
 * @returns {EntityState}
 */
exports.getInitiaActivelState = function () {
    return ({
        active: null
    });
};
