import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/logs/0001232879-81192-0')
  await expect(page.getByTestId('testJsonDisplay')).toBeVisible()
  // await expect(page.getByText('Type')).toBeVisible()
  await expect(page.getByText('PreRuntime')).toBeVisible()
  await expect(page.getByText('Engine')).toBeVisible()
  await expect(page.getByText('Data')).toBeVisible()
  await page.getByRole('button', { name: 'Events' }).click()
  await page.getByText('voter').click()
  await page
    .getByText('string"0x4ec6486385ced2d6d0e39c9870ce50c98876975c5b5a50e6fdd0c276f4264834"')
    .click()
  await page.getByText('reward').click()
  await page.getByText('"100000000000000000"').click()
})
