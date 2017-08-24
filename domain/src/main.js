const CONFIG = require('../../config/config.json');
const database = require('./' + CONFIG.DB);
const Item = require('./Item');


function connect(url) {
    return database.connect(url);
}
function disconnect(db) {
    return database.disconnect(db);
}
/**
 * Укладывает предмет в кладовку
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {Promise.<String, Error>} Идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(db, coll, item) {
    return database.add(db, coll, item);
}

/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Promise.<Item, Error>} Искомый предмет
 */
function getFromKladovka(db, coll, id) {
    return database.getById(db, coll, id);
}

/**
 * Получает все предметы из кладовки
 * @returns {Promise.<Item, Error>} Коллекция предметов
 */
function getAllFromKladovka(db, coll) {
    return database.getAll(db, coll);
}

/**
 * Удаляет предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор предмета для удаления
 * @returns  {Promise.<String, Error>} Идентификатор удалённого предмета
 */
function deleteFromKladovka(db, coll, id) {
    return database.deleteById(db, coll, id);
}

/**
 * Удаляет ВСЕ предметы из кладовки
 * @returns  {Promise.<Number, Error>} Количество удалённых объектов
 */
function deleteAllFromKladovka(db, coll) {
    return database.deleteAll(db, coll);
}

function clearKladovka(db, coll) {
    return database.clearCollection(db, coll);
}
function replaceInKladovka(db, coll, id, item) {
    return database.replaceById(db, coll, id, item);
}
/**
 * Сравнивает 2 предмета
 * @param {Item} item1 - Первый предмет
 * @param {Item} item2 - Второй предмет
 * @returns {Number} Возвращает -1 если первый предмет лучше, 1 если второй. 0 если равны
 */
function compareItems(item1, item2) {
    let score1 = Item.score(item1);
    let score2 = Item.score(item2);
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
async function isNeeded(db, coll, item) {
    let res = await database.getByType(db, coll, item.type);
    let score = Item.score(item);
    for (let item of res) {
        if (Item.score(item) < score)
            return true;
    }
    if (Object.keys(res).length === 0) return true;
    return false;
}

/**
 * Возвращает худший предмет из кладовки
 * @returns  {Promise.<Item, Error>}  Худший предмет
 */
async function findWorstInKladovka(db, coll) {
    let res = {},
        allItems = [],
        min_score = Number.POSITIVE_INFINITY;
    allItems = await database.getAll(db, coll);
    for (let item of allItems) {
        let score = Item.score(item);
        if (score < min_score) {
            res = item;
            min_score = score;
        }
    }
    return res;
}

module.exports = {
    connect,
    disconnect,
    getFromKladovka,
    getAllFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    deleteAllFromKladovka,
    replaceInKladovka,
    clearKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka
};
