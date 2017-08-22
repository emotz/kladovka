const assert = require('assert');
const CONFIG = require('../../config/config.json');
const klad = require('../src/main');
const verification = require('../src/verification');

describe('verification unit test', function () {

    before(async function () {
        return klad.connect(CONFIG.DB_URL);
    });

    beforeEach(async function () {
        return klad.clearKladovka('users');
    });

    describe('for user', function () {

        it('должен пройти верификацию, если в коллекции нет такого email', async function () {
            let user = {
                email: 'userEmail'
            };
            let verificationResult = await verification.checkSignUp(user);
            assert(verificationResult.isVerified === true);
        });

        it('если в коллекции есть такой email, то верификация не пройдена, нет email, есть ошибка ', async function () {
            let user = {
                email: 'userEmail'
            };
            await klad.addInKladovka('users', user);
            let verificationResult = await verification.checkSignUp(user);
            assert(verificationResult.user === undefined);
            assert(verificationResult.isVerified === false);
            assert(verificationResult.errors.length === 1);
        });

    });

    after(async function () {
        return klad.disconnect();
    });
});