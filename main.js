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

function getArmor() {
    return 'тряпка';
}
function getWeapon(idxType, id) {
    var item = {};
    item.id = id;
    item.type = type[idxType];
    item.dps = myRandom(50, 1e3);
    if (item.dps > 100 && item.dps <= 300) item.quality = 1;
    else if (item.dps > 300 && item.dps <= 600) item.quality = 2;
    else if (item.dps > 600 && item.dps <= 800) item.quality = 3;
    else if (item.dps > 800 && item.dps <= 950) item.quality = 4;
    else if (item.dps>950 && item.dps <= 1000) item.quality = 5;
    else item.quality = 0;

    return item;
}

function getLoot() {
    var loot = [];
    for (var i = 0; i < 100; i++) {
        ixType = myRandom(0, 5);
        if (ixType < 3)
            loot.push(getWeapon(ixType, i));
        else
            loot.push(getArmor());
    }
    return loot;
}
//var loot = getLoot();
//console.log(loot);

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

///////////////////////////////////////////TESTs////////////////////////////////////////////////////////
function assert(bool){
    if(bool===true) console.log("Passed");
    else console.log("Failed");
}
function unitTest1(){
    var item={id:33, dps:100};
    var newid=placeInKladovka(item.id, item);
    assert(item.id==newid);
}
function unitTest2(){
    var item={id:33, dps:100};
    placeInKladovka(item.id, item);
    var newItem = getFromKladovka(item.id);
    assert(item.id===newItem.id);
    assert(item.dps===newItem.dps);
}
function unitTest3(){
    var item={id:33, dps:100};
    placeInKladovka(item.id, item);
    assert(getFromKladovka(item.id)===undefined);
}
//unitTest1();
//unitTest2();
unitTest3();

