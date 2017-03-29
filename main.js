// Генератор рандомных ID
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//////////////////////////////////////////////////

/**
 * Создает новую базу данных. 
 * При считывании и записи объектов в базу происходит их копирование JSON'ификацией.
 * См. секцию Unit Tests для примера использования.
 * @returns {DB} Пустая, только что созданная, база данных
 */
function db_initialize() {
    let db = {};
    return db;
}

/**
 * Сохраняет копию объекта в базе данных под случайно сгенерированным 
 * идентификатором и возвращает этот идентификатор. См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, в которую будет добавлен объект
 * @param {Object} entity - Этот объект будет сохранен в базу
 * @returns {String} Идентификатор только что добавленного объекта
 */
function db_add_entity(db, entity) {
    let id = guid();
    db[id] = clone(entity);
    return id;
}

/**
 * Сохраняет копию объекта в базе данных под указанным идентификатором.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, в которую будет добавлен объект
 * @param {String} id - Идентификатор, под которым объект будет добавлен
 * @param {Object} entity - Этот объект будет сохранен в базу
 */
function db_add_entity_by_id(db, id, entity) {
    db[id] = clone(entity);
    return id;
}

/**
 * Считывает объект из базы данных под указанным идентификатором. 
 * Полученный объект является копией объекта из базы.
 * См. секцию Unit Tests для примера использования.
 * @param {DB} db - База данных, из которой будет считан объект
 * @param {String} id - Идентификатор объекта для считывания
 * @returns {Object|undefined} Запрашиваемый объект. Равен `undefined` если указанный идентификатор отсутствует.
 */
function db_get_entity_by_id(db, id) {
    let res;
    res = db[id];
    return clone(res);
}


/**
 * Создает случайное число в указанном диапазоне
 * @param {Number} min - Минимальное значение
 * @param {Number} max - Максимальное значение
 * @returns {Number} Случайное число
 */
function myRandom(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
}

var kladovka = db_initialize();

var type = ['меч', 'топор', 'булава', 'нагрудник', 'штаны', 'обувь'];
var itemQuality = ['Плохое', 'Обычное', 'Необычное', 'Редкое', 'Эпическое', 'Легендарное'];


function getWeapon(id) {
    var item = {};
    item.id = id;
    item.type = type[myRandom(0,2)];
    item.dps = myRandom(50, 1e3);
    if(item.dps<500)
        item.quality = myRandom(0, 2);
    else
        item.quality = myRandom(3, 5);
    item.score= item.dps+(item.quality*1e3);
    item.quality=itemQuality[item.quality];
    return item;
}

function getLoot() {
    var loot = [];
    for (var i = 0; i < 100; i++) {
       loot.push(getWeapon(i));
    }
    return loot;
}
var loot = getLoot();
console.log(loot);

/**
 * Укладывает предмет в кладовку под указанным идентификатором.
 * @param {String} id - Идентификатор предмета
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {String|false} Возвращает идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(id, item) {
    return db_add_entity_by_id(kladovka, id, item);
}


/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Item|undefined} Возвращает предмет или 'undefined' если такого предмета нет в кладовке
 */
function getFromKladovka(id) {
    var item = db_get_entity_by_id(kladovka, id);
    if(item.delete)
        return undefined;
    else 
        return item;
}


/**
 * Удаляет предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор предмета для удаления
 * @returns {String} Возвращает идентификатор удаленного предмета 
 */
function deleteFromKladovka(id){
    var item=db_get_entity_by_id(kladovka, id);
    item.delete=true;
    return db_add_entity_by_id(kladovka, id, item);
}

/**
 * Сравнивает 2 предмета
 * @param {Item} item1 - Перваый прудмет
 * @param {Item} item2 - Второй предмет
 * @returns {Item|undefined} Возвращает лучший предмет или 'undefined' если они равны
 */
function compareItems(item1, item2){
    if(item1.score>item2.score)
        return item1;
    else if(item1.score<item2.score)
        return item2;
    else
        return undefined;
}

///////////////////////////////////////////TESTs////////////////////////////////////////////////////////
function assert(bool){
    if(bool===true) console.log("Passed");
    else console.log("Failed");
}
function unitTest1(){
    //Тестируем что предмет сохраняется в кладовке под нужным id
    var item={id:33, dps:100};
    var newid=placeInKladovka(item.id, item);
    assert(item.id==newid);
}
function unitTest2(){
    //Тестируем изъятие предмета из кладовки
    var item={id:33, dps:100};
    placeInKladovka(item.id, item);
    var newItem = getFromKladovka(item.id);
    assert(item.id===newItem.id);
    assert(item.dps===newItem.dps);
}
function unitTest3(){
    //Тест на удаление предмета из кладовки
    var item={id:33, dps:100};
    placeInKladovka(item.id, item);
    deleteFromKladovka(item.id);
    assert(getFromKladovka(item.id)===undefined);
}
function unitTest4(){
    //Тест на сравнение предметов
    var item1={id:2, dps:100, score:300};
    var item2={id:1, dps:100, score:400};
    var bestItem=compareItems(item1, item2);
    assert(bestItem===item2);
}
function unitTest5(){
    //Тест на сравнение равных предметов
    var item1={id:2, dps:100, score:300};
    var item2={id:1, dps:100, score:300};
    var bestItem=compareItems(item1, item2);
    assert(bestItem===undefined);
}

//unitTest1();
//unitTest2();
//unitTest3();
//unitTest4();
//unitTest5();

