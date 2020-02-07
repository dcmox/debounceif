"use strict";
exports.__esModule = true;
var debounceIfMap = {};
exports.debounce = function (func, timeMs) {
    if (timeMs === void 0) { timeMs = 500; }
    var fn = func.toString();
    if (debounceIfMap[fn] === undefined) {
        debounceIfMap[fn] = new DebounceIf(func, timeMs);
    }
    debounceIfMap[fn].debounce();
};
exports.debounceIf = function (func, timeMs, debounceIf) {
    if (timeMs === void 0) { timeMs = 500; }
    if (debounceIf === void 0) { debounceIf = false; }
    var fn = func.toString();
    if (debounceIfMap[fn] === undefined) {
        debounceIfMap[fn] = new DebounceIf(func, timeMs, debounceIf);
    }
    debounceIfMap[fn].debounceIf();
};
var DebounceIf = /** @class */ (function () {
    function DebounceIf(func, timeMs, ifCond) {
        var _this = this;
        if (timeMs === void 0) { timeMs = 500; }
        if (ifCond === void 0) { ifCond = false; }
        this._timeMs = 500;
        this._ifCallCount = 0;
        this._debounceTimer = null;
        this._ifTimer = null;
        this._ifConditionMet = false;
        this._ifLimit = 20;
        this.setIfLimit = function (limit) {
            _this._ifLimit = limit;
        };
        this.debounce = function () {
            clearTimeout(_this._debounceTimer);
            _this._debounceTimer = setTimeout(function () {
                if (_this._ifCond && _this._ifConditionMet === false) {
                    // do nothing
                }
                else {
                    _this._func();
                }
            }, _this._timeMs);
        };
        this.debounceIf = function () {
            _this._ifConditionMet = false;
            _this.debounce();
            _this._if();
        };
        this.ifLimitFunc = function () {
            _this._ifCallCount++;
            return _this._ifCallCount >= _this._ifLimit;
        };
        this.ifCallCount = function () {
            return _this._ifCallCount;
        };
        this._if = function () {
            _this._ifCallCount = 0;
            clearInterval(_this._ifTimer);
            _this._ifTimer = setInterval(function () {
                if (_this._ifCond && _this._ifCond()) {
                    clearTimeout(_this._debounceTimer);
                    clearInterval(_this._ifTimer);
                    _this._ifConditionMet = true;
                    _this._func();
                }
            }, _this._timeMs);
        };
        this._func = func;
        this._timeMs = timeMs;
        this._ifCond = ifCond === true ? this.ifLimitFunc : ifCond ? ifCond : null;
    }
    return DebounceIf;
}());
exports.DebounceIf = DebounceIf;
module.exports = DebounceIf;
