const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017/kladovka';
const coll = 'items';


/**
 * Сохраняет объект в БД
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(item) {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let res = await collection.insertOne(item);
        db.close();
        return res.insertedId;
    } catch (e) {
        return e;
    }
}

/**
 * Получает из базы данных объект (не удаленный)
 * @param {String} id - идентефикатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(id) {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let item = await collection.findOne({ _id: ObjectID(id), deleted: undefined });
        db.close();
        return item;
    } catch (e) {
        return e;
    }
}

/**
 * Удаляет объект из БД
 * @param {String} id - идентефикатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удаленного объекта
 */
async function deleteItemById(id) {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let res = await collection.updateOne({ _id: ObjectID(id) }, { $set: { 'deleted': true } });
        db.close();
        if (res.result.nModified === 0) return null;
        return id;
    } catch (e) {
        return e;
    }
}


/**
 * Удаляет ВСЕ объекты из БД
 * @returns {Promise.<Number, Error>} Количество удаленных объектов
 */
async function deleteAllItems() {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let res = await collection.updateMany({ deleted: undefined }, { $set: { deleted: true } });
        db.close();
        return res.modifiedCount;
    } catch (e) {
        return e;
    }
}

/**
 * Получает массив объектов(не удаленных)
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems() {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let res = await collection.find({ 'deleted': undefined }).toArray();
        db.close();
        return res;
    } catch (e) {
        return e;
    }
}

/**
 * Получает массив объектов(не удаленных) данного типа
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllItemsByType(type) {
    try {
        let db = await mongo.connect(url);
        let collection = db.collection(coll);
        let res = await collection.find({ deleted: undefined, type }).toArray();
        db.close();
        return res;
    } catch (e) {
        return e;
    }

}

module.exports = {
    add: addItem,
    deleteById: deleteItemById,
    deleteAll: deleteAllItems,
    getById: getNotDeletedItemById,
    getAll: getNotDeletedItems,
    getByType: getAllItemsByType
};