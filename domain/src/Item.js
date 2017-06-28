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
    if (item.critChance && item.critDmg) {
        if (item.critChance > 100) item.critChance = 100;
        return (res + (res * (item.critChance / 100) * (item.critDmg / 100)));
    }
    return res;
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
