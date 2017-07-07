const utility = require('./utility');
const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;


async function connect(url) {
    return mongo.connect(url);
}

function disconnect(db) {
    db.close();
}

/**
 * Сохраняет объект в БД
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(db, coll, item) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    item = utility.clone(item);
    let res = await collection.insertOne(item);
    return res.insertedId;
}

/**
 * Получает из базы данных объект (не удалённый)
 * @param {String} id - идентификатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(db, coll, id) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let item = await collection.findOne({ _id: ObjectID(id), deleted: undefined });
    return item;
}

/**
 * Удаляет объект из БД
 * @param {String} id - идентификатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удалённого объекта
 */
async function deleteItemById(db, coll, id) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateOne({ _id: ObjectID(id) }, { $set: { 'deleted': true } });
    if (res.result.nModified === 0) return null;
    return id;
}

/**
 * Удаляет ВСЕ объекты из БД
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItems(db, coll) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateMany({ deleted: undefined }, { $set: { deleted: true } });
    return res.modifiedCount;
}

/**
 * Получает массив объектов(не удалённых)
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems(db, coll) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.find({ 'deleted': undefined }).toArray();
    return res;
}

/**
 * Получает массив объектов(не удалённых) данного типа
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllItemsByType(db, coll, type) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.find({ deleted: undefined, type }).toArray();
    return res;
}

/**
 * Полностью обновляет предмет(кроме id)
 * @returns {Promise.<Number, Error>} Количество найденных объектов
 */
async function replaceItemById(db, coll, id, item) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateOne({ _id: ObjectID(id) }, { $set: item });
    return res.result.n;
}

/**
 * Очищает коллекцию
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function clearCollection(db, coll) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.deleteMany({});
    return res.deletedCount;
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
