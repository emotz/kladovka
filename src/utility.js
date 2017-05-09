/**
 * Создает случайное число в указанном диапазоне, включая границы диапазона
 * @param {Number} min - Минимальное значение
 * @param {Number} max - Максимальное значение
 * @returns {Number} Случайное число
 */
function random(min, max) {
    return Math.floor(Math.random() * (++max - min) + min);
}


/**
 * Создает новый объект со всеми свойствами, которые прошли проверку,
 * задаваемую в передаваемой функции
 * @param {Object} obj - Объект, свойства которого будут проверяться
 * @param {Function} fn - Функция проверка каждого свойства.
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
 * @param {Object} obj - Объект, который будет клонироваться
 * @returns {Object} Новый объект, клон
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
module.exports = {
    random,
    filterObj,
    clone
};