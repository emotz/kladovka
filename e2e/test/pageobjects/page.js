'use strict';

class Page {
    constructor() { }

    open(path) {
        browser.url(path || '/');
    }

    get firstChildList(){
        return  browser.$('div.col-md-4 ul.list-group li.list-group-item:first-child');
    }
    get lastChildList(){
        return  browser.$('div.col-md-4 ul.list-group li.list-group-item:last-child');
    }
    get deleteAllBtn() {
        return browser.$('.col-xs-12 button.btn.diablo:first-child');
    }
    get deleteAllModal(){
        return browser.$('#delete-all');
    }
    get deleteAllConfirmBtn() {
        return browser.$('#delete-all div.modal-footer button.btn.diablo:last-child');
    }
    get addItemBtn() {
        return browser.$('.col-xs-12 button.btn.diablo:last-child');
    }
    get addItemModal(){
        return browser.$('#add-item');
    }
    get addItemConfirmBtn() {
        return browser.$('#add-item div.modal-footer button.btn.diablo:last-child');
    }
    waitForConfimAdd() {
        this.addItemModal.waitForVisible();
    }
    waitForDeleteAll() {
        this.deleteAllBtn.click();
        this.deleteAllModal.waitForVisible();
        this.deleteAllConfirmBtn.click();
        this.deleteAllModal.waitForVisible(undefined, true);
    }
    waitForAddItem(){
        this.addItemBtn.click();
        this.addItemModal.waitForVisible();
        this.addItemConfirmBtn.click();
        this.addItemModal.waitForVisible(undefined, true);
    }
}

module.exports = new Page;