const Item = require('./Item');

function validation(item) {
    let res = [];
    if (!Number.isInteger(item.minDmg))
        res.push({
            id: "mustBeNumber",
            properties: ["minDmg"]
        });
    if (!Number.isInteger(item.maxDmg))
        res.push({
            id: "mustBeNumber",
            properties: ["maxDmg"]
        });
    if (item.minDmg > item.maxDmg)
        res.push({
            id: "mustBeLessThan",
            properties: ["minDmg, maxDmg"]
        });
    if (item.minDmg <= 0)
        res.push({
            id: "mustBePositive",
            properties: ["minDmg"]
        });
    if (!Item.types.some(type => type === item.type))
        res.push({
            id: "notValidType",
            properties: ["type"]
        });
    return res;
}

module.exports = validation;
