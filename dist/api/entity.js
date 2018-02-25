"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = /** @class */ (function () {
    function Entity() {
    }
    /**
     *
     * @param {{}} props
     */
    Entity.prototype.merge = function (props) {
        if (props === void 0) { props = {}; }
        Object.assign(this, props);
    };
    /**
     * When we peforming update we want to keep the entity type,
     * otherwise it will be a plain object
     * @param {{}} props
     * @returns {E}
     */
    Entity.prototype.assign = function (props) {
        if (props === void 0) { props = {}; }
        var constructor = this.constructor;
        var instance = new constructor();
        Object.assign(instance, this, props);
        return instance;
    };
    /**
     * @returns {string}
     */
    Entity.prototype.toJSON = function () {
        return this;
    };
    return Entity;
}());
exports.Entity = Entity;
