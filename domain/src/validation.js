const array = require('lodash/array');
const Item = require('./Item');

function checkItem(item) {
    let errors = [];
    let notExists = filterNotExistedProperties(item, ['type', 'minDmg', 'maxDmg']);
    if (notExists.length)
        errors.push({
            id: "doesNotExist",
            properties: notExists
        });
    let notNumbers = filterNotNumbers(item, ['minDmg', 'maxDmg']);
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
        let notPositive = filterNotPositive(item, ['minDmg', 'maxDmg'], notNumbers);
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

function filterNotNumbers(item, props, excludes) {
    return array
        .difference(props, excludes || [])
        .filter(prop => !Number.isInteger(item[prop]));
}

function filterNotPositive(item, props, excludes) {
    return array
        .difference(props, excludes || [])
        .filter(prop => item[prop] <= 0);
}

function filterNotExistedProperties(item, props, excludes) {
    return array.difference(Object.keys(item), array.difference(props, excludes || []));
}

module.exports = {
    checkItem
};
