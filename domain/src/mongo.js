const utility = require('./utility');
const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

let db = undefined;
/**
 * Открывает соединение с сервером MongoDB
 * @param {String} url - Адрес сервера MongoDB
 * @returns {Promise.<Object, Error>} БД
 */
async function connect(url) {
    do {
        try {
            db = await mongo.connect(url);
        } catch (e) {
            continue;
        }
    }
    while (db === undefined);
}

/**
 * Закрывает соединение с сервером MongoDB
 */
function disconnect() {
    db.close();
    db = undefined;
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
 * Сохраняет массив объектов в БД
 * @param {Srting} coll - Коллекция
 * @param {Array} array - Массив объектов
 * @returns {Promise.<Number, Error>} Кол-во добавленных объектов
 */
async function addItemsArray(coll, arr) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.insertMany(arr);
    return res.insertedCount;
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
    if (item !== null)
        item._id = item._id.toString();
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
 * Удаляет ВСЕ объекты из БД по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Number, Error>} Количество удалённых объектов
 */
async function deleteAllItemsByProp(coll, prop, value) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.updateMany({ deleted: undefined, [prop]: value }, { $set: { deleted: true } });
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
    if (res.length) {
        res.map(item => {
            item._id = item._id.toString();
            return item;
        });
    }
    return res;
}

/**
 * Получает массив объектов(не удалённых) по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Array, Error>} Массив объектов
 */
async function getAllNotDeletedItemsByProp(coll, prop, value) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.find({ deleted: undefined, [prop]: value }).toArray();
    if (res.length) {
        res.map(item => {
            item._id = item._id.toString();
            return item;
        });
    }
    return res;
}

/**
 * Получает объект по заданному свойству
 * @param {Srting} coll - Коллекция
 * @param {Srting} prop - Свойство по которому проводится поиск
 * @param {Srting} value - Значение свойства, по которому проводится поиск
 * @returns {Promise.<Object, Error>} Объект или null если такого объекта нет
 */
async function getNotDeletedItemByProp(coll, prop, value) {
    if (db === undefined) throw new Error('нет базы данных');
    let collection = db.collection(coll);
    let res = await collection.findOne({ deleted: undefined, [prop]: value });
    if (res !== null)
        res._id = res._id.toString();
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
    delete item._id;
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
