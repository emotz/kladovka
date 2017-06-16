const array = require('lodash/array');
const Item = require('./Item');

function checkItem(item) {
    let errors = [];
    let notExists = getNotExistsedProperties(item);
    if (notExists.length)
        errors.push({
            id: "doesNotExist",
            properties: notExists
        });
    let notNumbers = getNotNumbers(item);
    if (notNumbers.length == 2) {
        errors.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    else {
        if (notNumbers.length) {
            errors.push({
                id: "mustBeNumber",
                properties: notNumbers
            });
        }
        if (item.minDmg > item.maxDmg) {
            errors.push({
                id: "mustBeLessThan",
                properties: ["minDmg", "maxDmg"]
            });
        }
        let notPositive = getNotPositive(item, notNumbers);
        if (notPositive.length) {
            errors.push({
                id: "mustBePositive",
                properties: notPositive
            });
        }
    }
    if (!Item.types.some(type => type === item.type)) {
        errors.push({
            id: "notValidType",
            properties: ["type"]
        });
    }
    let isValid = true;
    if (errors.length)
        isValid = false;
    return { isValid, errors };
}

function getNotNumbers(item) {
    let res = [];
    if (!Number.isInteger(item.minDmg))
        res.push('minDmg');
    if (!Number.isInteger(item.maxDmg))
        res.push('maxDmg');
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

module.exports = {
    checkItem
};
