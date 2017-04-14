const db = require("../src/db.js");
const assert = require("assert");


it('создает БД', function () {
    let test_db = db.initialize();
    assert(db !== undefined);
    assert(db !== null);
});

it('добавляет объект в БД', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let id = db.add(test_db, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");
});

it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', function () {
    let test_db = db.initialize();
    let one = { qwer: 123 };
    let two = { qwer: 123 };
    let oneid = db.add(test_db, one);
    let twoid = db.add(test_db, two);
    assert(oneid !== twoid);
});

it('добавляет один и тот же объект в БД несколько раз', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let oneid = db.add(test_db, obj);
    let twoid = db.add(test_db, obj);
    assert(oneid !== twoid);

});

it('записывает объект в базу, и считывает его по полученному id', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let id = db.add(test_db, obj);
    let get = db.get_by_id(test_db, id);
    assert(obj.qwer === get.qwer);

});

it('сохраняет данные в БД, и они остаются не изменны, если изменяется состояние исходного объекта', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let id = db.add(test_db, obj);
    obj.qwer = 'stroka';
    let get = db.get_by_id(test_db, id);
    assert(get.qwer === 123);

});

it('добавляет объект в БД с собственноручно выбранным id', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let my_id = 666;
    let id = db.add_by_id(test_db, my_id, obj);
    assert(id !== undefined && id !== null);
    assert(id !== "");

});

it('добавляет объект в БД с собственноручно выбранным id и получает его из БД', function () {
    let test_db = db.initialize();
    let obj = { qwer: 123 };
    let my_id = 666;
    let id = db.add_by_id(test_db, my_id, obj);
    let get = db.get_by_id(test_db, id);
    assert(obj.qwer === get.qwer);
});

it('записывает несколько объектов в БД с одинаковым id, и в БД окажется последний добавленный ', function () {
    let test_db = db.initialize();
    let one = { qwer: 123 };
    let two = { qwer: 'olo' };
    let my_id = 666;
    db.add_by_id(test_db, my_id, one);
    db.add_by_id(test_db, my_id, two);
    let get = db.get_by_id(test_db, my_id);
    assert(get.qwer === two.qwer);
});

it('записывает в новый объект, данные типа "sword"', function () {
    let test_db = db.initialize();
    let item1 = { id: 1, type: 'sword' };
    let item2 = { id: 2, type: 'axe' };
    let item3 = { id: 3, type: 'sword' };
    db.add_by_id(test_db, item1.id, item1);
    db.add_by_id(test_db, item2.id, item2);
    db.add_by_id(test_db, item3.id, item3);
    let swords = db.get_by_type(test_db, 'sword');
    assert(swords[1].id === item1.id);
    assert(swords[2] === undefined);
    assert(swords[3].id === item3.id);
});