const array = require('lodash/array');
const Item = require('./Item');

function checkItem(item) {
    let errors = [];
    let notExists = getNotExistsedProperties(item);
    if (notExists.length)
        errors.push({
            id: "mustBePresent",
            properties: notExists
        });
    let notNumbers = getNotNumbers(item);
    if (notNumbers.length == 3) {
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

function parseValidationErrors(errors) {
    let res = [];
    errors.forEach(err => {
        if (err.id === 'mustBeLessThan') {
            let str = err.properties[0] + ' ' + err.id + ' ' + err.properties[1]
            res.push(str);
        }
        else {
            let str = err.properties.join(', ') + ' ' + err.id;
            res.push(str);
        }
    });
    return res;
}

module.exports = {
    checkItem,
    parseValidationErrors
};
