const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/kladovka';
const coll = 'items';


/**
 * Сохраняет объект в БД
 * @param {Object} item - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} Если обещание сдержанно,
 * то оно вернет id добавленного объекта, иначе ошибку
 */
async function addItem(item){
    let db = await mongo.connect(url);
    let collection = await db.collection(coll);
    let res = await collection.insertOne(item);
    db.close();
    return res.insertedId;
}

/**
 * Получает из базы данных не удаленный объект
 * @param {String} id - идентефикатор искомого объекта
 * @returns {Promise.<Object, Error>} Если обещание сдержанно,
 * то оно вернет объект, иначе ошибку. Если предмета нет, то вернется значение null 
 */
async function getNotDeletedItemByID(id){
    let db = await mongo.connect(url);
    let collection = db.collection(coll);
    let item = await collection.findOne({'_id':id, deleted:undefined});
    db.close();
    return item;
}

/**
 * Удаляет объект из БД
 * @param {String} id - идентефикатор удаляемого объекта
 * @returns {Promise.<String, Error>} Если обещание сдержанно,
 * то оно вернет id удаленного объекта, иначе ошибку
 */
async function deleteItemByID(id){
    let db = await mongo.connect(url);
    let collection = await db.collection(coll);
    let res = await collection.updateOne({'_id':id}, {$set:{'deleted':true}});
    db.close();
    return id;
}

/**
 * Возвращает массив объектов(не удаленных)
 * @returns {Promise.<Array, Error>} Если обещание сдержанно,
 * то оно вернет массив не удаленных объекта, иначе ошибку
 */
async function getNotDeletedItems(){
    let db = await mongo.connect(url);
    let collection = db.collection(coll);
    let res = await collection.find({'deleted':undefined}).toArray();
    db.close();
    return res;
}

module.exports={
    add: addItem,
    getByID: getNotDeletedItemByID,
    deleteByID: deleteItemByID,
    getAll: getNotDeletedItems    
}