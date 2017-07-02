const assert = require('assert');
const klad = require('../src/main');
const config = require('../../config.json');
const coll = 'items';

describe('Тест для кладовки', function () {

    let db;
    before(async function () {
        db = await klad.connect(config.db_url);
    });

    beforeEach(async function () {
        return klad.clearKladovka(db, coll);
    });

    it('сохраняет предмет в кладовке', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(db, coll, item);
        assert(id !== undefined && id !== null);
        assert(id !== '');
    });

    it('получает предмет из кладовки', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(db, coll, item);
        let getItem = await klad.getFromKladovka(db, coll, id);
        assert(getItem.type == item.type);
        assert(getItem.dps == item.dps);
    });

    it('получает все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(db, coll, item1);
        await klad.placeInKladovka(db, coll, item2);
        await klad.placeInKladovka(db, coll, item3);
        await klad.placeInKladovka(db, coll, item4);
        let all = await klad.getAllFromKladovka(db, coll);
        assert(all.length == 4);
    });

    it('удаляет конкретный предмет', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(db, coll, item);
        await klad.deleteFromKladovka(db, coll, id);
        let getItem = await klad.getFromKladovka(db, coll, id);
        assert(getItem === null);
    });

    it('удаляет все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(db, coll, item1);
        await klad.placeInKladovka(db, coll, item2);
        await klad.placeInKladovka(db, coll, item3);
        await klad.placeInKladovka(db, coll, item4);
        await klad.deleteAllFromKladovka(db, coll);
        let all = await klad.getAllFromKladovka(db, coll);
        assert(all.length == 0);
    });

    it('возвращает худший предмет из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 300 };
        let item4 = { type: 'sword', dps: 50 };
        await klad.placeInKladovka(db, coll, item1);
        await klad.placeInKladovka(db, coll, item2);
        await klad.placeInKladovka(db, coll, item3);
        await klad.placeInKladovka(db, coll, item4);
        let worst = await klad.findWorstInKladovka(db, coll);
        assert(worst.type === item4.type);
        assert(worst.dps === item4.dps);
    });

    it('should be fully to update character', async function () {
        let char = { dmg: 100, attackSpd: 10 };
        let id = await klad.placeInKladovka(db, coll, char);
        char.dmg = 200;
        char.attackSpd = 20;
        let up = await klad.updateFullyInKladovka(db, coll, id, char);
        assert(up === 1);
        let res = await klad.getFromKladovka(db, coll, id);
        assert(res.dmg === 200);
    });

    it('should be error at update character with not existsed id', async function () {
        let char = { dmg: 100, attackSpd: 10 };
        await klad.placeInKladovka(db, coll, char);
        char.dmg = 200;
        char.attackSpd = 20;
        let up = await klad.updateFullyInKladovka(db, coll, '123asdasdsad', char);
        assert(up === 0);
    });

    it('should reset char', async function () {
        let char = {
            atkSpd: 54,
            dmg: 3,
            critChance: 5,
            critDmg: 6
        };
        let id = await klad.placeInKladovka(db, coll, char);
        char.atkSpd = 0;
        char.dmg = 0;
        char.critChance = 0;
        char.critDmg = 0;
        let up = await klad.updateFullyInKladovka(db, coll, id, char);
        assert(up === 1);
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
            await klad.placeInKladovka(db, coll, item1);
            assert(await klad.isNeeded(db, coll, item2) === true);
        });

        it('#нет', async function () {
            let item1 = { type: 'axe', dps: 200 };
            let item2 = { type: 'axe', dps: 100 };
            await klad.placeInKladovka(db, coll, item1);
            assert(await klad.isNeeded(db, coll, item2) === false);
        });
    });

    after(function () {
        klad.disconnect(db);
    });
});
