// @ts-check
import { test, expect } from '@playwright/test';


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // await page.click('//button["Aperte o play... se tiver coragem"]') // forma de utilizar xml
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  //checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Cristiane Araujo Souza Dos Reis');
  await page.getByPlaceholder('Seu email principal').fill('cristianeara628@gmail.com');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await expect(page.locator('.toast')).toHaveText(message);

  await expect(page.locator('.toast')).toBeVisible({ timeout: 5000 });

});
test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // await page.click('//button["Aperte o play... se tiver coragem"]') // forma de utilizar xml
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  //checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Cristiane Araujo Souza Dos Reis');
  await page.getByPlaceholder('Seu email principal').fill('cristianeara.com.br');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Email incorreto');

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // await page.click('//button["Aperte o play... se tiver coragem"]') // forma de utilizar xml
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  //checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu email principal').fill('cristianeara628@gmail.com.br');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // await page.click('//button["Aperte o play... se tiver coragem"]') // forma de utilizar xml
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  //checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByPlaceholder('Seu nome completo').fill('Cristiane Araujo Souza Dos Reis');


  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório');

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // await page.click('//button["Aperte o play... se tiver coragem"]') // forma de utilizar xml
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  //checkpoint 
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]);
  

});

