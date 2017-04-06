function calcDps(item){
    return ((item.dmg_min+item.dmg_max)/2)*item.aps;
}
function calcScore(item){
    return item.dps*10;
}
module.exports={
    dps:calcDps,
    score:calcScore
};