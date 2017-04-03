const db = require("./db.js");
const assert = require("assert");


it('создает БД', function () {
    var test_db = db.initialize();
    assert(db !== undefined);
    assert(db !== null);
});

it('добавляет объект в БД', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var id = db.add_entity(test_db, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");
});

it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', function () {
    var test_db = db.initialize();
    var one = { qwer: 123 };
    var two = { qwer: 123 };
    var oneid = db.add_entity(test_db, one);
    var twoid = db.add_entity(test_db, two);
    assert(oneid !== twoid);
});

it('добавляет один и тот же объект в БД несколько раз', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var oneid = db.add_entity(test_db, obj);
    var twoid = db.add_entity(test_db, obj);
    assert(oneid !== twoid);

});

it('записывает объект в базу, и считывает его по полученному id', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var id = db.add_entity(test_db, obj);
    var get = db.get_entity_by_id(test_db, id);
    assert(obj.qwer === get.qwer);

});

it('сохраняет данные в БД, и они остаются не изменны, если изменяется состояние исходного объекта', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var id = db.add_entity(test_db, obj);
    obj.qwer = 'stroka';
    var get = db.get_entity_by_id(test_db, id);
    assert(get.qwer === 123);

});

it('добавляет объект в БД с собственноручно выбранным id', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var my_id = 666;
    var id = db.add_entity_by_id(test_db, my_id, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");

});

it('добавляет объект в БД с собственноручно выбранным id и получает его из БД', function () {
    var test_db = db.initialize();
    var obj = { qwer: 123 };
    var my_id = 666;
    var id = db.add_entity_by_id(test_db, my_id, obj);
    var get = db.get_entity_by_id(test_db, id);
    assert(obj.qwer === get.qwer);
});

it('записывает несколько объектов в БД с одинаковым id, и в БД окажется последний добавленный ', function () {
    var test_db = db.initialize();
    var one = { qwer: 123 };
    var two = { qwer: 'olo' };
    var my_id = 666;
    db.add_entity_by_id(test_db, my_id, one);
    db.add_entity_by_id(test_db, my_id, two);
    var get = db.get_entity_by_id(test_db, my_id);
    assert(get.qwer===two.qwer);
});