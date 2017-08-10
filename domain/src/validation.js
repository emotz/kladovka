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
    if (!isValid)
        item = undefined;
    return {
        item,
        isValid,
        errors
    };
}

function checkCollection(collection) {
    let errors = [];
    if (!Array.isArray(collection)) {
        return {
            collection: [],
            isValid: false,
            errors: [{ id: "notCollection", properties: [] }]
        };
    }
    for (let idx in collection) {
        collection[idx] = _.pick(collection[idx], ['type', 'minDmg', 'maxDmg', 'critChance', 'critDmg']);
        let notNumbers = filterNotNumbers(collection[idx], ['minDmg', 'maxDmg', 'critChance', 'critDmg']);
        if (notNumbers.length) {
            errors.push({
                id: "mustBeNumber",
                properties: notNumbers
            });
        }
        if (_.intersection(notNumbers, ['minDmg', 'maxDmg']).length === 0) {
            if (collection[idx].minDmg > collection[idx].maxDmg) {
                errors.push({
                    id: "mustBeLessThan",
                    properties: ["minDmg", "maxDmg"]
                });
            }
        }
        let notPositive = filterNotPositive(collection[idx], ['minDmg', 'maxDmg'], notNumbers);
        if (notPositive.length) {
            errors.push({
                id: "mustBePositive",
                properties: notPositive
            });
        }
        let negative = filterNegative(collection[idx], ['critChance', 'critDmg'], notNumbers.concat(notPositive));
        if (negative.length) {
            errors.push({
                id: "mustNotBeNegative",
                properties: negative
            });
        }
        if (!Item.types.some(type => type === collection[idx].type)) {
            errors.push({
                id: "notValidType",
                properties: ["type"]
            });
        }
    }
    let isValid = !errors.length;
    if (!isValid)
        collection = undefined;
    return {
        collection,
        isValid,
        errors
    };
}

// > checkChar({atkSpd:'asd', dmg: 3, critChance: 5, critDmg: -6})
// {char: undefined, isValid: false, errors: [{id: "mustBeNumber", properties: ["atkSpd"]}]}
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
    let isValid = !errors.length;
    if (!isValid)
        char = undefined;
    return {
        char,
        isValid,
        errors
    };
}

// > checkSignUp({email: 'userEmail', name: 'userName', password: 'userPass'})
// {isValid: true, errors: [], user : {email: 'userEmail', name: 'userName', password: 'userPass'}}
function checkSignUp(user) {
    user = _.pick(user, ['email', 'name', 'password']);
    let errors = [];
    let notString = filterNotString(user, ['email', 'name', 'password']);
    if (notString.length) {
        errors.push({
            id: "mustBeString",
            properties: notString
        });
    }
    let isValid = !errors.length;
    if (!isValid)
        user = undefined;
    return {
        user,
        isValid,
        errors
    };
}

// > checkSignIn({email: 'userEmail', name: 'userName', password: 'userPass'})
// {isValid: true, errors: [], user : {email: 'userEmail', password: 'userPass'}}
function checkSignIn(user) {
    user = _.pick(user, ['email', 'password']);
    let errors = [];
    let notString = filterNotString(user, ['email', 'password']);
    if (notString.length) {
        errors.push({
            id: "mustBeString",
            properties: notString
        });
    }
    let isValid = !errors.length;
    if (!isValid)
        user = undefined;
    return {
        user,
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

// > filterNotString({name:'user1', password:'', salt:2}, ['name', 'password', 'salt'])
// ["password", "salt"]
function filterNotString(item, props, excludes) {
    return _
        .difference(props, excludes || [])
        .filter(prop => (typeof item[prop] !== 'string' || item[prop].length === 0));
}

let collection = [
                {
                    enot: true,
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: 3,
                    critChance: 20,
                    critDmg: 60
                }, {
                    enot: false,
                    type: 'mace',
                    minDmg: 20,
                    maxDmg: 30,
                    critChance: 0,
                    critDmg: 0
                }
            ];
            let validationResult = checkCollection(collection);
            console.log(validationResult)

module.exports = {
    checkItem,
    checkCollection,
    checkChar,
    checkSignUp,
    checkSignIn
};
