function setAps(item) {
    switch (item.type) {
        case 'mace': item.aps = 1.20; break;
        case 'dagger': item.aps = 1.50; break;
        case 'spear': item.aps = 1.20; break;
        case 'sword': item.aps = 1.40; break;
        case 'axe': item.aps = 1.30; break;
        case 'first weapon': item.aps = 1.40; break;
        case 'flail': item.aps = 1.40; break;
        case 'mighty weapon': item.aps = 1.30; break;
        case 'ceremonial knife': item.aps = 1.40; break;
        default: item.aps = 0;
    }
    return item;
}

function calcDps(item) {
    return (((item.minDmg + item.maxDmg) / 2) * item.aps).toFixed(2);
}

function calcScore(item) {
    return item.dps * 10;
}

module.exports = {
    dps: calcDps,
    score: calcScore,
    setAps
};
