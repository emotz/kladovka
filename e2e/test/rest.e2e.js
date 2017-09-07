const assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');
const urlJoin = require('url-join');

const email = "testEmail";
const name = "testName";
const password = "testPassword";
const badToken = 'bad token';
let token;


describe('e2e tests', function () {

    it('should add user', async function () {
        let res = await axios.post("http://dev:8080/api/users", { email, name, password });
        assert(res.status === 201);
    });

    it('should get token', async function () {
        let res = await axios.post("http://dev:8080/api/tokens", { email, password });
        assert(res.status === 200);
        token = res.data.accessToken;
    });

    it('should catch verification error: #emailAlreadyExists', async function () {
        try {
            await axios.post("http://dev:8080/api/users", { email, name, password });
        }
        catch (e) {
            assert(e.response.status === 409);
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

    it('should catch authentication error: #emailOrPasswordInvalid', async function () {
        try {
            await axios.post("http://dev:8080/api/tokens", { email, password: "oops" });
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
            await axios.post("http://dev:8080/api/items", item, {
                headers: { 'Authorization': 'Bearer ' + badToken }
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

    describe('for items', function () {

        beforeEach(async function () {
            await axios.delete("http://dev:8080/api/items", {
                headers: { 'Authorization': 'Bearer ' + token }
            });
        });

        it('should catch item validation error: #mustBeNumber', async function () {
            let item = {
                type: "axe",
                minDmg: 1,
                maxDmg: 2,
                critDmg: 0
            };
            try {
                await axios.post("http://dev:8080/api/items", item, {
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
            let res = await axios.post("http://dev:8080/api/items", item, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(res.status === 201);
        });

        it('should add collection of items ', async function () {
            let collections = [{
                type: "axe",
                minDmg: 1,
                maxDmg: 2,
                critDmg: 0,
                critChance: 0
            }, {
                type: "axe",
                minDmg: 21,
                maxDmg: 22,
                critDmg: 20,
                critChance: 20
            }];
            let res = await axios.post(urlJoin("http://dev:8080/api/items-collection"), collections, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(res.data.inserted_count === 2);
        });

        it('should get all items ', async function () {
            let collections = [{
                type: "axe",
                minDmg: 1,
                maxDmg: 2,
                critDmg: 0,
                critChance: 0
            }, {
                type: "axe",
                minDmg: 21,
                maxDmg: 22,
                critDmg: 20,
                critChance: 20
            }];
            await axios.post(urlJoin("http://dev:8080/api/items-collection"), collections, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let resGet = await axios.get("http://dev:8080/api/items", {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(resGet.data.length === 2);
        });

        it('should delete item by id', async function () {
            let item = {
                type: "axe",
                minDmg: 1,
                maxDmg: 2,
                critDmg: 0,
                critChance: 0
            };
            let resPost = await axios.post("http://dev:8080/api/items", item, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let id = resPost.data.added_id;
            let resDel = await axios.delete(urlJoin("http://dev:8080/api/items", id), {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(resDel.status === 204);
            try {
                await axios.get(urlJoin("http://dev:8080/api/items", id), {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            } catch (e) {
                assert(e.response.status === 404);
                return;
            }
            assert(false);
        });
    });

    describe('for chars', function () {

        beforeEach(async function () {
            await axios.delete("http://dev:8080/api/chars", {
                headers: { 'Authorization': 'Bearer ' + token }
            });
        });

        it('should add char', async function () {
            let char = {
                dmg: 10,
                atkSpd: 2,
                critChance: 30,
                critDmg: 50
            };
            let res = await axios.post("http://dev:8080/api/chars", char, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(res.status === 201);
        });

        it('should update existing char', async function () {
            let char = {
                dmg: 10,
                atkSpd: 2,
                critChance: 30,
                critDmg: 50
            };
            let resPost = await axios.post("http://dev:8080/api/chars", char, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let id = resPost.data.added_id;
            char.dmg = 100500;
            let resPut = await axios.put(urlJoin("http://dev:8080/api/chars", id), char, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(resPut.status === 204);
            let resGet = await axios.get("http://dev:8080/api/chars", {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            assert(resGet.data.dmg === 100500);
        });

    });
});
