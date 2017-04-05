const db=require('./db.js');
var kladovka = db.initialize();

/**
 * Укладывает предмет в кладовку под указанным идентификатором.
 * @param {String} id - Идентификатор предмета
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {String|false} Возвращает идентификатор предмета уложенного в кладовку
 */
function placeInKladovka(item) {
    return db.add(kladovka, item);
}


/**
 * Получает предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор получаемого предмета
 * @returns {Item|undefined} Возвращает предмет или 'undefined' если такого предмета нет в кладовке
 */
function getFromKladovka(id) {
    var item = db.get_by_id(kladovka, id);
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
    var item=db.get_by_id(kladovka, id);
    item.delete=true;
    return db.add_by_id(kladovka, id, item);
}

/**
 * Сравнивает 2 предмета
 * @param {Item} item1 - Перваый прудмет
 * @param {Item} item2 - Второй предмет
 * @returns {Number} Возвращает -1 если первый предмет лучше, 1 если второй. 0 если равны
 */
function compareItems(item1, item2){
    if(item1.score>item2.score)
        return -1;
    else if(item1.score<item2.score)
        return 1;
    else
        return 0;
}

module.exports={
    kladovka,
    getFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    compareItems,
};