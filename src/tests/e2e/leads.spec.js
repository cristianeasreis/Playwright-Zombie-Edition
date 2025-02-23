// @ts-check
const { test, expect } = require('@playwright/test');
const { LandingPage } = require('../../tests/pages/LandingPage.js');

let landingPage;
test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
});


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Cristiane Araujo Souza Dos Reis', 'cristiane.araujo@gmail.com');
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await landingPage.toastThaveText(message);

});
test('não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Cristiane Araujo Souza Dos Reis', 'cristiane.araujo.com.br');
  await landingPage.alertHaveText('Email incorreto');

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'cristiane.araujo@gmail.com');
  await landingPage.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Cristiane Araujo Souza Dos Reis', '');
  await landingPage.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});

