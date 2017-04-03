const klad = require('./main.js');
const assert = require('assert');
var kladovka = klad.kladovka;

it('сохраняет предмет в кладовке', function () {
    var item = { id: 33, dps: 100 };
    var new_id = klad.placeInKladovka(item);
    assert(new_id !== undefined && new_id !==null);
    assert(new_id !=='');
});

it('получает предмет из кладовки', function () {
    var item = { id: 33, dps: 100 };
    var new_id = klad.placeInKladovka(item);
    var new_item = klad.getFromKladovka(new_id);
    assert(item.id === new_item.id);
    assert(item.dps === new_item.dps);
});

it('удаляет предмет из кладовки', function () {
    var item = { id: 33, dps: 100 };
    var new_id = klad.placeInKladovka(item);
    klad.deleteFromKladovka(new_id);
    assert(klad.getFromKladovka(new_id) === undefined);
});

it('сравнивает 2 различный предмета', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 400 };
    var best_item = klad.compareItems(item1, item2);
    assert(best_item === 1);
});

it('сравнивает 2 одинаковых предмета', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 300 };
    var best_item = klad.compareItems(item1, item2);
    assert(best_item === 0);
});