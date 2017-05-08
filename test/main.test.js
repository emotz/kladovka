const assert = require('assert');
const klad = require('../src/main');

describe('Тест для кладовки', function () {
    beforeEach(function () {
        klad.clearCollection();
    });

    it('сохраняет предмет в кладовке', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item);
        assert(id !== undefined && id !== null);
        assert(id !== '');
    });

    it('получает предмет из кладовки', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item);
        let getItem = await klad.getFromKladovka(id);
        assert(getItem.type == item.type);
        assert(getItem.dps == item.dps);
    });

    it('получает все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(item1);
        await klad.placeInKladovka(item2);
        await klad.placeInKladovka(item3);
        await klad.placeInKladovka(item4);
        let all = await klad.getAllFromKladovka();
        assert(all.length == 4);
    });

    it('удаляет конкретный предмет', async function () {
        let item = { type: 'axe', dps: 100 };
        let id = await klad.placeInKladovka(item);
        await klad.deleteFromKladovka(id);
        let getItem = await klad.getFromKladovka(id);
        assert(getItem === null);
    });

    it('удаляет все предметы из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 100 };
        let item4 = { type: 'sword', dps: 300 };
        await klad.placeInKladovka(item1);
        await klad.placeInKladovka(item2);
        await klad.placeInKladovka(item3);
        await klad.placeInKladovka(item4);
        await klad.deleteAllFromKladovka();
        let all = await klad.getAllFromKladovka();
        assert(all.length == 0);
    });

    it('возвращает худший предмет из кладовки', async function () {
        let item1 = { type: 'axe', dps: 100 };
        let item2 = { type: 'axe', dps: 200 };
        let item3 = { type: 'mace', dps: 300 };
        let item4 = { type: 'sword', dps: 50 };
        await klad.placeInKladovka(item1);
        await klad.placeInKladovka(item2);
        await klad.placeInKladovka(item3);
        await klad.placeInKladovka(item4);
        let worst = await klad.findWorstInKladovka();
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
            await klad.placeInKladovka(item1);
            assert(await klad.isNeeded(item2) === true);
        });

        it('#нет', async function () {
            let item1 = { type: 'axe', dps: 200 };
            let item2 = { type: 'axe', dps: 100 };
            await klad.placeInKladovka(item1);
            assert(await klad.isNeeded(item2) === false);
        });
    });

});