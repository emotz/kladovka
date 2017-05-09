const db = require('./db.async');
let kladovka = db.initialize();

/**
 * Сохраняет объект в БД
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(item) {
    return db.add(kladovka, item);
}

/**
 * Получает из базы данных объект (не удаленный)
 * @param {String} id - идентефикатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(id) {
    let res = await db.get_by_id(kladovka, id);
    if (res !== null && res.deleted === undefined) return res;
    return null;
}

/**
 * Удаляет объект из БД
 * @param {String} id - идентефикатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удаленного объекта
 */
async function deleteItemById(id) {
    let res = await db.get_by_id(kladovka, id);
    if (res === null) return id;
    res.deleted = true;
    await db.add_by_id(kladovka, id, res);
    return id;
}

/**
 * Удаляет ВСЕ объекты из БД
 * @returns {Promise.<Number, Error>} Количество удаленных объектов
 */
async function deleteAllItems() {
    let count = 0;
    let res = await db.get_all(kladovka);
    for (let id in res) {
        if (res[id].deleted === true) continue;
        res[id].deleted = true;
        count++;
    }
    kladovka = res;
    return count;
}

/**
 * Получает массив объектов(не удаленных)
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems() {
    let all = await db.get_all(kladovka);
    let res = [];
    for (let id in all) {
        if (all[id].deleted === true) continue;
        res.push(all[id]);
    }
    return res;
}

/**
 * Получает массив объектов(не удаленных) данного типа
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllItemsByType(type) {
    let all = await db.get_by_type(kladovka, type);
    let res = [];
    for (let id in all) {
        if (all[id].deleted === true) continue;
        let item = all[id];
        res.push(item);
    }
    return res;
}

/**
 * Очищает коллекцию
 * @returns {Promise.<Number, Error>} Количесво удаленных объектов
 */
async function clearCollection() {
    let all = await db.get_all(kladovka);
    kladovka = {};
    return Object.keys(all).length;
}

module.exports = {
    add: addItem,
    deleteById: deleteItemById,
    deleteAll: deleteAllItems,
    getById: getNotDeletedItemById,
    getAll: getNotDeletedItems,
    getByType: getAllItemsByType,
    clearCollection
};