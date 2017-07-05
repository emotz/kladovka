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
    if (item.critChance > 0 && item.critDmg > 0) {
        if (item.critChance > 100) item.critChance = 100;
        res += (res * (item.critChance / 100) * (item.critDmg / 100));
    }
    return res.toFixed(2);
}

function calcScore(item) {
    return item.dps * 10;
}

// > calcCharDps({dmg:10, atkSpd: 20})
// 12
function calcCharDps(char) {
    let res = char.dmg + (char.dmg * (char.atkSpd / 100));
    if (char.critChance > 0 && char.critDmg > 0) {
        if (char.critChance > 100) char.critChance = 100;
        res += (res * (char.critChance / 100) * (char.critDmg / 100));
    }
    return res.toFixed(2);
}

// > calcTotalDps({dps:20},{dmg:10, atkSpd: 20})
// 32
function calcTotalDps(item, char) {
    return (item.dps * 1 + calcCharDps(char) * 1).toFixed(2);
}

module.exports = {
    dps: calcDps,
    score: calcScore,
    aps: calcAps,
    charDps: calcCharDps,
    totalDps: calcTotalDps,
    types
};
