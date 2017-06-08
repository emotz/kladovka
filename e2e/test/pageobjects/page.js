'use strict';

class Page {
    constructor() { }

    open(path) {
        browser.url(path || '/');
    }

    get lastChildOfList() {
        return browser.$('div.col-md-4 ul.list-group li.list-group-item:last-child');
    }
    get deleteAllBtn() {
        return browser.$('.footer-list button.btn.diablo:first-child');
    }
    get deleteAllModal() {
        return browser.$('#delete-all');
    }
    get deleteAllConfirmBtn() {
        return browser.$('#delete-all div.modal-footer button.btn.diablo:last-child');
    }
    get addItemBtn() {
        return browser.$('.footer-list button.btn.diablo:last-child');
    }
    get addItemModal() {
        return browser.$('#add-item');
    }
    get addItemConfirmBtn() {
        return browser.$('#add-item div.modal-footer button.btn.diablo:last-child');
    }
    waitForDeleteAll() {
        this.deleteAllBtn.click();
        this.deleteAllModal.waitForVisible();
        this.deleteAllConfirmBtn.click();
        this.deleteAllModal.waitForVisible(undefined, true);
    }
    waitForAddItem() {
        this.addItemBtn.click();
        this.addItemModal.waitForVisible();
        this.addItemConfirmBtn.click();
        this.addItemModal.waitForVisible(undefined, true);
    }
    waitForAddCustomItem(item) {
        this.addItemBtn.click();
        let modal = this.addItemModal;
        modal.waitForVisible();
        modal.$('.kl-type-input').selectByValue(item.type);
        modal.$('.kl-minDmg-input').clearElement();
        modal.$('.kl-minDmg-input').setValue(item.minDmg);
        modal.$('.kl-maxDmg-input').clearElement();
        modal.$('.kl-maxDmg-input').setValue(item.maxDmg);
        this.addItemConfirmBtn.click();
        modal.waitForVisible(undefined, true);
    }
    waitForDeleteCustomItem(item) {
        let lastItem = this.lastChildOfList;
        if (lastItem.$('.col-xs-8 dl dd').getText() == `type: ${item.type}`) {
            lastItem.$('.col-xs-4 button').click();
        }
    }
    waitForEmptyList() {
        this.lastChildOfList.waitForVisible(undefined, true);
    }
    waitForNotEmptyList() {
        this.lastChildOfList.waitForVisible();
    }
}

module.exports = new Page;