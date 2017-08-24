const assert = require('assert');
const CONFIG = require('../../config/config.json');
const mongoDB = require('../src/mongo');
const memoryDB = require('../src/memory');
const coll = 'tests';

[mongoDB, memoryDB].forEach(function (database, index) {

    describe('Тест БД ' + index, function () {

        let db;
        before(async function () {
            db = await database.connect(CONFIG.DB_URL);
        });

        beforeEach(async function () {
            return database.clearCollection(db, coll);
        });

        it('отклоняет обещание, при попытке достать объект из несуществующей базе данных', async function () {
            let rejected = false;
            try {
                await database.getById(undefined, undefined, 123);
            } catch (err) {
                assert(err.message === "нет базы данных");
                rejected = true;
            }
            assert(rejected);
        });

        it('получает null, при попытке достать элемент из несуществующей коллекции', async function () {
            let newCollection = 'new';
            let res = await database.getById(db, newCollection, 123);
            assert(res === null);
        });

        it('добавляет объект в БД', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(db, coll, obj);
            assert(id !== undefined && id !== null && id !== '');
        });

        it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', async function () {
            let obj1 = { qwer: 123 };
            let obj2 = { qwer: 123 };
            let oneId = await database.add(db, coll, obj1);
            let towId = await database.add(db, coll, obj2);
            assert(oneId !== towId);
        });

        it('добавляет переменную в БД несколько раз, только если её значение будет переприсвоено', async function () {
            let obj = { qwer: 123 };
            let oneId = await database.add(db, coll, obj);
            obj = { qwer: 123 };
            let towId = await database.add(db, coll, obj);
            assert(oneId !== towId);
        });

        it('записывает объект в базу, и считывает его по полученному id', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(db, coll, obj);
            let get = await database.getById(db, coll, id);
            assert(get.qwer === 123);
        });

        it('получает все объекты из БД ', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(db, coll, obj1);
            await database.add(db, coll, obj2);
            let res = await database.getAll(db, coll);
            assert(res.length === 2);
        });

        it('сохраняет данные в БД, и они остаются неизменны, если изменяется состояние исходного объекта', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(db, coll, obj);
            obj.qwer = 'stroka';
            let get = await database.getById(db, coll, id);
            assert(get.qwer === 123);
        });

        it('удаляет объект из БД', async function () {
            let obj = { qwer: 11 };
            let id = await database.add(db, coll, obj);
            await database.deleteById(db, coll, id);
            let getObj = await database.getById(db, coll, id);
            assert(getObj === null);
        });

        it('удаляет все объекты из БД', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(db, coll, obj1);
            await database.add(db, coll, obj2);
            let count = await database.deleteAll(db, coll);
            assert(count === 2);
            let res = await database.getAll(db, coll);
            assert(res.length === 0);
        });

        it('получает объекты конкретного типа', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            let obj2 = { qwer: 2, type: 'sword' };
            let obj3 = { qwer: 33, type: 'axe' };
            await database.add(db, coll, obj1);
            await database.add(db, coll, obj2);
            await database.add(db, coll, obj3);
            let res = await database.getByType(db, coll, 'axe');
            assert(res.length === 2);
        });

        it('получает записанный объект через getAll', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(db, coll, obj1);
            let all = await database.getAll(db, coll);
            assert(all[0] !== undefined);
            assert(all[0].qwer === obj1.qwer);
        });

        it('получает все объекты, меняет один из них, получает их заново и проверяет что они не изменились', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(db, coll, obj1);
            let returned = await database.getAll(db, coll);
            returned[0].type = 'sword';
            assert(obj1.type === 'axe');
            let returned2 = await database.getAll(db, coll);
            assert(returned2[0].type === 'axe');
        });

        it('should replace item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = await database.add(db, coll, item);
            item.dps = 300;
            item.type = 'mace';
            let repRes = await database.replaceById(db, coll, id, item);
            assert(repRes === true);
            let res = await database.getById(db, coll, id);
            assert(res.dps === 300);
            assert(res.type === 'mace');
        });

        it('should not replace non-existing item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = '123asdasdsad';
            let repRes = await database.replaceById(db, coll, id, item);
            assert(repRes === false);
            let res = await database.getById(db, coll, id);
            assert(res === null);
        });

        it('should reset item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = await database.add(db, coll, item);
            item.type = '';
            item.dps = 0;
            let repRes = await database.replaceById(db, coll, id, item);
            assert(repRes === true);
            let res = await database.getById(db, coll, id);
            assert(res.dps === 0);
            assert(res.type === '');
        });

        after(function () {
            database.disconnect(db);
        });
    });
});
