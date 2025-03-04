const { test: base, expect } = require('@playwright/test');

const { LandingPage } = require('../../tests/pages/LandingPage.js');
const { LoginPage } = require('../../tests/pages/LoginPage.js');
const { MoviesPage } = require('../../tests/pages/MoviesPage.js');
const { Toast } = require('../../tests/pages/Components.js');


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        });
    }
});
export { test, expect };