describe('e2e test', function () {
    it('simple', function () {
        browser
            .url('/')
            .setValue('#search_form_input_homepage', 'WebdriverIO')
            .click('#search_button_homepage');
        let title = browser.getTitle();
        console.log('Title is: ' + title);
    });
});