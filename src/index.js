'use strict';

/**
 * @const {object} DEFAULTS
 * @type {{limit: number}}
 */

const DEFAULTS = {
    limit: 100,
};

/**
 * @classdesc Stores provided items in localHistory as JSON string.
 * @class ClientHistory
 */

export default class ClientHistory {

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

    constructor(initObj) {
        if (!initObj.name || typeof initObj.name !== 'string') {
            throw new Error('Wrong ClientHistory constructor: initObj.name')
        }
        if (initObj.defaults && typeof initObj.defaults !== 'object') {
            throw new Error('Wrong ClientHistory constructor: initObj.defaults')
        }
        if (initObj.checkFields && typeof initObj.checkFields !== 'object') {
            throw new Error('Wrong ClientHistory constructor: initObj.checkFields')
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

    getItems() {
        let result;
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

    push(item) {
        if (typeof item !== 'object') {
            throw new Error(`Invalid argument type, expected 'object', got ${typeof item}`);
        }
        let arr = this.getItems();
        if (!arr.length) {
            arr.push(item);
            localStorage.setItem(this.name, JSON.stringify(arr));
            return;
        }
        if (arr.length >= this.defaults.limit) {
            arr.shift();
        }
        if (this.checkFields && typeof this.checkFields === "object") {
            arr.forEach((record, index) => {
                if (this.checkFields.every((field) => {
                        if (typeof(record) === 'object') {
                            return record[field] === item[field];
                        }
                    })) {
                    return arr.splice(index, 1);
                }
            });
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

    drop() {
        localStorage.removeItem(this.name);
        return this;
    }
}
module.exports = ClientHistory;