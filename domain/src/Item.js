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
    return res;
}

function calcScore(item) {
    return item.dps * 10;
}

// > calcTotalDps({ minDmg: 3, maxDmg: 3, aps: 1.2, critChance: 10, critDmg: 50 },{ dmg: 5, atkSpd: 20, critChance: 20 ,  critDmg: 200})
// 20.16
function calcTotalDps(item, char) {
    let dmg = (item.minDmg + item.maxDmg) / 2 + (char.dmg || 0);
    let aps = item.aps * (1 + (char.atkSpd || 0) / 100);
    let res = dmg * aps;
    let critChance = (item.critChance || 0) + (char.critChance || 0);
    let critDmg = (item.critDmg || 0) + (char.critDmg || 0);
    if (critChance > 0 && critDmg > 0) {
        if (critChance > 100) critChance = 100;
        res += res * (critChance / 100) * (critDmg / 100);
    }
    return res;
}


module.exports = {
    dps: calcDps,
    score: calcScore,
    aps: calcAps,
    totalDps: calcTotalDps,
    types
};
