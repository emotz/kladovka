const klad = require('./main.js');
const assert = require('assert');
var kladovka = klad.kladovka;

//Тестируем что предмет сохраняется в кладовке под нужным id
it('unitTest1', function () {
    var item = { id: 33, dps: 100 };
    var newid = klad.placeInKladovka(item.id, item);
    assert(item.id == newid);
});

//Тестируем изъятие предмета из кладовки
it('unitTest2', function () {
    var item = { id: 33, dps: 100 };
    klad.placeInKladovka(item.id, item);
    var newItem = klad.getFromKladovka(item.id);
    assert(item.id === newItem.id);
    assert(item.dps === newItem.dps);
});

//Тест на удаление предмета из кладовки
it('unitTest3', function () {
    var item = { id: 33, dps: 100 };
    klad.placeInKladovka(item.id, item);
    klad.deleteFromKladovka(item.id);
    assert(klad.getFromKladovka(item.id) === undefined);
});

//Тест на сравнение предметов
it('unitTest4', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 400 };
    var bestItem = klad.compareItems(item1, item2);
    assert(bestItem === item2);
});

//Тест на сравнение равных предметов
it('unitTest5', function () {
    var item1 = { id: 2, dps: 100, score: 300 };
    var item2 = { id: 1, dps: 100, score: 300 };
    var bestItem = klad.compareItems(item1, item2);
    assert(bestItem === undefined);
});