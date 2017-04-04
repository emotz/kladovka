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

var type = ['меч', 'топор', 'булава', 'нагрудник', 'штаны', 'обувь'];
var item_quality = ['Плохое', 'Обычное', 'Необычное', 'Редкое', 'Эпическое', 'Легендарное'];


function pickUpWeapon() {
    var item = {};
    item.type = type[myRandom(0,2)];
    item.attack_speed=1.8;
    item.dmg = myRandom(50, 1e3);
    if(item.dmg<500)
        item.quality = myRandom(0, 2);
    else
        item.quality = myRandom(3, 5);
    item.quality=item_quality[item.quality];
    return item;
}