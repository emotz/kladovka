'use strict';

class Page {
    constructor() { }

    open(path) {
        browser.url(path || '/');
    }

    get lastChildOfList() {
        return browser.$('div.col-md-4.kl-items ul.list-group li.list-group-item:last-child');
    }
    get deleteAllBtn() {
        return browser.$('div.col-md-4.kl-items .manipulate-all button.btn.diablo:first-child');
    }
    get deleteAllModal() {
        return browser.$('#delete-all');
    }
    get deleteAllConfirmBtn() {
        return browser.$('#delete-all div.modal-footer button.btn.diablo:last-child');
    }
    get addItemBtn() {
        return browser.$('div.col-md-4.kl-items .manipulate-all button.btn.diablo:last-child');
    }
    get addItemModal() {
        return browser.$('#add-item');
    }
    get addItemConfirmBtn() {
        return browser.$('#add-item div.modal-footer button.btn.diablo:last-child');
    }
    get char(){
        return browser.$('div.col-md-4.kl-char');
    }
    get updateCharBtn() {
        return browser.$('div.col-md-4.kl-char button.btn.diablo:last-child');
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
        modal.$('#kl-item-type-input').selectByValue(item.type);
        modal.$('#kl-item-minDmg-input').clearElement();
        modal.$('#kl-item-minDmg-input').setValue(item.minDmg);
        modal.$('#kl-item-critChance-input').clearElement();
        modal.$('#kl-item-critChance-input').setValue(item.critChance);
        modal.$('#kl-item-critDmg-input').clearElement();
        modal.$('#kl-item-critDmg-input').setValue(item.critDmg);
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
    addCustomChar(char){
        this.char.$('#kl-char-dmg-input').clearElement();
        this.char.$('#kl-char-dmg-input').setValue(char.dmg);
        this.char.$('#kl-char-atkSpd-input').clearElement();
        this.char.$('#kl-char-atkSpd-input').setValue(char.atkSpd);
        this.char.$('#kl-char-critChance-input').clearElement();
        this.char.$('#kl-char-critChance-input').setValue(char.critChance);
        this.char.$('#kl-char-critDmg-input').clearElement();
        this.char.$('#kl-char-critDmg-input').setValue(char.critDmg);
        this.updateCharBtn.click();
    }
    itemWithOutTotalDps(){
        this.lastChildOfList.$('.kl-item-totalDps').waitForVisible(undefined, true);
    }
    itemWithTotalDps(){
        this.lastChildOfList.$('.kl-item-totalDps').waitForVisible();
    }
    refresh() {
        browser.refresh();
    }
}

module.exports = new Page;