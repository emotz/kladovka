function filterObj(obj, fn){
    var res={};
    for(var i in obj){
        if(fn(obj[i].type))
            res[i]=obj[i];
    }
    return res;
}

item1={id:1, type:'sword'};
item2={id:2, type:'axe'};
item3={id:3, type:'sword'};
var kladovka = {item1, item2, item3};

var swords = filterObj(kladovka, function(type){
    return type === 'sword';
});
console.log(swords);