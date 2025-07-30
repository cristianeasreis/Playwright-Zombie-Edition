const { test: base, expect } = require('@playwright/test');

const { Leads } = require('./actions/Leads.js');
const { Login } = require('./actions/Login.js');
const { Movies } = require('./actions/Movies.js');
const { Popup } = require('./actions/Components.js');

const {Api} = require('./api');


const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['popup'] = new Popup(page);
        await use(context);
    },
    request: async ({ request }, use) => {
        const context = request
        context['api'] = new Api(request);
        await context['api'].setToken();
        await use (context);
    }

});
export { test, expect };
