const utility = require('./utility');
const database = require('./db.async');

/**
 * Открывает соединение с сервером MongoDB
 * @param {String} url - Адрес сервера MongoDB
 * @returns {Promise.<Object, Error>} БД 
 */
async function connect(url) {
    //много строчек кода работы с url
    return database.initialize();
}

/**
 * Закрывает соединение с сервером MongoDB
 * @param {Object} db - БД
 */
function disconnect(db) {
    //много строчек кода работы с db
}

/**
 * Сохраняет объект в БД
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(db, coll, item) {
    let _id = database.guid();
    item = utility.clone(item);
    item._id = _id;
    return database.add_by_id(db, coll, _id, item);
}

/**
 * Получает из базы данных объект (не удалённый)
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(db, coll, id) {
    let res = await database.get_by_id(db, coll, id);
    if (res !== null && res.deleted === undefined) return res;
    return null;
}

/**
 * Удаляет объект из БД
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удалённого объекта
 */
async function deleteItemById(db, coll, id) {
    let res = await database.get_by_id(db, coll, id);
    if (res === null) return id;
    res.deleted = true;
    return database.add_by_id(db, coll, id, res);
}

/**
 * Удаляет ВСЕ объекты из БД
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItems(db, coll) {
    let count = 0;
    let res = await database.get_all(db, coll);
    for (let id in res) {
        if (res[id].deleted === true) continue;
        await deleteItemById(db, coll, id);
        count++;
    }
    return count;
}

/**
 * Получает массив объектов(не удалённых)
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems(db, coll) {
    let all = await database.get_all(db, coll);
    return selectNotDeleted(all);
}

/**
 * Получает массив объектов(не удалённых) данного типа
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @param {Srting} type - Искомый тип
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllItemsByType(db, coll, type) {
    let all = await database.get_by_type(db, coll, type);
    return selectNotDeleted(all);
}

function selectNotDeleted(dict) {
    let res = [];
    for (let id in dict) {
        if (dict[id].deleted === true) continue;
        res.push(dict[id]);
    }
    return res;
}

/**
 * Заменяет объект по id
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<Boolean, Error>} Истина если есть объект под данным id
 */
async function replaceItemById(db, coll, id, item) {
    if (await database.get_by_id(db, coll, id)) {
        await database.add_by_id(db, coll, id, item);
        return true;
    } else
        return false;
}

/**
 * Очищает коллекцию
 * @param {Object} db - БД
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function clearCollection(db, coll) {
    let all = await database.get_all(db, coll);
    database.clear_collection(db, coll);
    return Object.keys(all).length;
}

module.exports = {
    connect,
    disconnect,
    add: addItem,
    deleteById: deleteItemById,
    deleteAll: deleteAllItems,
    getById: getNotDeletedItemById,
    getAll: getNotDeletedItems,
    getByType: getAllItemsByType,
    replaceById: replaceItemById,
    clearCollection
};
