const array = require('lodash/array');
const Item = require('./Item');

function validation(item) {
    let res = [];
    let notExists = getNotExistsedProperties(item);
    if (notExists.length)
        res.push({
            id: "NotExistsedProperties",
            properties: notExists
        });
    let notNumbers = getNotNumbers(item);
    if (notNumbers.length == 3) {
        res.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    else {
        if (notNumbers.length)
            res.push({
                id: "mustBeNumber",
                properties: notNumbers
            });
        if (item.minDmg > item.maxDmg)
            res.push({
                id: "mustBeLessThan",
                properties: ["minDmg, maxDmg"]
            });
        let notPositive = getNotPositive(item, notNumbers);
        if (notPositive.length)
            res.push({
                id: "mustBePositive",
                properties: notPositive
            });
    }
    if (!Item.types.some(type => type === item.type))
        res.push({
            id: "notValidType",
            properties: ["type"]
        });
    return res;
}

function getNotNumbers(item) {
    let res = [];
    if (!Number.isInteger(item.minDmg))
        res.push('minDmg');
    if (!Number.isInteger(item.maxDmg))
        res.push('maxDmg');
    if (!(Number(item.aps) === item.aps && item.aps % 1 !== 0))
        res.push('aps');
    return res;
}

function getNotPositive(item, notNumbers) {
    notNumbers.push('type');
    let nums = array.difference(Object.keys(item), notNumbers);
    return nums.filter(val => item[val] < 1);
}

function getNotExistsedProperties(item) {
    let prop = Object.keys(item);
    return array.difference(prop, Item.model);
}

module.exports = validation;
