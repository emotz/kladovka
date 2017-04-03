const db = require("./db.js");
const assert = require("assert");


it('test_db_initialize', function () {
    // Тестирует что база данных создается и возвращаемый объект определен и не null
    var test_db = db.db_initialize();
    assert(db !== undefined);
    assert(db !== null);
});

it('test_db_add_entity1', function () {
    // Тестирует что объект можно добавить в базу
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var id = db.db_add_entity(test_db, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");
});

it('test_db_add_entity2', function () {
    // Тестирует что два одинаковых объекта можно добавить в базу, и полученные id будут различны
    var test_db = db.db_initialize();
    var one = { qwer: 123 };
    var two = { qwer: 123 };
    var oneid = db.db_add_entity(test_db, one);
    var twoid = db.db_add_entity(test_db, two);
    assert(oneid !== twoid);
});

it('test_db_add_entity3', function () {
    // Тестирует что один и тот же объект можно добавить в базу два раза, и полученные id будут различны
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var oneid = db.db_add_entity(test_db, obj);
    var twoid = db.db_add_entity(test_db, obj);
    assert(oneid !== twoid);

});

it('test_db_get_entity_by_id1', function () {
    // Тестирует что можно записать объект в базу и затем прочитать его из базы по полученному id
    // Также проверяет, что прочитанный объект идентичен изначальному
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var id = db.db_add_entity(test_db, obj);
    var get = db.db_get_entity_by_id(test_db, id);
    assert(obj.qwer === get.qwer);

});

it('test_db_get_entity_by_id2', function () {
    // Тестирует что если записать объект в базу, изменить одно из его свойств и затем 
    // прочитать его из базы, то полученный объект будет идентичен исходному,
    // а не измененному.
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var id = db.db_add_entity(test_db, obj);
    obj.qwer = 'stroka';
    var get = db.db_get_entity_by_id(test_db, id);
    assert(get.qwer === 123);

});

it('test_db_add_entity_by_id1', function () {
    // Тестирует что можно добавить объект в базу с собственноручно выбранным id
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var my_id = 666;
    var id = db.db_add_entity_by_id(test_db, my_id, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");

});

it('test_db_add_entity_by_id2', function () {
    // Тестирует что можно добавить объект в базу с собственноручно выбранным id
    // затем считать его из базы и полученный объект будет идентичен исходному
    var test_db = db.db_initialize();
    var obj = { qwer: 123 };
    var my_id = 666;
    var id = db.db_add_entity_by_id(test_db, my_id, obj);
    var get = db.db_get_entity_by_id(test_db, id);
    assert(obj.qwer === get.qwer);
});

it('test_db_add_entity_by_id3', function () {
    // Тестирует что при добавлении двух разных объектов с одним и тем же id запишется
    // объект, добавленный последним.
    var test_db = db.db_initialize();
    var one = { qwer: 123 };
    var two = { qwer: 'olo' };
    var my_id = 666;
    db.db_add_entity_by_id(test_db, my_id, one);
    db.db_add_entity_by_id(test_db, my_id, two);
    var get = db.db_get_entity_by_id(test_db, my_id);
    assert(get.qwer===two.qwer);
});