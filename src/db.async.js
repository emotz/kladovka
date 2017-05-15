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
    let db = {};
    return db;
}

/**
 * Сохраняет копию объекта в базе данных под случайно сгенерированным
 * идентификатором и возвращает этот идентификатор.
 * @param {DB} db - База данных, в которую будет добавлен объект.
 * @param {Object} entity - Этот объект будет сохранен в базу.
 * @returns {Promise.<String, Error>} Если обещание сдержанно, то оно вернёт id добавленного объекта.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_add(db, entity) {
    let id = guid();
    return db_add_by_id(db, id, entity);
}

/**
 * Сохраняет копию объекта в базе данных под указанным идентификатором.
 * @param {DB} db - База данных, в которую будет добавлен объект.
 * @param {String} id - Идентификатор, под которым объект будет добавлен.
 * @param {Object} entity - Этот объект будет сохранен в базу.
 * @returns {Promise.<String, Error>} Если обещание сдержанно, то оно вернёт id добавленного объекта.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_add_by_id(db, id, entity) {
    let promise = new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            db[id] = utility.clone(entity);
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
function db_get_by_id(db, id) {
    return new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            if (db[id] === undefined)
                resolve(null);
            else
                resolve(utility.clone(db[id]));
        }
    });
}

/**
 * Получить все объекты из БД.
 * @param {DB} db - База данных, в которой будут искаться объекты.
 * @returns {Promise.<Object, Error>} Если обещание сдержанно, то оно вернёт коллекцию объектов.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_get_all(db) {
    return new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else
            resolve(utility.clone(db));
    });
}

/**
 * Создаёт коллекцию объектов, нужного типа.
 * @param {DB} db - База данных, в которой будут искаться объекты.
 * @param {String} type - Тип искомых объектов.
 * @returns {Promise.<Object, Error>} Если обещание сдержанно, то оно вернёт коллекцию объектов данного типа.
 * Если нет БД, то происходит отказ от обещания и вернётся ошибка.
 */
function db_get_by_type(db, type) {
    let promise = new Promise(function (resolve, reject) {
        if (db === undefined)
            reject(new Error('нет базы данных'));
        else {
            let res = utility.filterObj(db, function (item) {
                return item.type === type;
            });
            resolve(utility.clone(res));
        }
    });
    return promise;
}

module.exports = {
    initialize: db_initialize,
    add: db_add,
    add_by_id: db_add_by_id,
    get_by_id: db_get_by_id,
    get_all: db_get_all,
    get_by_type: db_get_by_type
};
