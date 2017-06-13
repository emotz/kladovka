const dataBase = require('./mongo.js');
const Item = require('./Item');


function connect(url){
    return dataBase.connect(url);
}
/**
 * Укладывает предмет в кладовку
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {Promise.<String, Error>} Идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(item, coll, db) {
    return dataBase.add(item, coll, db);
}

/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Promise.<Item, Error>} Искомый предмет
 */
function getFromKladovka(id, coll, db) {
    return dataBase.getById(id, coll, db);
}

/**
 * Получает все предметы из кладовки
 * @returns {Promise.<Item, Error>} Коллекция предметов
 */
function getAllFromKladovka(coll, db) {
    return dataBase.getAll(coll, db);
}

/**
 * Удаляет предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор предмета для удаления
 * @returns  {Promise.<String, Error>} Идентификатор удалённого предмета
 */
function deleteFromKladovka(id, coll, db) {
    return dataBase.deleteById(id, coll, db);
}

/**
 * Удаляет ВСЕ предметы из кладовки
 * @returns  {Promise.<Number, Error>} Количество удалённых объектов
 */
function deleteAllFromKladovka(coll, db) {
    return dataBase.deleteAll(coll, db);
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
async function isNeeded(item, coll, db) {
    let res = await dataBase.getByType(item.type, coll, db);
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
async function findWorstInKladovka(coll, db) {
    let res = {},
        allItems = [],
        min_score = Number.POSITIVE_INFINITY;
    allItems = await dataBase.getAll(coll, db);
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
    getFromKladovka,
    getAllFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    deleteAllFromKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka,
    clearCollection: dataBase.clearCollection
};
