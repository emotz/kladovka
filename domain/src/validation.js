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
    if (notNumbers.length == 2) {
        res.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    else if (notNumbers.length == 1 && !notNumbers.indexOf('minDmg')) {
        res.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
        if (item.minDmg <= 0)
            res.push({
                id: "mustBePositive",
                properties: ["minDmg"]
            });
    }
    else if (notNumbers.length == 0) {
        if (item.minDmg > item.maxDmg)
            res.push({
                id: "mustBeLessThan",
                properties: ["minDmg, maxDmg"]
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
        res.push(item.minDmg);
    if (!Number.isInteger(item.maxDmg))
        res.push(item.maxDmg);
    return res;
}

function getNotExistsedProperties(item) {
    let prop = Object.keys(item);
    return array.difference(prop, Item.model);
}

module.exports = validation;
