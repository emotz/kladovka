const db = require('./db.js');
const calc = require('./calculation');
let kladovka = db.initialize();

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
    let item = db.get_by_id(kladovka, id);
    if (item.deleted)
        return undefined;
    else
        return item;
}


/**
 * Удаляет предмет из кладовки под указанным идентификатором.
 * @param {String} id - Идентификатор предмета для удаления
 * @returns {String} Возвращает идентификатор удаленного предмета 
 */
function deleteFromKladovka(id) {
    let item = db.get_by_id(kladovka, id);
    item.deleted = true;
    return db.add_by_id(kladovka, id, item);
}

/**
 * Сравнивает 2 предмета
 * @param {Item} item1 - Перваый прудмет
 * @param {Item} item2 - Второй предмет
 * @returns {Number} Возвращает -1 если первый предмет лучше, 1 если второй. 0 если равны
 */
function compareItems(item1, item2) {
    if (item1.score > item2.score)
        return -1;
    else if (item1.score < item2.score)
        return 1;
    else
        return 0;
}

/**
 * Проверяет нужен ли предмет
 * @param {Item} item - Проверяемый предмет
 * @returns {Boolean} Возвращает true, если предмет нужен. False, если нет
 */
function isNeeded(item) {
    let res = db.get_by_type(kladovka, item.type);
    let score = calc.score(item);
    for (let id in res) {
        if (calc.score(res[id]) < score)
            return true;
    }
    if (Object.keys(res).length === 0) return true;
    return false;
}

//let iterator;
let iterator = sortedByScore();

function reset(){
    kladovka={};
    iterator = sortedByScore();
}

function findWorstInKladovka() {
    return iterator.next().value;
}

function* notDeletedIds(){
    for(let id in kladovka){
        if(kladovka[id].deleted===true) continue;
        yield id;
    }
}

function* sortedByScore(){
    function findMins(threshold){
        let ids=[],
            min_score=Number.POSITIVE_INFINITY;
        for(let id of notDeletedIds()){
            let score=calc.score(kladovka[id]);
            if(score <= threshold) continue;
            if(score===min_score){
                ids.push(id);
            }else if(score < min_score){
                ids = [id];
                min_score=score;
            }
        }
        return {ids, threshold: min_score};
    }

    let ids=[],
        threshold = Number.NEGATIVE_INFINITY;
    while( ({ids, threshold}=findMins(threshold)).ids.length ){
        for(let id of ids){
            if(kladovka[id].deleted===true) continue;
            yield kladovka[id];
        }
    }
}

module.exports = {
    kladovka,
    getFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka,
    reset
};