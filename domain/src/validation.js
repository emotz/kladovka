const _ = require('lodash');
const Item = require('./Item');
const clone = require('./utility').clone;

function checkItem(item) {
    _.pick(item, 'minDmg', 'maxDmg', 'type');
    let errors = [];
    let notNumbers = filterNotNumbers(item, ['minDmg', 'maxDmg']);
    if (notNumbers.length) {
        errors.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    if (notNumbers.indexOf.apply(notNumbers, ['minDmg', 'maxDmg']) === -1) {
        if (item.minDmg > item.maxDmg) {
            errors.push({
                id: "mustBeLessThan",
                properties: ["minDmg", "maxDmg"]
            });
        }
    }
    let notPositive = filterNotPositive(item, ['minDmg', 'maxDmg'], notNumbers);
    if (notPositive.length) {
        errors.push({
            id: "mustBePositive",
            properties: notPositive
        });
    }
    if (!Item.types.some(type => type === item.type)) {
        errors.push({
            id: "notValidType",
            properties: ["type"]
        });
    }
    let isValid = !errors.length;
    item = isValid ? clone(item) : undefined;
    return {
        item,
        isValid,
        errors
    };
}

function filterNotNumbers(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => !Number.isInteger(item[prop]));
}

function filterNotPositive(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => item[prop] <= 0);
}

module.exports = {
    checkItem
};
