const db=require('./db.js');
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

var kladovka = db.initialize();

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
//console.log(loot);

/**
 * Укладывает предмет в кладовку под указанным идентификатором.
 * @param {String} id - Идентификатор предмета
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {String|false} Возвращает идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(id, item) {
    return db.add_entity_by_id(kladovka, id, item);
}


/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Item|undefined} Возвращает предмет или 'undefined' если такого предмета нет в кладовке
 */
function getFromKladovka(id) {
    var item = db.get_entity_by_id(kladovka, id);
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
    var item=db.get_entity_by_id(kladovka, id);
    item.delete=true;
    return db.add_entity_by_id(kladovka, id, item);
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
module.exports={
    kladovka,
    getFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    compareItems,
};