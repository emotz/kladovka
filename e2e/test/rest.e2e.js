const assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');

describe('validation e2e test', function () {

    describe('for item', function () {

        describe('error', function () {

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
                _id: undefined,
                atkSpd: 54,
                dmg: 3,
                critChance: 5,
                critDmg: 6
            };
            let res = await axios.post('http://localhost:8080/api/chars', char);
            assert(typeof (res.data.added_id) === 'string');
            char._id = res.data.added_id;
            res = await axios.put('http://localhost:8080/api/chars/' + char._id, char);
            assert(res.status === 204);
        });

        describe('error', function () {

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
