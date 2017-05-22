function calcDps(item) {
    return ((item.minDmg + item.maxDmg) / 2) * item.aps;
}

function calcScore(item) {
    return item.dps * 10;
}

module.exports = {
    dps: calcDps,
    score: calcScore
};
