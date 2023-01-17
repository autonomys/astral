import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/logs')

  await expect(page.getByText('Logs')).toBeVisible()
  await expect(page.getByText('Log Index')).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Block' }).getByText('Block')).toBeVisible()
  await expect(page.getByText('Type')).toBeVisible()
  await expect(page.getByText('Engine')).toBeVisible()
  await expect(page.getByText('Data')).toBeVisible()
  await expect(page.getByText('Type')).toBeVisible()
  await expect(page.getByText('PreRuntime')).toBeVisible()
  await page.getByRole('cell', { name: '0001232879-81192-0' }).getByRole('button').click()
  await page
    .getByRole('row', { name: '0001232879-81192-0 1232879 PreRuntime' })
    .getByRole('cell', { name: '1232879' })
    .nth(1)
    .click()
  await page
    .getByRole('row', { name: '0001232879-81192-0 1232879 PreRuntime' })
    .getByRole('cell', { name: 'PreRuntime' })
    .click()
})
