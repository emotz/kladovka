const assert = require('assert');
const mongo = require('../src/mongo');
const db = require('../src/db.async.proxy');
[mongo, db].forEach(function (database, index) {

    describe('Тест БД ' + index, function () {
        beforeEach(async function () {
            return database.clearCollection();
        });

        it('добавляет объект в БД', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj);
            assert(id !== undefined && id !== null && id !== '');
        });

        it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', async function () {
            let obj1 = { qwer: 123 };
            let obj2 = { qwer: 123 };
            let oneId = await database.add(obj1);
            let towId = await database.add(obj2);
            assert(oneId !== towId);
        });

        it('добавляет переменную в БД несколько раз, только если её значение будет переприсвоено', async function () {
            let obj = { qwer: 123 };
            let oneId = await database.add(obj);
            obj = { qwer: 123 };
            let towId = await database.add(obj);
            assert(oneId !== towId);
        });

        it('записывает объект в базу, и считывает его по полученному id', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj);
            let get = await database.getById(id);
            assert(get.qwer === 123);
        });

        it('получает все объекты из БД ', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(obj1);
            await database.add(obj2);
            let res = await database.getAll();
            assert(res.length === 2);
        });

        it('сохраняет данные в БД, и они остаются не изменны, если изменяется состояние исходного объекта', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(obj);
            obj.qwer = 'stroka';
            let get = await database.getById(id);
            assert(get.qwer === 123);
        });

        it('удаляет объект из БД', async function () {
            let obj = { qwer: 11 };
            let id = await database.add(obj);
            await database.deleteById(id);
            let getObj = await database.getById(id);
            assert(getObj === null);
        });

        it('удаляет все объекты из БД', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(obj1);
            await database.add(obj2);
            let count = await database.deleteAll();
            assert(count === 2);
            let res = await database.getAll();
            assert(res.length === 0);
        });

        it('получает объекты конкретного типа', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            let obj2 = { qwer: 2, type: 'sword' };
            let obj3 = { qwer: 33, type: 'axe' };
            await database.add(obj1);
            await database.add(obj2);
            await database.add(obj3);
            let res = await database.getByType('axe');
            assert(res.length === 2);
        });
    });
});