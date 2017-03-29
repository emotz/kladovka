const klad = require("./main.js");
var kladovka = klad.kladovka;
function assert(bool){
    if(bool===true) console.log("Passed");
    else console.log("Failed");
}
function unitTest1(){
    //Тестируем что предмет сохраняется в кладовке под нужным id
    var item={id:33, dps:100};
    var newid=klad.placeInKladovka(item.id, item);
    assert(item.id==newid);
}
function unitTest2(){
    //Тестируем изъятие предмета из кладовки
    var item={id:33, dps:100};
    klad.placeInKladovka(item.id, item);
    var newItem = klad.getFromKladovka(item.id);
    assert(item.id===newItem.id);
    assert(item.dps===newItem.dps);
}
function unitTest3(){
    //Тест на удаление предмета из кладовки
    var item={id:33, dps:100};
    klad.placeInKladovka(item.id, item);
    klad.deleteFromKladovka(item.id);
    assert(klad.getFromKladovka(item.id)===undefined);
}
function unitTest4(){
    //Тест на сравнение предметов
    var item1={id:2, dps:100, score:300};
    var item2={id:1, dps:100, score:400};
    var bestItem=klad.compareItems(item1, item2);
    assert(bestItem===item2);
}
function unitTest5(){
    //Тест на сравнение равных предметов
    var item1={id:2, dps:100, score:300};
    var item2={id:1, dps:100, score:300};
    var bestItem=klad.compareItems(item1, item2);
    assert(bestItem===undefined);
}

//unitTest1();
//unitTest2();
//unitTest3();
//unitTest4();
//unitTest5();