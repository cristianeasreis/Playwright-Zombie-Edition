const { test: base, expect } = require('@playwright/test');

const { Leads } = require('../../tests/actions/Leads.js');
const { Login } = require('../../tests/actions/Login.js');
const { Movies } = require('../../tests/actions/Movies.js');
const { Toast } = require('../../tests/actions/Components.js');


const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['toast'] = new Toast(page);
        await use(context);
    }

});
export { test, expect };