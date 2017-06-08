const page = require('./pageobjects/page');
describe('e2e test', function () {
    browser.windowHandleSize({ width: 1920, height: 1080 });

    beforeEach(function () {
        page.open();
    });

    afterEach(function () {
        page.waitForDeleteAll();
        page.waitForEmptyList();
    });

    it('удаляет все предметы', function () {
        page.waitForDeleteAll();
        page.waitForEmptyList();
    });
    it('добавляет предмет по умолчанию в пустую кладовку', function () {
        page.waitForAddItem();
        page.waitForNotEmptyList();
    });
    it('добавляет конкретный предмет в пустую кладовку и сразу же удаляет этот предмет', function () {
        let item = {
            type: 'sword',
            minDmg: 20,
            maxDmg: 30
        };
        page.waitForAddCustomItem(item);
        page.waitForNotEmptyList();
        page.waitForDeleteCustomItem(item);
        page.waitForEmptyList();
    });
});