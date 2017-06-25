const apsByType = {
    'mace': 1.20,
    'dagger': 1.50,
    'spear': 1.20,
    'sword': 1.40,
    'axe': 1.30,
    'fistWeapon': 1.40,
    'flail': 1.40,
    'mightyWeapon': 1.30,
    'ceremonialKnife': 1.40
};

const types = Object.keys(apsByType).sort();

function calcAps(item) {
    for (let type in apsByType) {
        if (item.type === type)
            return apsByType[type];
    }
}

function calcDps(item) {
    let res = (((item.minDmg + item.maxDmg) / 2) * item.aps);
    return (item.critChance && item.critDmg)
        ? (res + (item.critChance / 100) * (item.critDmg / 100))
        : res;
}

function calcScore(item) {
    return item.dps * 10;
}

module.exports = {
    dps: calcDps,
    score: calcScore,
    aps: calcAps,
    types
};
