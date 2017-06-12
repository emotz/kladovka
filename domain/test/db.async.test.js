const assert = require('assert');
const mongo = require('../src/mongo');
//const db = require('../src/db.async.proxy');
const url = 'mongodb://localhost:27017/kladovka';
const coll = 'items';
let db ;
[mongo].forEach(function (database, index) {

    describe('Тест БД ' + index, function () {

        before(async function(){
            db = await database.connect(url);
        });

        beforeEach(async function () {
            return database.clearCollection(coll, db);
        });

        it('добавляет объект в БД', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj, coll, db);
            assert(id !== undefined && id !== null && id !== '');
        });

        it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', async function () {
            let obj1 = { qwer: 123 };
            let obj2 = { qwer: 123 };
            let oneId = await database.add(obj1, coll, db);
            let towId = await database.add(obj2, coll, db);
            assert(oneId !== towId);
        });

        it('добавляет переменную в БД несколько раз, только если её значение будет переприсвоено', async function () {
            let obj = { qwer: 123 };
            let oneId = await database.add(obj, coll, db);
            obj = { qwer: 123 };
            let towId = await database.add(obj, coll, db);
            assert(oneId !== towId);
        });

        it('записывает объект в базу, и считывает его по полученному id', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj, coll, db);
            let get = await database.getById(id, coll, db);
            assert(get.qwer === 123);
        });

        it('получает все объекты из БД ', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(obj1, coll, db);
            await database.add(obj2, coll, db);
            let res = await database.getAll(coll, db);
            assert(res.length === 2);
        });

        it('сохраняет данные в БД, и они остаются неизменны, если изменяется состояние исходного объекта', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj, coll, db);
            obj.qwer = 'stroka';
            let get = await database.getById(id, coll, db);
            assert(get.qwer === 123);
        });

        it('удаляет объект из БД', async function () {
            let obj = { qwer: 11 };
            let id = await database.add(obj, coll, db);
            await database.deleteById(id, coll, db);
            let getObj = await database.getById(id, coll, db);
            assert(getObj === null);
        });

        it('удаляет все объекты из БД', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(obj1, coll, db);
            await database.add(obj2, coll, db);
            let count = await database.deleteAll(coll, db);
            assert(count === 2);
            let res = await database.getAll(coll, db);
            assert(res.length === 0);
        });

        it('получает объекты конкретного типа', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            let obj2 = { qwer: 2, type: 'sword' };
            let obj3 = { qwer: 33, type: 'axe' };
            await database.add(obj1, coll, db);
            await database.add(obj2, coll, db);
            await database.add(obj3, coll, db);
            let res = await database.getByType('axe', coll, db);
            assert(res.length === 2);
        });

        it('получает записанный объект через getAll', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(obj1, coll, db);
            let all = await database.getAll(coll, db);
            assert(all[0] !== undefined);
            assert(all[0].qwer === obj1.qwer);
        });

        it('получает все объекты, меняет один из них, получает их заново и проверяет что они не изменились', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(obj1, coll, db);
            let returned = await database.getAll(coll, db);
            returned[0].type = 'sword';
            assert(obj1.type === 'axe');
            let returned2 = await database.getAll(coll, db);
            assert(returned2[0].type === 'axe');
        });
    });
});
