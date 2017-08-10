const utility = require('./utility');
const database = require('./db.async');

let db = {};
/**
 * Открывает соединение с сервером БД
 * @param {String} url - Адрес сервера БД
 * @returns {Promise.<Object, Error>} БД
 */
async function connect(url) {
    //много строчек кода работы с url
    return database.initialize();
}

/**
 * Закрывает соединение с сервером БД
 */
function disconnect() {
    //много строчек кода работы с db
}

/**
 * Сохраняет объект в БД
 * @param {Srting} coll - Коллекция
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(coll, item) {
    let _id = utility.guid();
    item = utility.clone(item);
    item._id = _id;
    return database.add_by_id(db, coll, _id, item);
}

/**
 * Сохраняет массив объектов в БД
 * @param {Srting} coll - Коллекция
 * @param {Array} array - Массив объектов
 * @returns {Promise.<Number, Error>} Кол-во добавленных объектов
 */
async function addItemsArray(coll, arr) {
    let count = 0;
    for (let item of arr) {
        await addItem(coll, item);
        count++;
    }
    return count;
}
/**
 * Получает из базы данных объект (не удалённый)
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(coll, id) {
    let res = await database.get_by_id(db, coll, id);
    if (res !== null && res.deleted === undefined) return res;
    return null;
}

/**
 * Удаляет объект из БД
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удалённого объекта
 */
async function deleteItemById(coll, id) {
    let res = await database.get_by_id(db, coll, id);
    if (res === null) return id;
    res.deleted = true;
    return database.add_by_id(db, coll, id, res);
}

/**
 * Удаляет ВСЕ объекты из БД
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItems(coll) {
    let count = 0;
    let res = await database.get_all(db, coll);
    for (let id in res) {
        if (res[id].deleted === true) continue;
        await deleteItemById(coll, id);
        count++;
    }
    return count;
}

/**
 * Удаляет ВСЕ объекты из БД по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItemsByProp(coll, prop, value) {
    let count = 0;
    let res = await database.get_by_prop(db, coll, prop, value);
    for (let id in res) {
        if (res[id].deleted === true) continue;
        await deleteItemById(coll, id);
        count++;
    }
    return count;
}

/**
 * Получает массив объектов(не удалённых)
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems(coll) {
    let all = await database.get_all(db, coll);
    return selectNotDeletedItems(all);
}

/**
 * Получает массив объектов(не удалённых) по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllNotDeletedItemsByProp(coll, prop, value) {
    let all = await database.get_by_prop(db, coll, prop, value);
    return selectNotDeletedItems(all);
}

/**
 * Получает объект по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemByProp(coll, prop, value) {
    let all = await database.get_by_prop(db, coll, prop, value);
    return selectFirstNotDeletedItem(all);
}

/**
 * Заменяет объект по id
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<Boolean, Error>} Истина если есть объект под данным id
 */
async function replaceItemById(coll, id, item) {
    if (await database.get_by_id(db, coll, id)) {
        await database.add_by_id(db, coll, id, item);
        return true;
    } else
        return false;
}

/**
 * Очищает коллекцию
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function clearCollection(coll) {
    let all = await database.get_all(db, coll);
    database.clear_collection(db, coll);
    return Object.keys(all).length;
}

function selectNotDeletedItems(dict) {
    let res = [];
    for (let id in dict) {
        if (dict[id].deleted === true) continue;
        res.push(dict[id]);
    }
    return res;
}

function selectFirstNotDeletedItem(dict) {
    for (let id in dict) {
        if (dict[id].deleted === true) continue;
        return dict[id];
    }
    return null;
}

module.exports = {
    connect,
    disconnect,
    add: addItem,
    addItemsArray,
    deleteById: deleteItemById,
    deleteAll: deleteAllItems,
    deleteAllByProp: deleteAllItemsByProp,
    getById: getNotDeletedItemById,
    getAll: getNotDeletedItems,
    getAllByProp: getAllNotDeletedItemsByProp,
    getByProp: getNotDeletedItemByProp,
    replaceById: replaceItemById,
    clearCollection
};
