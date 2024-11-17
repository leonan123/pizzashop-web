import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 50000 })

  await page.getByRole('button', { name: 'john doe' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.locator('input[name="name"]').fill('Pizza Teste')
  await page.locator('textarea[name="description"]').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Pizza Teste' })).toBeVisible()
})
