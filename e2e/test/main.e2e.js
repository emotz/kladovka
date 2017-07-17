const page = require('./pageobjects/page');
describe('e2e test', function () {
    browser.windowHandleSize({ width: 1920, height: 1080 });

    beforeEach(function () {
        page.open();
    });

    afterEach(function () {
        page.deleteAll();
        page.waitForEmptyList();
    });

    it('удаляет все предметы, ннно сперва добавляет парочку', function () {
        page.addItem();
        page.waitForNotEmptyList();
        page.addItem();
        page.waitForNotEmptyList();
        page.deleteAll();
        page.waitForEmptyList();
    });

    it('добавляет предмет по умолчанию в пустую кладовку', function () {
        page.addItem();
        page.waitForNotEmptyList();
    });

    it('добавляет конкретный предмет в пустую кладовку и сразу же удаляет этот предмет', function () {
        let item = {
            type: 'sword',
            minDmg: 20,
            maxDmg: 30,
            critChance: 20,
            critDmg: 60
        };
        page.addCustomItem(item);
        page.waitForNotEmptyList();
        page.deleteLastItem();
        page.waitForEmptyList();
    });

    it('последний добавленный предмет - последний в списке (привет, stack)', function () {
        let item = {
            type: 'sword',
            minDmg: 2,
            maxDmg: 3,
            critChance: 20,
            critDmg: 60
        };
        page.addItem();
        page.waitForNotEmptyList();
        page.addCustomItem(item);
        page.waitForNotEmptyList();
        page.waitForLastItem(item);
        page.deleteLastItem();
        page.waitForNotEmptyList();
    });

    it('add item -> refresh page -> delete item -> refresh page -> item deleted', function () {
        page.addItem();
        page.waitForNotEmptyList();
        page.refresh();
        page.deleteLastItem();
        page.refresh();
        page.waitForEmptyList();
    });

    it('should recalculate the item dps for current character', function () {
        page.addItem();
        page.waitForNotEmptyList();
        page.itemWithOutTotalDps();
        let char = {
            atkSpd: 54,
            dmg: 3,
            critChance: 5,
            critDmg: 6
        };
        page.addCustomChar(char);
        page.itemWithTotalDps();
    });

    it('should sort items by dps desc', function () {
        let item1 = {
            type: 'sword',
            minDmg: 2,
            maxDmg: 3,
            critChance: 20,
            critDmg: 60
        };
        page.addCustomItem(item1);
        page.waitForNotEmptyList();
        let item2 = {
            type: 'mace',
            minDmg: 20,
            maxDmg: 30,
            critChance: 20,
            critDmg: 60
        };
        page.addCustomItem(item2);
        page.waitForNotEmptyList();
        page.sortByDpsDesc();
        page.waitForLastItem(item1);
    });
});