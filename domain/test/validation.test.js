const assert = require('chai').assert;
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
            assert(validationResult.isValid === true);
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
            assert(validationResult.item.enot === undefined);
            assert(validationResult.isValid === true);
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
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBePositive",
                            properties: ["minDmg"]
                        },
                        {
                            id: "mustBeNumber",
                            properties: ["maxDmg"]
                        },
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
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustNotBeNegative",
                            properties: ["critChance"]
                        },
                        {
                            id: "mustBeLessThan",
                            properties: ["minDmg", "maxDmg"]
                        },
                        {
                            id: "mustBePositive",
                            properties: ["maxDmg"]
                        },
                    ]);
            });
        });
    });

    describe('for items collection', function () {

        it('предмет проходит валидацию', function () {
            let collection = [
                {
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: 3,
                    critChance: 20,
                    critDmg: 60
                }, {
                    type: 'mace',
                    minDmg: 20,
                    maxDmg: 30,
                    critChance: 0,
                    critDmg: 0
                }
            ];
            let validationResult = validation.checkCollection(collection);
            assert(validationResult.isValid === true);
        });

        it('избыточные свойства обрезаются и предмет проходит валидацию', function () {
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
            let validationResult = validation.checkCollection(collection);
            assert(validationResult.collection[0].enot === undefined);
            assert(validationResult.collection[1].enot === undefined);
            assert(validationResult.isValid === true);
        });

        it('при ошибке валидации предмета, в результате нет предмета и есть ошибка', function () {
             let collection = [
                {
                    type: 'axe',
                    minDmg: 2,
                    maxDmg: 3,
                    critChance: 20,
                }, {
                    type: 'mace',
                    minDmg: 20,
                    maxDmg: 30,
                    critChance: 0,
                    critDmg: 0
                }
            ];
            let validationResult = validation.checkCollection(collection);
            assert(validationResult.collection === undefined);
            assert(validationResult.isValid === false);
            assert(validationResult.errors.length === 1);
        });

    });

    describe('for char', function () {

        //property testing come soon..
        it('персонаж проходит валидацию', function () {
            let char = {
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let validationResult = validation.checkChar(char);
            assert.deepEqual(validationResult, {
                char: {
                    atkSpd: 54,
                    dmg: 3,
                    critChance: 5,
                    critDmg: 6
                },
                isValid: true,
                errors: []
            });
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
            assert(validationResult.char.enot === undefined);
            assert(validationResult.isValid === true);
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
            assert(validationResult.errors.length === 1);
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
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeNumber",
                            properties: ["dmg", "critChance"]
                        }
                    ]);
            });
        });
    });


    describe('for user', function () {

        it('должен зарегистрировать пользователя', function () {
            let user = {
                email: 'userEmail',
                name: 'userName',
                password: 'userPass'
            };
            let validationResult = validation.checkSignUp(user);
            assert(validationResult.isValid === true);
        });

        it('должен обрезать лишние свойства и зарегистрировать пользователя', function () {
            let user = {
                email: 'userEmail',
                name: 'userName',
                password: 'userPass',
                enot: true
            };
            let validationResult = validation.checkSignUp(user);
            assert(validationResult.isValid === true);
            assert(validationResult.user.enot === undefined);
        });

        it('при ошибке валидации пользователя, в результате нет пользователя и есть ошибка', function () {
            let user = {
                email: 'userEmail',
                name: 'userName',
                password: 123,
            };
            let validationResult = validation.checkSignUp(user);
            assert(validationResult.isValid === false);
            assert(validationResult.user === undefined);
            assert(validationResult.errors.length === 1);
        });


        describe('errors', function () {

            it('#mustBeString: [name, password]', function () {
                let user = {
                    email: 'userEmail',
                    password: 123,
                };
                let validationResult = validation.checkSignUp(user);
                expect(validationResult.errors)
                    .to.have.deep.members([
                        {
                            id: "mustBeString",
                            properties: ["name", "password"]
                        }
                    ]);
            });

        });
    });
});
