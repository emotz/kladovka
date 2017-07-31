const utility = require('./utility');
const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

let db = {};
/**
 * Открывает соединение с сервером MongoDB
 * @param {String} url - Адрес сервера MongoDB
 * @returns {Promise.<Object, Error>} БД
 */
async function connect(url) {
    db = await mongo.connect(url);
}

/**
 * Закрывает соединение с сервером MongoDB
 */
function disconnect() {
    db.close();
}

/**
 * Сохраняет объект в БД
 * @param {Srting} coll - Коллекция
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} id добавленного объекта
 */
async function addItem(coll, item) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    item = utility.clone(item);
    let res = await collection.insertOne(item);
    return res.insertedId;
}

/**
 * Получает из базы данных объект (не удалённый)
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemById(coll, id) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let item = await collection.findOne({ _id: ObjectID(id), deleted: undefined });
    return item;
}

/**
 * Удаляет объект из БД
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор удаляемого объекта
 * @returns {Promise.<String, Error>} id удалённого объекта
 */
async function deleteItemById(coll, id) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateOne({ _id: ObjectID(id) }, { $set: { 'deleted': true } });
    if (res.result.nModified === 0) return null;
    return id;
}

/**
 * Удаляет ВСЕ объекты из БД
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItems(coll) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateMany({ deleted: undefined }, { $set: { deleted: true } });
    return res.modifiedCount;
}

/**
 * Получает массив объектов(не удалённых)
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getNotDeletedItems(coll) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.find({ 'deleted': undefined }).toArray();
    return res;
}

/**
 * Получает массив объектов(не удалённых) данного типа
 * @param {Srting} coll - Коллекция
 * @param {Srting} type - Искомый тип
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllNotDeletedItemsByProp(coll, prop, value) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.find({ deleted: undefined, [prop]: value }).toArray();
    return res;
}

/**
 * Получает объект по заданному имени
 * @param {Srting} coll - Коллекция
 * @param {Srting} name - Имя по которому проводится поиск
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemByProp(coll, prop, value) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.findOne({ deleted: undefined, [prop]: value });
    return res;
}

/**
 * Заменяет объект по id
 * @param {Srting} coll - Коллекция
 * @param {String} id - Идентификатор искомого объекта
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<Boolean, Error>} Истина если есть объект под данным id
 */
async function replaceItemById(coll, id, item) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateOne({ _id: ObjectID(id) }, { $set: item });
    return !!res.result.n;
}

/**
 * Очищает коллекцию
 * @param {Srting} coll - Коллекция
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function clearCollection(coll) {
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
    getAllByProp: getAllNotDeletedItemsByProp,
    getByProp: getNotDeletedItemByProp,
    replaceById: replaceItemById,
    clearCollection
};
