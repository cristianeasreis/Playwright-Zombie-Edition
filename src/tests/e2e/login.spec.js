const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../tests/pages/LoginPage.js');
const { Toast } = require('../../tests/pages/Components.js');

let loginPage;
let toast;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
});

test('deve logar como administrador', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn();
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', 'abc123');
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await toast.haveText(message);
});
