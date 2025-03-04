const { test } = require('@playwright/test');

const { LoginPage } = require('../../tests/pages/LoginPage.js');
const { MoviesPage } = require('../../tests/pages/MoviesPage.js');
const { Toast } = require('../../tests/pages/Components.js');

let loginPage;
let moviesPage;
let toast;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    moviesPage = new MoviesPage(page);
    toast = new Toast(page);
});

test('deve poder cadastrar um novo filme ', async ({ page }) => {

    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();
    await moviesPage.create('Resident Evil', 'A missão', 'Netflix', '1980');

});