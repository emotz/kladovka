const assert = require('assert');
const expect = require('chai').expect;
const validation = require('../src/validation');

describe('validation unit test', function () {

    describe('for item', function () {

        it('предмет проходит валидацию', function () {
            let item = {
                type: 'axe',
                minDmg: 2,
                maxDmg: 3,
                critChance: 20,
                critDmg: 60
            };
            let validationResult = validation.checkItem(item);
            assert(validationResult.item.type === item.type);
            assert(validationResult.item.minDmg === item.minDmg);
            assert(validationResult.item.maxDmg === item.maxDmg);
            assert(validationResult.item.critChance === item.critChance);
            assert(validationResult.item.critDmg === item.critDmg);
            assert(validationResult.isValid === true);
            assert(validationResult.errors.length === 0);
        });

        it('избыточные свойства обрезаются и предмет проходит валидацию', function () {
            let item = {
                type: 'axe',
                minDmg: 2,
                maxDmg: 3,
                critChance: 20,
                critDmg: 60,
                enot: true
            };
            let validationResult = validation.checkItem(item);
            assert(Object.keys(validationResult.item).length === Object.keys(item).length - 1);
            assert(validationResult.item.type === item.type);
            assert(validationResult.item.minDmg === item.minDmg);
            assert(validationResult.item.maxDmg === item.maxDmg);
            assert(validationResult.item.critChance === item.critChance);
            assert(validationResult.item.critDmg === item.critDmg);
            assert(validationResult.item.enot === undefined);
            assert(validationResult.isValid === true);
            assert(validationResult.errors.length === 0);
        });

        it('при ошибке валидации предмета, в результате нет предмета и есть ошибка', function () {
            let item = {
                type: 'enot',
                minDmg: 2,
                maxDmg: 3,
                critChance: 20,
                critDmg: 60
            };
            let validationResult = validation.checkItem(item);
            assert(validationResult.item === undefined);
            assert(validationResult.isValid === false);
            assert(validationResult.errors.length === 1);
        });

        describe('errors', function () {

            it('#notValidType: [type]', function () {
                let item = {
                    type: 'enot',
                    minDmg: 2,
                    maxDmg: 3,
                    critChance: 20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "notValidType",
                            properties: ["type"]
                        }
                    ]);
            });

            it('#mustBeNumber: [minDmg]', function () {
                let item = {
                    type: 'axe',
                    minDmg: '2',
                    maxDmg: 3,
                    critChance: 20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["minDmg"]
                        }
                    ]);
            });

            it('#mustBeNumber: [minDmg, maxDmg, critChance]', function () {
                let item = {
                    type: 'axe',
                    minDmg: '2',
                    maxDmg: '3',
                    critChance: '20',
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["minDmg", "maxDmg", "critChance"]
                        }
                    ]);
            });

            it('#mustBeNumber: [maxDmg], mustBePositive: [minDmg]', function () {
                let item = {
                    type: 'axe',
                    minDmg: 0,
                    maxDmg: '3',
                    critChance: 20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["maxDmg"]
                        },
                        {
                            id: "mustBePositive",
                            properties: ["minDmg"]
                        }
                    ]);
            });

            it('#mustBeLessThan: [minDmg, maxDmg]', function () {
                let item = {
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: 1,
                    critChance: 20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeLessThan",
                            properties: ["minDmg", "maxDmg"]
                        }
                    ]);
            });

            it('#mustBeLessThan: [minDmg, maxDmg], mustBePositive: [maxDmg]', function () {
                let item = {
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: -1,
                    critChance: 20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeLessThan",
                            properties: ["minDmg", "maxDmg"]
                        },
                        {
                            id: "mustBePositive",
                            properties: ["maxDmg"]
                        }

                    ]);
            });
            it('#mustBeLessThan: [minDmg, maxDmg], mustBePositive: [maxDmg], mustNotBeNegative[critChance]', function () {
                let item = {
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: -1,
                    critChance: -20,
                    critDmg: 60
                };
                let validationResult = validation.checkItem(item);
                assert(validationResult.item === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeLessThan",
                            properties: ["minDmg", "maxDmg"]
                        },
                        {
                            id: "mustBePositive",
                            properties: ["maxDmg"]
                        },
                        {
                            id: "mustNotBeNegative",
                            properties: ["critChance"]
                        }

                    ]);
            });
        });
    });

    describe('for char', function () {

        it('персонаж проходит валидацию', function () {
            let char = {
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let validationResult = validation.checkChar(char);
            assert(validationResult.char.atkSpd === char.atkSpd);
            assert(validationResult.char.dmg === char.dmg);
            assert(validationResult.char.critChance === char.critChance);
            assert(validationResult.char.critDmg === char.critDmg);
            assert(validationResult.isValid === true);
            assert(validationResult.errors.length === 0);
        });

        it('избыточные свойства обрезаются и персонаж проходит валидацию', function () {
            let char = {
                enot: true,
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let validationResult = validation.checkChar(char);
            assert(validationResult.char.atkSpd === char.atkSpd);
            assert(validationResult.char.dmg === char.dmg);
            assert(validationResult.char.critChance === char.critChance);
            assert(validationResult.char.critDmg === char.critDmg);
            assert(validationResult.char.enot === undefined);
            assert(validationResult.isValid === true);
            assert(validationResult.errors.length === 0);
        });

        it('при ошибке валидации персонажа, в результате нет персонажа и есть ошибка', function () {
            let char = {
                atkSpd: '54',
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let validationResult = validation.checkChar(char);
            assert(validationResult.char === undefined);
            assert(validationResult.isValid === false);
            assert(validationResult.errors.length > 0);
        });

        describe('errors', function () {

            it('#mustBeNumber: [dmg, critChance]', function () {
                let char = {
                    atkSpd: 54,
                    dmg: '3',
                    critChance: undefined,
                    critDmg: 6
                };
                let validationResult = validation.checkChar(char);
                assert(validationResult.char === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["dmg", "critChance"]
                        }
                    ]);
            });

            it('#mustBeNumber: [dmg, critChance], mustNotBeNegative: [atkSpd]', function () {
                let char = {
                    atkSpd: -54,
                    dmg: '3',
                    critChance: undefined,
                    critDmg: 6
                };
                let validationResult = validation.checkChar(char);
                assert(validationResult.char === undefined);
                assert(validationResult.isValid === false);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["dmg", "critChance"]
                        },
                        {
                            id: "mustNotBeNegative",
                            properties: ["atkSpd"]
                        }
                    ]);
            });

        });

    });
});
