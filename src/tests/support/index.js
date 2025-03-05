const { test: base, expect } = require('@playwright/test');

const { LandingPage } = require('../../tests/pages/LandingPage.js');
const { LoginPage } = require('../../tests/pages/LoginPage.js');
const { MoviesPage } = require('../../tests/pages/MoviesPage.js');
const { Toast } = require('../../tests/pages/Components.js');


const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['landing'] = new LandingPage(page);
        context['login'] = new LoginPage(page);
        context['movies'] = new MoviesPage(page);
        context['toast'] = new Toast(page);
        await use(context);
    }

});
export { test, expect };