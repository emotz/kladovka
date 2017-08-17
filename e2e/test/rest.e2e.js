const assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');

describe('e2e test', function () {

    describe('for user', function () {

        it('should create new user', async function () {
            let user = {
                email: 'userEmail',
                name: 'userName',
                password: 'userPass',
            };
            let res = await axios.post('http://localhost:8080/api/users', user);
            assert(res.status === 201);
        });

        describe('verification error', function () {

            it('#emailAlreadyExists', async function () {
                let user = {
                    email: 'userEmail',
                    name: 'userName',
                    password: 'userPass',
                };
                let res = await axios.post('http://localhost:8080/api/users', user);
                assert(res.status === 201);
                try {
                    await axios.post('http://localhost:8080/api/users', user);
                } catch (e) {
                    assert(e.response.data.code === 2);
                    expect(e.response.data.errors)
                        .to.have.deep.members([
                            {
                                id: "emailAlreadyExists",
                                properties: ["email"]
                            }
                        ]);
                    return;
                }
                assert(false);
            });
        });
    });


    describe('for item', function () {

        describe('validation error', function () {

            it('#notValidType: [type]', async function () {
                let item = {
                    type: 'enot',
                    minDmg: 2,
                    maxDmg: 3,
                    critChance: 20,
                    critDmg: 60
                };
                try {
                    await axios.post('http://localhost:8080/api/items', item);
                } catch (e) {
                    assert(e.response.data.code === 1);
                    expect(e.response.data.errors)
                        .to.have.deep.members([
                            {
                                id: "notValidType",
                                properties: ["type"]
                            }
                        ]);
                    return;
                }
                assert(false);
            });
        });
    });

    describe('for char', function () {

        it('should create new char', async function () {
            let char = {
                _id: undefined,
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let res = await axios.post('http://localhost:8080/api/chars', char);
            assert(typeof (res.data.added_id) === 'string');
        });

        it('should create & update char', async function () {
            let char = {
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let res = await axios.post('http://localhost:8080/api/chars', char);
            assert(typeof (res.data.added_id) === 'string');
            let id = res.data.added_id;
            res = await axios.put('http://localhost:8080/api/chars/' + id, char);
            assert(res.status === 204);
        });

        it('should reset char', async function () {
            let char = {
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let res = await axios.post('http://localhost:8080/api/chars', char);
            assert(typeof (res.data.added_id) === 'string');
            let id = res.data.added_id;
            char.atkSpd = 0;
            char.dmg = 0;
            char.critChance = 0;
            char.critDmg = 0;
            res = await axios.put('http://localhost:8080/api/chars/' + id, char);
            assert(res.status === 204);
        });

        describe('validation error', function () {

            it('#mustBeNumber: [atkSpd]', async function () {
                let char = {
                    _id: undefined,
                    atkSpd: '54',
                    dmg: 3,
                    critChance: 5,
                    critDmg: 6
                };
                try {
                    await axios.post('http://localhost:8080/api/chars', char);
                } catch (e) {
                    assert(e.response.data.code === 1);
                    expect(e.response.data.errors)
                        .to.have.deep.members([
                            {
                                id: "mustBeNumber",
                                properties: ["atkSpd"]
                            }
                        ]);
                    return;
                }
                assert(false);
            });
        });
    });
});