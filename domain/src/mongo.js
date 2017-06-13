const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;


async function connectToDb(url) {
    return mongo.connect(url);
}

/**
 * Сохраняет объект в БД
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(db, coll, item) {
    let collection = db.collection(coll);
    let res = await collection.insertOne(item);
    return res.insertedId;
}

/**
 * Получает из базы данных объект (не удалённый)
 * @param {String} id - идентификатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(db, coll, id) {
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
    let collection = db.collection(coll);
    let res = await collection.updateMany({ deleted: undefined }, { $set: { deleted: true } });
    return res.modifiedCount;
}

/**
 * Получает массив объектов(не удалённых)
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems(db, coll) {
    let collection = db.collection(coll);
    let res = await collection.find({ 'deleted': undefined }).toArray();
    return res;
}

/**
 * Получает массив объектов(не удалённых) данного типа
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllItemsByType(db, coll, type) {
    let collection = db.collection(coll);
    let res = await collection.find({ deleted: undefined, type }).toArray();
    return res;
}

/**
 * Очищает коллекцию
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function clearCollection(db, coll) {
    let collection = db.collection(coll);
    let res = await collection.deleteMany({});
    return res.deletedCount;
}

module.exports = {
    connect: connectToDb,
    add: addItem,
    deleteById: deleteItemById,
    deleteAll: deleteAllItems,
    getById: getNotDeletedItemById,
    getAll: getNotDeletedItems,
    getByType: getAllItemsByType,
    clearCollection
};
