const utility = require('./utility');
var random=utility.random;

var type = ['меч', 'топор', 'булава', 'нагрудник', 'штаны', 'обувь'];
var item_quality = ['Плохое', 'Обычное', 'Необычное', 'Редкое', 'Эпическое', 'Легендарное'];


function pickUpWeapon() {
    var item = {};
    item.type = type[random(0,2)];
    item.attack_speed=1.8;
    item.dmg_min = random(50, 1e3);
    item.dmg_max = item.dmg_min+150;
    if(item.dmg<500)
        item.quality = random(0, 2);
    else
        item.quality = random(3, 5);
    item.quality=item_quality[item.quality];
    return item;
}