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

    describe('for email', function () {

        it('должен пройти верификацию, если в коллекции нет такого email', async function () {
            let email = 'userEmail';
            let verificationResult = await verification.checkEmail(email);
            assert(verificationResult.isVerify === true);
        });

        it('если в коллекции есть такой email, то верификация не пройдена, нет email, есть ошибка ', async function () {
            let email = 'userEmail';
            await klad.placeInKladovka('users', { email });
            let verificationResult = await verification.checkEmail(email);
            assert(verificationResult.email === undefined);
            assert(verificationResult.isVerify === false);
            assert(verificationResult.errors.length === 1);
        });

    });

    after(async function () {
        return klad.disconnect();
    });
});