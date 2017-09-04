const assert = require('assert');
const CONFIG = require('../../config/config.json');
const coll = 'tests';

const testsDb = CONFIG.TESTS_DB.map(function(database) {
    return require('../src/' + database);
}, this);

testsDb.forEach(function (database, index) {

    describe('Тест БД ' + index, function () {


        before(async function () {
            return database.connect(CONFIG.DB_URL);
        });

        beforeEach(async function () {
            return database.clearCollection(coll);
        });

        it('получает null, при попытке достать элемент из несуществующей коллекции', async function () {
            let newCollection = 'new';
            let res = await database.getById(newCollection, 123);
            assert(res === null);
        });

        it('добавляет объект в БД', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(coll, obj);
            assert(id !== undefined && id !== null && id !== '');
        });

        it('записывает 2 одинаковых объекта в базу, и полученные id будут различны', async function () {
            let obj1 = { qwer: 123 };
            let obj2 = { qwer: 123 };
            let oneId = await database.add(coll, obj1);
            let towId = await database.add(coll, obj2);
            assert(oneId !== towId);
        });

        it('добавляет переменную в БД несколько раз, только если её значение будет переприсвоено', async function () {
            let obj = { qwer: 123 };
            let oneId = await database.add(coll, obj);
            obj = { qwer: 123 };
            let towId = await database.add(coll, obj);
            assert(oneId !== towId);
        });

        it('записывает объект в базу, и считывает его по полученному id', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(coll, obj);
            let get = await database.getById(coll, id);
            assert(get.qwer === 123);
        });

        it('добавляет массив объект в БД', async function () {
            let arr = [
                { qwer: 123 },
                { qwer: 666 }
            ];
            let count = await database.addItemsArray(coll, arr);
            assert(count === 2);
        });

        it('получает все объекты из БД ', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(coll, obj1);
            await database.add(coll, obj2);
            let res = await database.getAll(coll);
            assert(res.length === 2);
        });

        it('сохраняет данные в БД, и они остаются неизменны, если изменяется состояние исходного объекта', async function () {
            let obj = { qwer: 123 };
            let id = await database.add(coll, obj);
            obj.qwer = 'stroka';
            let get = await database.getById(coll, id);
            assert(get.qwer === 123);
        });

        it('удаляет объект из БД', async function () {
            let obj = { qwer: 11 };
            let id = await database.add(coll, obj);
            await database.deleteById(coll, id);
            let getObj = await database.getById(coll, id);
            assert(getObj === null);
        });

        it('удаляет все объекты из БД', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(coll, obj1);
            await database.add(coll, obj2);
            let count = await database.deleteAll(coll);
            assert(count === 2);
            let res = await database.getAll(coll);
            assert(res.length === 0);
        });

        it('удаляет все объекты по заданному свойству из БД', async function () {
            let obj1 = { qwer: 11 };
            let obj2 = { qwer: 22 };
            await database.add(coll, obj1);
            await database.add(coll, obj2);
            let count = await database.deleteAllByProp(coll);
            assert(count === 2);
            let res = await database.getAll(coll);
            assert(res.length === 0);
        });

        it('получает объекты по заданному свойству, например type', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            let obj2 = { qwer: 2, type: 'sword' };
            let obj3 = { qwer: 33, type: 'axe' };
            await database.add(coll, obj1);
            await database.add(coll, obj2);
            await database.add(coll, obj3);
            let res = await database.getAllByProp(coll, 'type', 'axe');
            assert(res.length === 2);
        });

        it('получает один объект по заданному свойству, например type', async function () {
            let item = { qwer: 11, type: 'axe' };
            await database.add(coll, item);
            let res = await database.getByProp(coll, 'type', item.type);
            assert(res.name === item.name);
        });

        it('получает null, если поиск идет по не существующему значению свойсва', async function () {
            let item = { qwer: 11, type: 'axe' };
            let res = await database.getByProp(coll, 'type', item.type);
            assert(res === null);
        });

        it('получает записанный объект через getAll', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(coll, obj1);
            let all = await database.getAll(coll);
            assert(all[0] !== undefined);
            assert(all[0].qwer === obj1.qwer);
        });

        it('получает все объекты, меняет один из них, получает их заново и проверяет что они не изменились', async function () {
            let obj1 = { qwer: 11, type: 'axe' };
            await database.add(coll, obj1);
            let returned = await database.getAll(coll);
            returned[0].type = 'sword';
            assert(obj1.type === 'axe');
            let returned2 = await database.getAll(coll);
            assert(returned2[0].type === 'axe');
        });

        it('should replace item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = await database.add(coll, item);
            item.dps = 300;
            item.type = 'mace';
            let repRes = await database.replaceById(coll, id, item);
            assert(repRes === true);
            let res = await database.getById(coll, id);
            assert(res.dps === 300);
            assert(res.type === 'mace');
        });

        it('should not replace non-existing item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = '123asdasdsad';
            let repRes = await database.replaceById(coll, id, item);
            assert(repRes === false);
            let res = await database.getById(coll, id);
            assert(res === null);
        });

        it('should reset item', async function () {
            let item = { dps: 100, type: 'axe' };
            let id = await database.add(coll, item);
            item.type = '';
            item.dps = 0;
            let repRes = await database.replaceById(coll, id, item);
            assert(repRes === true);
            let res = await database.getById(coll, id);
            assert(res.dps === 0);
            assert(res.type === '');
        });

        after(function () {
            database.disconnect();
        });
    });
});
