const klad = require('./main.js');
const assert = require('assert');
var kladovka = klad.kladovka;

it('сохраняет предмет в кладовке под нужным id', function () {
    var item = { id: 33, dps: 100 };
    var newid = klad.placeInKladovka(item.id, item);
    assert(item.id == newid);
});

it('получает предмет из кладовки', function () {
    var item = { id: 33, dps: 100 };
    klad.placeInKladovka(item.id, item);
    var newItem = klad.getFromKladovka(item.id);
    assert(item.id === newItem.id);
    assert(item.dps === newItem.dps);
});

it('удаляет предмет из кладовки', function () {
    var item = { id: 33, dps: 100 };
    klad.placeInKladovka(item.id, item);
    klad.deleteFromKladovka(item.id);
    assert(klad.getFromKladovka(item.id) === undefined);
});

it('сравнивает 2 различный предмета', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 400 };
    var bestItem = klad.compareItems(item1, item2);
    assert(bestItem === item2);
});

it('сравнивает 2 одинаковых предмета', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 300 };
    var bestItem = klad.compareItems(item1, item2);
    assert(bestItem === undefined);
});
it('test', function(){});