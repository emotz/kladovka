const CONFIG = require('../../domain/src/config.js');
const database = require('./' + CONFIG.DB);
const Item = require('./Item');


/**
 * Открывает соединение с сервером БД
 * @param {String} url - Адрес сервера БД
 * @returns {Promise.<Object, Error>} БД
 */
function connect(url) {
    return database.connect(url);
}

/**
 * Закрывает соединение с сервером БД
 */
function disconnect() {
    return database.disconnect();
}

/**
 * Укладывает предмет в кладовку
 * @param {Srting} coll - Коллекция
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {Promise.<String, Error>} Идентификатор предмета уложенного в кладовку
 */
function addToKladovka(coll, item) {
    return database.add(coll, item);
}

/**
 * Укладывает предметы в кладовку
 * @param {Srting} coll - Коллекция
 * @param {Array} items - Предметы, которые будут уложены в кладовку
 * @returns {Promise.<Nubmer, Error>} Кол-во добавленных предметов
 */
function addItemsInKladovka(coll, items) {
    return database.addItemsArray(coll, items);
}

/**
 * Получает предмет из кладовки под указанным идентификатором
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Promise.<Item, Error>} Искомый предмет
 */
function getFromKladovka(coll, id) {
    return database.getById(coll, id);
}

/**
 * Получает все предметы из кладовки
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Item, Error>} Коллекция предметов
 */
function getAllFromKladovka(coll) {
    return database.getAll(coll);
}

/**
 * Удаляет предмет из кладовки под указанным идентификатором
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор предмета для удаления
 * @returns  {Promise.<String, Error>} Идентификатор удалённого предмета
 */
function deleteFromKladovka(coll, id) {
    return database.deleteById(coll, id);
}

/**
 * Удаляет ВСЕ предметы из кладовки
 * @param {Srting} coll - Коллекция
 * @returns  {Promise.<Number, Error>} Количество удалённых объектов
 */
function deleteAllFromKladovka(coll) {
    return database.deleteAll(coll);
}
/**
 * Удаляет ВСЕ предметы из кладовки
 * @param {Srting} coll - Коллекция
 * @returns  {Promise.<Number, Error>} Количество удалённых объектов
 */
function deleteAllByPropFromKladovka(coll, prop, value) {
    return database.deleteAllByProp(coll, prop, value);
}

/**
 * Получает массив объектов по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Array, Error>} Массив объектов
 */
function getAllByPropFromKladovka(coll, prop, value) {
    return database.getAllByProp(coll, prop, value);
}

/**
 * Получает объект по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
function getByPropFromKladovka(coll, prop, value) {
    return database.getByProp(coll, prop, value);
}

/**
 * Заменяет объект по id
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @param {Object} item - Этот объект будет сохранен в кладовку
 * @returns {Promise.<Boolean, Error>} Истина если есть объект под данным id
 */
function replaceInKladovka(coll, id, item) {
    return database.replaceById(coll, id, item);
}

/**
 * Очищает кладовку
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
function clearKladovka(coll) {
    return database.clearCollection(coll);
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
 * @param {Srting} coll - Коллекция
 * @param {Item} item - Проверяемый предмет
 * @returns {Promise.<Boolean, Error>}  True, если предмет нужен. False, если нет
 */
async function isNeeded(coll, item) {
    let res = await database.getAllByProp(coll, 'type', item.type);
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
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Item, Error>}  Худший предмет
 */
async function findWorstInKladovka(coll) {
    let res = {},
        allItems = [],
        min_score = Number.POSITIVE_INFINITY;
    allItems = await database.getAll(coll);
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
    addToKladovka,
    addItemsInKladovka,
    deleteFromKladovka,
    deleteAllFromKladovka,
    deleteAllByPropFromKladovka,
    replaceInKladovka,
    getAllByPropFromKladovka,
    getByPropFromKladovka,
    clearKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka
};
