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
var AkitaError = /** @class */ (function (_super) {
    __extends(AkitaError, _super);
    function AkitaError(message) {
        return _super.call(this, message) || this;
    }
    return AkitaError;
}(Error));
exports.AkitaError = AkitaError;
var AkitaImmutabilityError = /** @class */ (function (_super) {
    __extends(AkitaImmutabilityError, _super);
    function AkitaImmutabilityError(prevState) {
        return _super.call(this, "The new state should be immutable. Make sure to return a new immutable state. \n state: \n " + prevState) || this;
    }
    return AkitaImmutabilityError;
}(AkitaError));
exports.AkitaImmutabilityError = AkitaImmutabilityError;
