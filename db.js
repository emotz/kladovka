/**
 * @file Библиотека, реализующая простую in-memory базу данных. 
 * @author emotz
 * @version 0.0.0.0.0.0.1a
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
 * @returns {String} Идентификатор только что добавленного объекта
 */
function db_add(db, entity) {
    let id = guid();
    db[id] = clone(entity);
    return id;
}

/**
 * Сохраняет копию объекта в базе данных под указанным идентификатором.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, в которую будет добавлен объект
 * @param {String} id - Идентификатор, под которым объект будет добавлен
 * @param {Object} entity - Этот объект будет сохранен в базу
 */
function db_add_by_id(db, id, entity) {
    db[id] = clone(entity);
    return id;
}

/**
 * Считывает объект из базы данных под указанным идентификатором. 
 * Полученный объект является копией объекта из базы.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, из которой будет считан объект
 * @param {String} id - Идентификатор объекта для считывания
 * @returns {Object|undefined} Запрашиваемый объект. Равен `undefined` если указанный идентификатор отсутствует.
 */
function db_get_by_id(db, id) {
    let res;
    res = db[id];
    return clone(res);
}


/**
 * Создает коллекцию объектов, нужного типа
 * @param {DB} db - База данных, в которой будут искаться объекты
 * @param {String} type - Тип искомых объектов
 * @returns {Object|undefined} Коллекция или `undefined` если предметы нужного типа отсутствуют.
 */
function db_get_by_type(db, type) {
    return utility.filterObj(db, function (item) {
        return item.type === type;
    });
}

module.exports = {
    initialize: db_initialize,
    add: db_add,
    add_by_id: db_add_by_id,
    get_by_id: db_get_by_id,
    get_by_type: db_get_by_type,
};