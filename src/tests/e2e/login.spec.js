const { test, expect } = require('@playwright/test');
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

test('deve logar como administrador', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', 'abc123');
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await toast.containText(message);
});

test('não deve logar quando o email  é Invalido', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('adminzombieplus.com', 'abc123');
    await loginPage.alertHaveText('Email incorreto');
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('', 'abc123');
    await loginPage.alertHaveText('Campo obrigatório');
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('admin@zombieplus.com', '');
    await loginPage.alertHaveText('Campo obrigatório');
});

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.Visit();
    await loginPage.submit('', '');
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
})