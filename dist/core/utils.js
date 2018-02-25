"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Wraps the provided value in an array, unless the provided value is an array. */
function coerceArray(value) {
    return Array.isArray(value) ? value : [value];
}
exports.coerceArray = coerceArray;
/** Check if a value is a function */
function isFunction(value) {
    return value instanceof Function;
}
exports.isFunction = isFunction;
/**
 * Usage : compose functions right to left
 * compose(minus8, add10, multiply10)(4) === 42
 *
 * The resulting function can accept as many arguments as the first function does
 * compose(add2, multiply)(4, 10) === 42
 * @param fns
 * @return {any}
 */
exports.compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f(g.apply(void 0, args));
    }; });
};
