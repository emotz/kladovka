const db = require('./mongo');
const calc = require('./calculation');

/**
 * Укладывает предмет в кладовку
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {Promise.<String, Error>} Идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(item) {
    return db.add(item);
}

/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Promise.<Item, Error>} Искомый предмет
 */
function getFromKladovka(id) {
    return db.getById(id);
}

/**
 * Получает все предметы из кладовки
 * @returns {Promise.<Item, Error>} Коллекция предметов
 */
function getAllFromKladovka() {
    return db.getAll();
}

/**
 * Удаляет предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор предмета для удаления
 * @returns  {Promise.<String, Error>} Идентификатор удалённого предмета
 */
function deleteFromKladovka(id) {
    return db.deleteById(id);
}

/**
 * Удаляет ВСЕ предметы из кладовки
 * @returns  {Promise.<Number, Error>} Количество удалённых объектов
 */
function deleteAllFromKladovka() {
    return db.deleteAll();
}

/**
 * Сравнивает 2 предмета
 * @param {Item} item1 - Первый предмет
 * @param {Item} item2 - Второй предмет
 * @returns {Number} Возвращает -1 если первый предмет лучше, 1 если второй. 0 если равны
 */
function compareItems(item1, item2) {
    let score1 = calc.score(item1);
    let score2 = calc.score(item2);
    if (score1 > score2)
        return -1;
    else if (score1 < score2)
        return 1;
    else
        return 0;
}

/**
 * Проверяет нужен ли предмет
 * @param {Item} item - Проверяемый предмет
 * @returns {Promise.<Boolean, Error>}  True, если предмет нужен. False, если нет
 */
async function isNeeded(item) {
    let res = await db.getByType(item.type);
    let score = calc.score(item);
    for (let item of res) {
        if (calc.score(item) < score)
            return true;
    }
    if (Object.keys(res).length === 0) return true;
    return false;
}

/**
 * Возвращает худший предмет из кладовки
 * @returns  {Promise.<Item, Error>}  Худший предмет
 */
async function findWorstInKladovka() {
    let res = {},
        allItems = [],
        min_score = Number.POSITIVE_INFINITY;
    allItems = await db.getAll();
    for (let item of allItems) {
        let score = calc.score(item);
        if (score < min_score) {
            res = item;
            min_score = score;
        }
    }
    return res;
}

module.exports = {
    getFromKladovka,
    getAllFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    deleteAllFromKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka,
    clearCollection: db.clearCollection
};
