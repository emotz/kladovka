const db = require('./db');
const calc = require('./calculation');
const utility = require('./utility');
let kladovka = db.initialize();

/**
 * Укладывает предмет в кладовку под указанным идентификатором.
 * @param {String} id - Идентификатор предмета
 * @param {Item} item - Предмет, который будет уложен в кладовку
 * @returns {String|false} Возвращает идентификатор предмета уложенного в кладовку
 */
async function placeInKladovka(item) {
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
 * Получает все предметы из кладовки
 * @returns {Item|undefined} Возвращает коллекцию предметов или 'undefined' если в кладовке нет предметов
 */
function getAllFromKladovka() {
    return utility.filterObj(kladovka, function (item) { return item.deleted === undefined; });
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
    let score1 = calc.score(item1);
    let score2 = calc.score(item2);
    if (score1 > score2)
        return -1;
    else if (score1 < score2)
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
    for (let item of notDeletedIds()) {
        if (calc.score(item) < score)
            return true;
    }
    if (Object.keys(res).length === 0) return true;
    return false;
}

function reset() {
    kladovka = {};
}

/**
 * Возвращает худший предмет из кладовки, предхудший, предпредхудший и т.д.
 * @returns {Item} Худший предмет
 */
function findWorstInKladovka() {
    return sortedByScore().next().value;
}

/**
 * Генератор возвращающий id не удаленных предметов
 * @returns {Iterable.<id>} id предмета в кладовке
 */
function* notDeletedIds() {
    for (let id in kladovka) {
        if (kladovka[id].deleted === true) continue;
        yield id;
    }
}

function* sortedByScore() {
    function findMins(threshold) {
        let ids = [],
            min_score = Number.POSITIVE_INFINITY;
        for (let id of notDeletedIds()) {
            let score = calc.score(kladovka[id]);
            if (score <= threshold) continue;
            if (score === min_score) {
                ids.push(id);
            } else if (score < min_score) {
                ids = [id];
                min_score = score;
            }
        }
        return { ids, threshold: min_score };
    }

    let ids = [],
        threshold = Number.NEGATIVE_INFINITY;
    while (({ ids, threshold } = findMins(threshold)).ids.length) {
        for (let id of ids) {
            if (kladovka[id].deleted === true) continue;
            yield kladovka[id];
        }
    }
}

module.exports = {
    kladovka,
    getFromKladovka,
    getAllFromKladovka,
    placeInKladovka,
    deleteFromKladovka,
    compareItems,
    isNeeded,
    findWorstInKladovka,
    sortedByScore,
    reset
};