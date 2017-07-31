const assert = require('assert');
const klad = require('../src/main');
const CONFIG = require('../../config/config.json');
const coll = 'items';

describe('Тест для кладовки', function () {

    let db;
    before(async function () {
        db = await klad.connect(CONFIG.DB_URL);
    });

    beforeEach(async function () {
        return klad.clearKladovka(coll);
    });

    it('сохраняет предмет в кладовке', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(coll, item);
        assert(id !== undefined && id !== null);
        assert(id !== '');
    });

    it('получает предмет из кладовки', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(coll, item);
        let getItem = await klad.getFromKladovka(coll, id);
        assert(getItem.type == item.type);
        assert(getItem.dps == item.dps);
    });

    it('получает все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(coll, item1);
        await klad.placeInKladovka(coll, item2);
        await klad.placeInKladovka(coll, item3);
        await klad.placeInKladovka(coll, item4);
        let all = await klad.getAllFromKladovka(coll);
        assert(all.length == 4);
    });

    it('удаляет конкретный предмет', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(coll, item);
        await klad.deleteFromKladovka(coll, id);
        let getItem = await klad.getFromKladovka(coll, id);
        assert(getItem === null);
    });

    it('удаляет все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(coll, item1);
        await klad.placeInKladovka(coll, item2);
        await klad.placeInKladovka(coll, item3);
        await klad.placeInKladovka(coll, item4);
        await klad.deleteAllFromKladovka(coll);
        let all = await klad.getAllFromKladovka(coll);
        assert(all.length == 0);
    });

    it('возвращает худший предмет из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 300 };
        let item4 = { type: 'sword', dps: 50 };
        await klad.placeInKladovka(coll, item1);
        await klad.placeInKladovka(coll, item2);
        await klad.placeInKladovka(coll, item3);
        await klad.placeInKladovka(coll, item4);
        let worst = await klad.findWorstInKladovka(coll);
        assert(worst.type === item4.type);
        assert(worst.dps === item4.dps);
    });

    it('should replace item', async function () {
        let item = { dps: 100, type: 'axe' };
        let id = await klad.placeInKladovka(coll, item);
        item.dps = 300;
        item.type = 'mace';
        let repRes = await klad.replaceInKladovka(coll, id, item);
        assert(repRes === true);
        let res = await klad.getFromKladovka(coll, id);
        assert(res.dps === 300);
        assert(res.type === 'mace');
    });

    it('should not replace non-existing item', async function () {
        let item = { dps: 100, type: 'axe' };
        let id = '123asdasdsad';
        let repRes = await klad.replaceInKladovka(coll, id, item);
        assert(repRes === false);
        let res = await klad.getFromKladovka(coll, id);
        assert(res === null);
    });

    it('should reset item', async function () {
        let item = { dps: 100, type: 'axe' };
        let id = await klad.placeInKladovka(coll, item);
        item.type = '';
        item.dps = 0;
        let repRes = await klad.replaceInKladovka(coll, id, item);
        assert(repRes === true);
        let res = await klad.getFromKladovka(coll, id);
        assert(res.dps === 0);
        assert(res.type === '');
    });

    it('should get item by name', async function () {
        let item = { name: 'item' };
        await klad.placeInKladovka(coll, item);
        let res = await klad.getByNameFromKladovka(coll, item.name);
        assert(res.name === item.name);
    });

    it('should not get item with non-existing name', async function () {
        let item = { name: 'item' };
        let res = await klad.getByNameFromKladovka(coll, item.name);
        assert(res === null);
    });

    describe('Сравнение предметов', function () {

        it('#первый предмет лучше', function () {
            let item1 = { type: 'axe', dps: 200 };
            let item2 = { type: 'axe', dps: 100 };
            assert(klad.compareItems(item1, item2) === -1);
        });

        it('#второй предмет лучше', function () {
            let item1 = { type: 'axe', dps: 100 };
            let item2 = { type: 'axe', dps: 200 };
            assert(klad.compareItems(item1, item2) === 1);
        });

        it('#предметы равны', function () {
            let item1 = { type: 'axe', dps: 100 };
            let item2 = { type: 'axe', dps: 100 };
            assert(klad.compareItems(item1, item2) === 0);
        });
    });

    describe('Предмет нужен', function () {

        it('#да', async function () {
            let item1 = { type: 'axe', dps: 100 };
            let item2 = { type: 'axe', dps: 200 };
            await klad.placeInKladovka(coll, item1);
            assert(await klad.isNeeded(coll, item2) === true);
        });

        it('#нет', async function () {
            let item1 = { type: 'axe', dps: 200 };
            let item2 = { type: 'axe', dps: 100 };
            await klad.placeInKladovka(coll, item1);
            assert(await klad.isNeeded(coll, item2) === false);
        });
    });

    after(function () {
        klad.disconnect(db);
    });
});
