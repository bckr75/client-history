(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ClientHistory", [], factory);
	else if(typeof exports === 'object')
		exports["ClientHistory"] = factory();
	else
		root["ClientHistory"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @const {object} DEFAULTS
 * @type {{limit: number}}
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULTS = {
    limit: 100
};

/**
 * @classdesc Stores provided items in localHistory as JSON string.
 * @class ClientHistory
 */

var ClientHistory = function () {

    /**
     * @constructor ClientHistory
     * @throws Error
     * @return {ClientHistory}
     *
     * @example
     * new ClientHistory({
     *      name: 'login',        //Mandatory. Array of items will be saved to localHistory with this name.
     *      defaults: {           //Optional. If not set then class will use const DEFAULTS as defaults.
     *          limit: 1000
     *      },
     *      checkFields: ['user'] //Optional. In case you want to store only unique items.
     * }).push(...);
     *
     * @param {object} initObj
     * @type {{name: string, defaults: Object|null, checkFields: Array|null}}
     */

    function ClientHistory(initObj) {
        _classCallCheck(this, ClientHistory);

        if (!initObj.name || typeof initObj.name !== 'string') {
            throw new Error('Wrong ClientHistory constructor: initObj.name');
        }
        if (initObj.defaults && _typeof(initObj.defaults) !== 'object') {
            throw new Error('Wrong ClientHistory constructor: initObj.defaults');
        }
        if (initObj.checkFields && _typeof(initObj.checkFields) !== 'object') {
            throw new Error('Wrong ClientHistory constructor: initObj.checkFields');
        }

        this.name = initObj.name;
        this.defaults = initObj.defaults || DEFAULTS;
        this.checkFields = initObj.checkFields;

        return this;
    }

    /**
     * Gets all (this.name) items from localStorage.
     * Returns parsed JSON string as array, empty array if items is not in localStorage.
     * Notice: array will be returned as is, so recent items will be at the very end of it.
     *
     * @method getItems
     * @returns {Array}
     */

    _createClass(ClientHistory, [{
        key: 'getItems',
        value: function getItems() {
            var result = void 0;
            return (result = localStorage.getItem(this.name)) ? JSON.parse(result) : [];
        }

        /**
         * Pushes item to array, array will be saved to localHistory as JSON string.
         *
         * If initObj.checkFields was set in constructor,
         * method will check every localStorage item if its field(s) match(es) item field(s),
         * if true, previous item will be dropped from array (splice),
         * current item will be added at the end of the array.
         *
         * If array is too big (according to defaults.limit), the very first item will be dropped,
         * current item will be added at the end of the array.
         *
         * @method push
         * @param {Object} item
         * @returns {ClientHistory}
         * @throws Error
         */

    }, {
        key: 'push',
        value: function push(item) {
            var _this = this;

            if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
                throw new Error('Invalid argument type, expected \'object\', got ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)));
            }
            var arr = this.getItems();
            if (arr.length) {
                if (arr.length >= this.defaults.limit) {
                    arr.shift();
                }
                if (this.checkFields && _typeof(this.checkFields) === "object") {
                    arr.forEach(function (record, index) {
                        if (_this.checkFields.every(function (field) {
                            if ((typeof record === 'undefined' ? 'undefined' : _typeof(record)) === 'object') {
                                return record[field] === item[field];
                            }
                        })) {
                            return arr.splice(index, 1);
                        }
                    });
                }
            }
            arr.push(item);
            localStorage.setItem(this.name, JSON.stringify(arr));
            return this;
        }

        /**
         * Clears localStorage for this.name
         * @method drop
         * @return {ClientHistory}
         */

    }, {
        key: 'drop',
        value: function drop() {
            localStorage.removeItem(this.name);
            return this;
        }
    }]);

    return ClientHistory;
}();

exports.default = ClientHistory;

module.exports = ClientHistory;

/***/ })
/******/ ]);
});
//# sourceMappingURL=lib.js.map