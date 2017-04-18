const assert = require('assert');
const weapon = require('../src/weapon_factory');
const klad = require('../src/main');

describe('Тест для кладовки', function () {
    beforeEach(function () {
        klad.reset();
    });

    it('сохраняет предмет в кладовке', function () {
        let item = { id: 33, dps: 100 };
        let new_id = klad.placeInKladovka(item);
        assert(new_id !== undefined && new_id !== null);
        assert(new_id !== '');
    });

    it('получает предмет из кладовки', function () {
        let item = { id: 33, dps: 100 };
        let new_id = klad.placeInKladovka(item);
        let new_item = klad.getFromKladovka(new_id);
        assert(item.id === new_item.id);
        assert(item.dps === new_item.dps);
    });

    it('удаляет предмет из кладовки', function () {
        let item = { id: 33, dps: 100 };
        let new_id = klad.placeInKladovka(item);
        klad.deleteFromKladovka(new_id);
        assert(klad.getFromKladovka(new_id) === undefined);
    });

    it('сравнивает 2 различный предмета', function () {
        let item1 = { type: 'sword', dps: 20 };
        let item2 = { type: 'axe', dps: 10 };
        let res = klad.compareItems(item1, item2);
        assert(res === -1);
    });

    it('сравнивает 2 одинаковых предмета', function () {
        let item1 = { id: 2, dps: 100};
        let item2 = { id: 1, dps: 100};
        let res = klad.compareItems(item1, item2);
        assert(res === 0);
    });

    it('утверждает что предмет не нужен', function () {
        let item1 = { type: 'sword', dps: 20 };
        let item2 = { type: 'axe', dps: 10 };
        let item3 = { type: 'sword', dps: 15 };
        klad.placeInKladovka(item1);
        klad.placeInKladovka(item2);
        assert(klad.isNeeded(item3) === false);
    });

    it('получает худший предмет из кладовки', function () {
        let item1 = { type: 'sword', dps: 20 };
        let item2 = { type: 'axe', dps: 10 };
        let item3 = { type: 'sword', dps: 15 };
        klad.placeInKladovka(item1);
        klad.placeInKladovka(item2);
        klad.placeInKladovka(item3);
        let worst = klad.findWorstInKladovka();
        assert(worst.type === 'axe');
        assert(worst.dps === 10);
    });

    it('получает худший предмет, предхудший, предпредхудший', function () {
        let item1 = { type: 'sword', dps: 20 };
        let item2 = { type: 'axe', dps: 10 };
        let item3 = { type: 'sword', dps: 15 };
        klad.placeInKladovka(item1);
        klad.placeInKladovka(item2);
        klad.placeInKladovka(item3);
        let iter = klad.sortedByScore();
        let worst1 = iter.next().value;
        let worst2 = iter.next().value;
        let worst3 = iter.next().value;
        assert(worst1.dps === item2.dps);
        assert(worst2.dps === item3.dps);
        assert(worst3.dps === item1.dps);
    });

    it('получает undefined если кладовка была пустая перед поиском плохого предмета', function () {
        let worst = klad.findWorstInKladovka();
        assert(worst === undefined);
    });

    it('получает undefined если кладовка стала пустая между вызовами итератора', function () {
        let item1 = { type: 'sword', dps: 20 };
        let item2 = { type: 'axe', dps: 10 };
        let id1 = klad.placeInKladovka(item1);
        let id2 = klad.placeInKladovka(item2);
        let iter = klad.sortedByScore();
        let worst1 = iter.next().value;
        assert(worst1.dps === 10);
        klad.deleteFromKladovka(id1);
        klad.deleteFromKladovka(id2);
        let worst2 = iter.next().value;
        assert(worst2 === undefined);
    });

    it('утверждает что все хорошо если удалили предмет, находящийся в массиве ids', function () {
        let item1 = { type: 'sword', dps: 10 };
        let item2 = { type: 'axe', dps: 10 };
        let item3 = { type: 'sword', dps: 15 };
        let id1 = klad.placeInKladovka(item1);
        let id2 = klad.placeInKladovka(item2);
        let id3 = klad.placeInKladovka(item3);
        let iter = klad.sortedByScore();
        let worst1 = iter.next().value;
        assert(worst1.dps === 10 && worst1.type === 'sword');
        klad.deleteFromKladovka(id2);
        let worst2 = iter.next().value;
        assert(worst2.dps === 15);
    });
});