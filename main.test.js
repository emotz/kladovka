const assert = require('assert');
const klad = require('./main');
const weapon = require('./weapon_factory');
let kladovka = klad.kladovka;

it('сохраняет предмет в кладовке', function () {
    let item = { id: 33, dps: 100 };
    let new_id = klad.placeInKladovka(item);
    assert(new_id !== undefined && new_id !==null);
    assert(new_id !=='');
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
    let item1 = { id: 2, dps: 100, score: 300 };
    let item2 = { id: 1, dps: 100, score: 400 };
    let res = klad.compareItems(item1, item2);
    assert(res === 1);
});

it('сравнивает 2 одинаковых предмета', function () {
    let item1 = { id: 2, dps: 100, score: 300 };
    let item2 = { id: 1, dps: 100, score: 300 };
    let res = klad.compareItems(item1, item2);
    assert(res === 0);
});