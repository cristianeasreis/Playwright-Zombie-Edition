const { test, expect } = require('../support');

test('deve logar como administrador', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('admin@zombieplus.com', 'abc123');
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.popup.haveText(message);
});

test('não deve logar quando o email  é Invalido', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('adminzombieplus.com', 'abc123');
    await page.login.alertHaveText('Email incorreto');
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('', 'abc123');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('admin@zombieplus.com', '');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.Visit();
    await page.login.submit('', '');
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
})