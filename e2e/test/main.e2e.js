let assert = require('assert');
const page = require('./pageobjects/page');
describe('e2e test', function () {
    browser.windowHandleSize({ width: 1920, height: 1080 });
    it('удаляет все предметы', function () {
        page.open();
        page.waitForDeleteAll();
        assert(page.firstChildList.getAttribute('class') === 'list-group-item down-buttons');
    });
    it('добавляет новый предмет', function () {
        page.open();
        page.waitForAddItem();
    });
});