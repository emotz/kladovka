const assert = require('assert');
const klad = require('../src/main');
const url = 'mongodb://localhost:27017/kladovka';
const coll = 'items';
let db;

describe('Тест для кладовки', function () {
    before(async function(){
        db = await klad.connect(url);
    });
    beforeEach(async function () {
        return klad.clearCollection(coll, db);
    });

    it('сохраняет предмет в кладовке', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item, coll, db);
        assert(id !== undefined && id !== null);
        assert(id !== '');
    });

    it('получает предмет из кладовки', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item, coll, db);
        let getItem = await klad.getFromKladovka(id, coll, db);
        assert(getItem.type == item.type);
        assert(getItem.dps == item.dps);
    });

    it('получает все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(item1, coll, db);
        await klad.placeInKladovka(item2, coll, db);
        await klad.placeInKladovka(item3, coll, db);
        await klad.placeInKladovka(item4, coll, db);
        let all = await klad.getAllFromKladovka(coll, db);
        assert(all.length == 4);
    });

    it('удаляет конкретный предмет', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item, coll, db);
        await klad.deleteFromKladovka(id, coll, db);
        let getItem = await klad.getFromKladovka(id, coll, db);
        assert(getItem === null);
    });

    it('удаляет все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(item1, coll, db);
        await klad.placeInKladovka(item2, coll, db);
        await klad.placeInKladovka(item3, coll, db);
        await klad.placeInKladovka(item4, coll, db);
        await klad.deleteAllFromKladovka(coll, db);
        let all = await klad.getAllFromKladovka(coll, db);
        assert(all.length == 0);
    });

    it('возвращает худший предмет из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 300 };
        let item4 = { type: 'sword', dps: 50 };
        await klad.placeInKladovka(item1, coll, db);
        await klad.placeInKladovka(item2, coll, db);
        await klad.placeInKladovka(item3, coll, db);
        await klad.placeInKladovka(item4, coll, db);
        let worst = await klad.findWorstInKladovka(coll, db);
        assert(worst.type === item4.type);
        assert(worst.dps === item4.dps);
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
            await klad.placeInKladovka(item1, coll, db);
            assert(await klad.isNeeded(item2, coll, db) === true);
        });

        it('#нет', async function () {
            let item1 = { type: 'axe', dps: 200 };
            let item2 = { type: 'axe', dps: 100 };
            await klad.placeInKladovka(item1, coll, db);
            assert(await klad.isNeeded(item2, coll, db) === false);
        });
    });
});
