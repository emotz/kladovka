const apsByType = {
    'mace': 1.20,
    'dagger': 1.50,
    'spear': 1.20,
    'sword': 1.40,
    'axe': 1.30,
    'first weapon': 1.40,
    'flail': 1.40,
    'mighty weapon': 1.30,
    'ceremonial knife': 1.40
};

const types = Object.keys(apsByType).sort();

function calcAps(item) {
    for (let type in apsByType) {
        if (item.type === type)
            return apsByType[type];
    }
}

function calcDps(item) {
    return ((item.minDmg + item.maxDmg) / 2) * item.aps;
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
