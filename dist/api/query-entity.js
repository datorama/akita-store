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
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var query_1 = require("./query");
var QueryEntity = /** @class */ (function (_super) {
    __extends(QueryEntity, _super);
    function QueryEntity(store) {
        return _super.call(this, store) || this;
    }
    QueryEntity.prototype.selectAll = function (asMap) {
        if (asMap === void 0) { asMap = false; }
        if (asMap)
            return this._entitiesAsMap();
        var selectIds$ = this.select(function (state) { return state.ids; });
        var selectEntities$ = this.select(function (state) { return state.entities; });
        return selectEntities$.pipe(operators_1.withLatestFrom(selectIds$, function (entities, ids) { return ids.map(function (id) { return entities[id]; }); }));
    };
    QueryEntity.prototype.getAll = function (asMap) {
        if (asMap === void 0) { asMap = false; }
        if (asMap)
            return this.get().entities;
        var ids = this.get().ids;
        var entities = this.get().entities;
        return ids.map(function (id) { return entities[id]; });
    };
    QueryEntity.prototype.selectEntity = function (id, project) {
        if (!project) {
            return this._byId(id);
        }
        return this.select(function (state) {
            var entity = state.entities[id];
            if (entity) {
                return project(entity);
            }
            return null;
        });
    };
    /**
     * Get the entity by id
     *
     * this.store.getEntity(1);
     *
     * @param id
     * @returns {any}
     */
    QueryEntity.prototype.getEntity = function (id) {
        return this.get().entities[id];
    };
    /**
     * Select the active id
     * @returns {Observable<number | string>}
     */
    QueryEntity.prototype.selectActiveId = function () {
        return this.select(function (state) { return state.active; });
    };
    /**
     * Select the active element
     * @returns {Observable<E>}
     */
    QueryEntity.prototype.selectActive = function () {
        var _this = this;
        return this.selectActiveId().pipe(operators_1.switchMap(function (activeId) { return _this.selectEntity(activeId); }));
    };
    /**
     * Get the active id
     * @returns {ID}
     */
    QueryEntity.prototype.getActiveId = function () {
        return this.get().active;
    };
    /**
     * Get the active element
     * @returns {E}
     */
    QueryEntity.prototype.getActive = function () {
        var activeId = this.getActiveId();
        return activeId ? this.getEntity(activeId) : null;
    };
    /**
     * Select an selectEntity by id
     *
     * @param {number} id
     * @returns {Observable<any>}
     */
    QueryEntity.prototype._byId = function (id) {
        return this.select(function (state) { return state.entities[id]; }).pipe(operators_1.filter(Boolean));
    };
    /**
     *
     * Get the entities as observable
     *
     * @returns {Observable<HashMap<E>>}
     */
    QueryEntity.prototype._entitiesAsMap = function () {
        return this.select(function (state) { return state.entities; });
    };
    return QueryEntity;
}(query_1.Query));
exports.QueryEntity = QueryEntity;
