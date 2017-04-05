function calcDps(item){
    return ((item.dmg_min+item.dmg_max)/2)*item.aps;
}
function calcScore(item){
    let score=0;
    return score;
}
module.exports={
    calcDps,
    calcScore
};