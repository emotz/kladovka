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
        return browser.$('.manipulate-all button.btn.diablo:first-child');
    }
    get deleteAllModal() {
        return browser.$('#delete-all');
    }
    get deleteAllConfirmBtn() {
        return browser.$('#delete-all div.modal-footer button.btn.diablo:last-child');
    }
    get addItemBtn() {
        return browser.$('.manipulate-all button.btn.diablo:last-child');
    }
    get addItemModal() {
        return browser.$('#add-item');
    }
    get addItemConfirmBtn() {
        return browser.$('#add-item div.modal-footer button.btn.diablo:last-child');
    }
    deleteAll() {
        this.deleteAllBtn.click();
        this.deleteAllModal.waitForVisible();
        this.deleteAllConfirmBtn.click();
        this.deleteAllModal.waitForVisible(undefined, true);
    }
    addItem() {
        this.addItemBtn.click();
        this.addItemModal.waitForVisible();
        this.addItemConfirmBtn.click();
        this.addItemModal.waitForVisible(undefined, true);
    }
    addCustomItem(item) {
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
    deleteLastItem() {
        this.lastChildOfList.$('.col-xs-4 button').click();
    }
    waitForLastItem(item) {
        if (this.lastChildOfList.$('.col-xs-8 dl dd').getText() == `Type: ${item.type}`)
            this.lastChildOfList.waitForVisible();
        else
            throw new Error('Not Last Item');
    }
    waitForEmptyList() {
        this.lastChildOfList.waitForVisible(undefined, true);
    }
    waitForNotEmptyList() {
        this.lastChildOfList.waitForVisible();
    }
}

module.exports = new Page;