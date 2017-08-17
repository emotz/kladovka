const assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');

const email = "testEmail";
const name = "testName";
const password = "testPassword";
let token;

describe('e2e test', function () {

    before(async function () {
        let res = await axios.post("http://localhost:8080/api/users", { email, name, password });
        assert(res.status === 201);
    });

    it('should catch verification error: #emailAlreadyExists', async function () {
        try {
            await axios.post("http://localhost:8080/api/users", { email, name, password });
        }
        catch (e) {
            assert(e.response.status === 400);
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

    it('should get token', async function () {
        let res = await axios.post("http://localhost:8080/api/tokens", { email, password });
        assert(res.status === 200);
        token = res.data.accessToken;
    });

    it('should catch authentication error: #emailOrPasswordInvalid', async function () {
        try {
            await axios.post("http://localhost:8080/api/tokens", { email, password: "oops" });
        } catch (e) {
            assert(e.response.status === 400);
            assert(e.response.data.code === 3);
            expect(e.response.data.errors)
                .to.have.deep.members([
                    {
                        id: "emailOrPasswordInvalid",
                        properties: ["email", "password"]
                    }
                ]);
            return;
        }
        assert(false);
    });

    it('should catch authorization error: #invalidToken', async function () {
        let item = {
            type: "axe",
            minDmg: 1,
            maxDmg: 2,
            critDmg: 0
        };
        try {
            await axios.post("http://localhost:8080/api/items", item, {
                headers: { 'Authorization': 'Bearer ' + token + 'oops' }
            });
        } catch (e) {
            assert(e.response.status === 401);
            assert(e.response.data.code === 4);
            expect(e.response.data.errors)
                .to.have.deep.members([
                    {
                        id: "invalidToken",
                        properties: []
                    }
                ]);
            return;
        }
        assert(false);
    });


    it('should catch validation error: #mustBeNumber', async function () {
        let item = {
            type: "axe",
            minDmg: 1,
            maxDmg: 2,
            critDmg: 0
        };
        try {
            await axios.post("http://localhost:8080/api/items", item, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
        } catch (e) {
            assert(e.response.status === 400);
            assert(e.response.data.code === 1);
            expect(e.response.data.errors)
                .to.have.deep.members([
                    {
                        id: "mustBeNumber",
                        properties: ["critChance"]
                    }
                ]);
            return;
        }
        assert(false);
    });

    it('should add item', async function () {
        let item = {
            type: "axe",
            minDmg: 1,
            maxDmg: 2,
            critDmg: 0,
            critChance: 0
        };
        let res = await axios.post("http://localhost:8080/api/items", item, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        assert(res.status === 201);
    });
});