/**
 * @file Библиотека, реализующая простую in-memory базу данных. 
 * @author Dmitry Kunekin
 * @version 0.0.0.0.0.0.1a
 */

'use strict';
function log(msg) { console.log(msg); }
function assert(pred) { log(pred ? "Passed." : "Failed."); }
// Генератор  ДОХУЯ рандомных ID
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
function db_add_entity(db, entity) {
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
function db_add_entity_by_id(db, id, entity) {
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
function db_get_entity_by_id(db, id) {
    let res;
    res = db[id];
    return clone(res);
}

//////////////////////////////////////////////////
// Unit Tests
function test_db_initialize() {
    // Тестирует что база данных создается и возвращаемый объект определен и не null
    let db = db_initialize();

    assert(db !== undefined && db !== null);
}

function test_db_add_entity1() {
    // Тестирует что объект можно добавить в базу
    let db = db_initialize();
    let data_to_add = {
        huy: "jopa",
        'lamer': 'huyamer',
        pizda: "haha",
        "privet": "huyvet"
    };
    let id = db_add_entity(db, data_to_add);

    assert(id !== undefined && id !== null);
    assert(id !== "");
}

function test_db_add_entity2() {
    // Тестирует что два одинаковых объекта можно добавить в базу, и полученные id будут различны
    let db = db_initialize();
    let newData = {huy : 'jopa'};
    let snewData = {huy : 'jopa'};
    let id = db_add_entity(db,newData);
    let sid = db_add_entity(db,snewData);

    assert(id !== sid);
}

function test_db_add_entity3() {
    // Тестирует что один и тот же объект можно добавить в базу два раза, и полученные id будут различны
    let db = db_initialize();
    let newData = {huy : 'jopa'};
    let id = db_add_entity(db,newData);
    let sid = db_add_entity(db,newData);
    assert(id !== sid);
}

function test_db_get_entity_by_id1() {
    // Тестирует что можно записать объект в базу и затем прочитать его из базы по полученному id
    // Также проверяет, что прочитанный объект идентичен изначальному
    let db = db_initialize();
    let newData = {huy : 'jopa'};
    let id = db_add_entity(db,newData);
    let getdata = db_get_entity_by_id(db,id);
    assert(newData.huy === getdata.huy);
}

function test_db_get_entity_by_id2() {
    // Тестирует что если записать объект в базу, изменить одно из его свойств и затем 
    // прочитать его из базы, то полученный объект будет идентичен исходному,
    // а не измененному.
    let db = db_initialize();
    let data = {huy : 'jopa'};
    let tmp = clone(data);
    let id = db_add_entity(db,data);
    data.huy = 'pizda';
    let newData = db_get_entity_by_id(db,id);
    assert(newData.huy === tmp.huy);
}

function test_db_add_entity_by_id1() {
    // Тестирует что можно добавить объект в базу с собственноручно выбранным id
    let db = db_initialize();
    let newData = {pizda : 'huy'};
    let myid = '2';
    let id = db_add_entity_by_id(db,myid,newData);
    assert(id !== undefined && id !== null);
    assert(id !== "");
}

function test_db_add_entity_by_id2() {
    // Тестирует что можно добавить объект в базу с собственноручно выбранным id
    // затем считать его из базы и полученный объект будет идентичен исходному
    let db = db_initialize();
    let newData = {pizda : 'huy'};
    let myid = '2';
    let id = db_add_entity_by_id(db,myid,newData);
    let dbData = db_get_entity_by_id(db,id);
    assert(newData.pizda === dbData.pizda);
}

function test_db_add_entity_by_id3() {
    // Тестирует что при добавлении двух разных объектов с одним и тем же id запишется
    // объект, добавленный последним.
    let db = db_initialize();
    let newData = {huy : 'huy'};
    let extraNewData = {huy : 'jopa'};
    let myid = '3';
    let id = db_add_entity_by_id(db,myid,newData);
    let newid = db_add_entity_by_id(db,myid,extraNewData);
    let dbData = db_get_entity_by_id(db,newid);
    assert(dbData.huy === extraNewData.huy);
}
//let huy = {huy : 'pizda'};
//let db = db_initialize();
//console.log(db_add_entity_by_id(db,'12',huy));
test_db_initialize();
test_db_add_entity1();
test_db_add_entity2();
test_db_add_entity3();
test_db_get_entity_by_id1();
//test_db_get_entity_by_id2();
test_db_add_entity_by_id1();
test_db_add_entity_by_id2();
test_db_add_entity_by_id3();
