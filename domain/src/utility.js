const _ = require('lodash');

/**
 * Создаёт случайное число в указанном диапазоне, включая границы диапазона
 * @param {Number} min - Минимальное значение
 * @param {Number} max - Максимальное значение
 * @returns {Number} Случайное число
 */
function random(min, max) {
    return Math.floor(Math.random() * (++max - min) + min);
}

/**
 * Создаёт новый объект со всеми свойствами, которые прошли проверку,
 * задаваемую в передаваемой функции
 * @param {Object} obj - Объект, свойства которого будут проверяться
 * @param {Function} fn - Функция проверки каждого свойства.
 * Вызывается с аргументами (value, property, object).
 * Возвращает true для сохранения свойства, false для его пропуска
 * @returns {Object} Новый объект
 */
function filterObj(obj, fn) {
    let res = {};
    for (let key in obj) {
        if (fn(obj[key], key, obj))
            res[key] = obj[key];
    }
    return res;
}

/**
 * Клонирует объект
 * @param {Object} obj - Объект, который будет клонирован
 * @returns {Object} Новый объект, клон
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Генератор рандомных ID
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function guid12bytes() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createCallMethod(use, fallback, pred) {
    return function (context, cb, ...args) {
        const dict = pred(context, ...args) ? use : fallback;
        if (!_.isFunction(dict[cb]))
            throw new Error(`Can't find cb ${cb}`);

        return dict[cb](context, ...args);
    };
}

module.exports = {
    random,
    filterObj,
    clone,
    guid,
    guid12bytes,
    sleep,
    createCallMethod
};
