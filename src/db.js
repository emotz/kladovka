/**
 * @file Библиотека, реализующая асинхронную in-memory базу данных. 
 * @author emotz
 * @version 1.0.0
 */
'use strict';

const utility = require('./utility');

// Генератор рандомных ID
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//////////////////////////////////////////////////

/**
 * Создает новую базу данных. 
 * При считывании и записи объектов в базу происходит их копирование JSON'ификацией.
 * См. секцию Unit Tests для примера использования.
 * @returns {DB} Пустая, только что созданная, база данных
 */
function db_initialize() {
    let db = {};
    return db;
}

/**
 * Сохраняет копию объекта в базе данных под случайно сгенерированным 
 * идентификатором и возвращает этот идентификатор. См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, в которую будет добавлен объект
 * @param {Object} entity - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} Если обещание сдерженно,
 * то оно вернет id добавленного объекта, иначе ошибку
 */
/*function db_add(db, entity) {
    let id = guid();
    db[id] = clone(entity);
    return id;
}*/

function db_add(db, entity) {
    let id = guid();
    let promise = new Promise(function (resolve, reject) {
        if (db[id] = clone(entity))
            resolve(id);
        else
            reject(new Error('не засунул'));
    });
    return promise;
}


/**
 * Сохраняет копию объекта в базе данных под указанным идентификатором.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, в которую будет добавлен объект
 * @param {String} id - Идентификатор, под которым объект будет добавлен
 * @param {Object} entity - Этот объект будет сохранен в базу
 * @returns {Promise.<String, Error>} Если обещание сдерженно,
 * то оно вернет id добавленного объекта, иначе ошибку
 */
function db_add_by_id(db, id, entity) {
    let promise = new Promise(function (resolve, reject) {
        if (db[id] = clone(entity))
            resolve(id);
        else
            reject(new Error('не засунул'));
    });
    return promise;
}

/**
 * Считывает объект из базы данных под указанным идентификатором. 
 * Полученный объект является копией объекта из базы.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, из которой будет считан объект
 * @param {Promise.<String>} id - Идентификатор объекта для считывания
 * @returns {Promise.<Object, Error>} Если обещание сдерженно,
 * то оно вернет объект, иначе ошибку
 */
function db_get_by_id(db, id) {
    let promise = new Promise(function (resolve, reject) {
        let res = db[id];
        if (res)
            resolve(res);
        else
            reject(new Error('нет такого предмета в БД'));
    });
    return promise;
}


/**
 * Создает коллекцию объектов, нужного типа
 * @param {DB} db - База данных, в которой будут искаться объекты
 * @param {String} type - Тип искомых объектов
 * @returns {Promise.<Object, Error>} Если обещание сдерженно,
 * то оно вернет коллекцию объектов искомого типа, иначе, в случае отказа от обещания, вернется ошибка
 */
function db_get_by_type(db, type) {
    let promise = new Promise(function (resolve, reject) {
        let res = utility.filterObj(db, function (item) {
            return item.type === type;
        });
        if( Object.keys[res].length)
            resolve();
        else
            reject(new Error('нет предметов такого типа'));
    return promise;
    });
}

module.exports = {
    initialize: db_initialize,
    add: db_add,
    add_by_id: db_add_by_id,
    get_by_id: db_get_by_id,
    get_by_type: db_get_by_type,
};