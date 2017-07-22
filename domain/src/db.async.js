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
//////////////////////////////////////////////////

/**
 * Создаёт новую базу данных.
 * При считывании и записи объектов в базу происходит их копирование JSON'ификацией.
 * @returns {DB} Пустая, только что созданная, база данных.
 */
function db_initialize() {
    return {};
}

/**
 * Сохраняет копию объекта в базе данных под случайно сгенерированным
 * идентификатором и возвращает этот идентификатор.
 * @param {DB} db - База данных, в которую будет добавлен объект.
 * @param {Object} entity - Этот объект будет сохранен в базу.
 * @returns {Promise.<String, Error>} Если обещание сдержанно, то оно вернёт id добавленного объекта.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_add(db, coll, entity) {
    let id = guid();
    return db_add_by_id(db, coll, id, entity);
}

/**
 * Сохраняет копию объекта в базе данных под указанным идентификатором.
 * @param {DB} db - База данных, в которую будет добавлен объект.
 * @param {String} id - Идентификатор, под которым объект будет добавлен.
 * @param {Object} entity - Этот объект будет сохранен в базу.
 * @returns {Promise.<String, Error>} Если обещание сдержанно, то оно вернёт id добавленного объекта.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_add_by_id(db, coll, id, entity) {
    let promise = new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            if (db[coll] === undefined) db[coll] = {};
            db[coll][id] = utility.clone(entity);
            resolve(id);
        }
    });
    return promise;
}

/**
 * Считывает объект из базы данных под указанным идентификатором.
 * Полученный объект является копией объекта из базы.
 * @param {DB} db - База данных, из которой будет считан объект.
 * @param {String} id - Идентификатор объекта для считывания.
 * @returns {Promise.<Object, Error>} Если обещание сдержанно, то оно вернёт искомый объект, если его нет в БД, то вернёт значение null.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_get_by_id(db, coll, id) {
    return new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            if (db[coll] === undefined) db[coll] = {};
            if (db[coll][id] === undefined)
                resolve(null);
            else
                resolve(utility.clone(db[coll][id]));
        }
    });
}

/**
 * Получить все объекты из БД.
 * @param {DB} db - База данных, в которой будут искаться объекты.
 * @returns {Promise.<Object, Error>} Если обещание сдержанно, то оно вернёт коллекцию объектов.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_get_all(db, coll) {
    return new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            if (db[coll] === undefined)
                resolve({});
            else
                resolve(utility.clone(db[coll]));
        }
    });
}

/**
 * Создаёт коллекцию объектов, нужного свойства.
 * @param {DB} db - База данных, в которой будут искаться объекты.
 * @param {String} prop - Имя искомого свойства.
 * @param {String} value - Значение искомого свойства.
 * @returns {Promise.<Object, Error>} Если обещание сдержанно, то оно вернёт коллекцию объектов данного типа.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_get_by_prop(db, coll, prop, value) {
    let promise = new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            if (db[coll] === undefined)
                resolve({});
            else {
                let res = utility.filterObj(db[coll], function (item) {
                    return item[prop] === value;
                });
                resolve(utility.clone(res));
            }
        }
    });
    return promise;
}

function db_clear_collection(db, coll) {
    delete db[coll];
}

module.exports = {
    guid,
    initialize: db_initialize,
    add: db_add,
    add_by_id: db_add_by_id,
    get_by_id: db_get_by_id,
    get_all: db_get_all,
    get_by_prop: db_get_by_prop,
    clear_collection: db_clear_collection
};
