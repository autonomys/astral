import { test, expect } from '@playwright/test'

test('data show', async ({ page }) => {
  await page.goto('/#/accounts/0x14682f9dea76a4dd47172a118eb29b9cf9976df7ade12f95709a7cd2e3d81d6c')

  await expect(
    page.getByText('0x14682f9dea76a4dd47172a118eb29b9cf9976df7ade12f95709a7cd2e3d81d6c'),
  ).toBeVisible()

  await expect(page.getByText('Public key')).toBeVisible()

  await expect(page.getByText('Account index')).toBeVisible()
  await expect(page.getByText('Nonce')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Balance 0' })).toBeVisible()
  await page.locator('div:nth-child(2) > .font-medium').first().click()

  await expect(page.getByText('Transferable')).toBeVisible()
  await expect(page.getByText('Received')).toBeVisible()
  await expect(page.getByText('Election')).toBeVisible()
  // await expect(page.getByText('Stacking')).toBeVisible()
  await expect(page.getByText('Unbounding')).toBeVisible()
  await expect(page.getByText('Vesting')).toBeVisible()
  await expect(page.getByText('Other')).toBeVisible()
  await expect(page.getByText('Democracy')).toBeVisible()
})
