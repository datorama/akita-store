"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AkitaGlobals = /** @class */ (function () {
    function AkitaGlobals() {
        /**
         * How many transactions block
         */
        this.batchTransactions = 0;
    }
    return AkitaGlobals;
}());
exports.AkitaGlobals = AkitaGlobals;
exports.globalState = new AkitaGlobals();
function getGlobalState() {
    return exports.globalState;
}
exports.getGlobalState = getGlobalState;
