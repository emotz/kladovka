const assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');

describe('validation e2e test', function () {

    describe('validation error', function () {

        it('#notValidType: [type]', async function () {
            let item = { type: 'enot', minDmg: 2, maxDmg: 4 };
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
            }
        });
    });
});