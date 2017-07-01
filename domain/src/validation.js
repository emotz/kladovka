const _ = require('lodash');
const Item = require('./Item');

function checkItem(item) {
    item = _.pick(item, ['type', 'minDmg', 'maxDmg', 'critChance', 'critDmg']);
    let errors = [];
    let notNumbers = filterNotNumbers(item, ['minDmg', 'maxDmg', 'critChance', 'critDmg']);
    if (notNumbers.length) {
        errors.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    if (_.intersection(notNumbers, ['minDmg', 'maxDmg']).length === 0) {
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
    let negative = filterNegative(item, ['critChance', 'critDmg'], notNumbers.concat(notPositive));
    if (negative.length) {
        errors.push({
            id: "mustNotBeNegative",
            properties: negative
        });
    }
    if (!Item.types.some(type => type === item.type)) {
        errors.push({
            id: "notValidType",
            properties: ["type"]
        });
    }
    let isValid = !errors.length;
    if (isValid) {
        if (item.critChance === 0)
            delete item.critChance;
        if (item.critDmg === 0)
            delete item.critDmg;
    } else
        item = undefined;

    return {
        item,
        isValid,
        errors
    };
}

// > checkChar({atkSpd:'asd', dmg: 3, critChance: 5, critDmg: -6})
// {char: undefined, isValid: false, errors: [{id: "mustBeNumber", properties: ["atkSpd"]}, {id: "mustNotBeNegative", properties: ['critDmg']}]}
function checkChar(char) {
    char = _.pick(char, ['_id', 'atkSpd', 'dmg', 'critChance', 'critDmg']);
    let errors = [];
    let notNumbers = filterNotNumbers(char, ['atkSpd', 'dmg', 'critChance', 'critDmg']);
    if (notNumbers.length) {
        errors.push({
            id: "mustBeNumber",
            properties: notNumbers
        });
    }
    let negative = filterNegative(char, ['atkSpd', 'dmg', 'critChance', 'critDmg'], notNumbers);
    if (negative.length) {
        errors.push({
            id: "mustNotBeNegative",
            properties: negative
        });
    }
    let isValid = !errors.length;
    if (isValid) {
        Object.keys(char)
            .filter(prop => prop !== '_id')
            .forEach(prop => {
                if (char[prop] === 0)
                    delete char[prop];
            });
    }
    else
        char = undefined;

    return {
        char,
        isValid,
        errors
    };
}

// > filterNotNumbers({minDmg:1, maxDmg:'2'}, ['minDmg', 'maxDmg'])
// ["maxDmg"]
function filterNotNumbers(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => Number(item[prop]) !== item[prop]);
}

function filterNotPositive(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => item[prop] <= 0);
}

function filterNegative(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => item[prop] < 0);
}

module.exports = {
    checkItem,
    checkChar
};
