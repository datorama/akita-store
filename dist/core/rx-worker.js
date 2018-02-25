"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
/**
 *
 * @param fn
 * @returns {Worker}
 * @private
 */
function _createWorker(fn) {
    var blob = new Blob(["self.cb = " + fn + ";self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }"], {
        type: 'text/javascript'
    });
    var url = URL.createObjectURL(blob);
    return new Worker(url);
}
exports.workerMap = function (fn) { return function (source) {
    return new Observable_1.Observable(function (observer) {
        var worker = _createWorker(fn);
        worker.onmessage = function (e) {
            observer.next(e.data);
            worker.terminate();
        };
        worker.onerror = function (error) {
            observer.error(error);
            worker.terminate();
        };
        return source.subscribe({
            next: function (value) {
                worker.postMessage(value);
            }
        });
    });
}; };
