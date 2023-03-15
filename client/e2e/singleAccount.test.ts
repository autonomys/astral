import { test, expect } from '@playwright/test'

test('data show', async ({ page }) => {
  await page.goto('/#/accounts')

  await page.getByTestId('account-link-0').click()

  await expect(page.getByText('Public key')).toBeVisible()

  await expect(page.getByText('Account index')).toBeVisible()
  await expect(page.getByText('Nonce')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Balance 0' })).toBeVisible()
  await page.locator('div:nth-child(2) > .font-medium').first().click()

  await expect(page.getByText('Transferable')).toBeVisible()
  await expect(page.getByText('Received')).toBeVisible()
  await expect(page.getByText('Election')).toBeVisible()
  await expect(page.getByText('Unbounding')).toBeVisible()
  await expect(page.getByText('Vesting')).toBeVisible()
  await expect(page.getByText('Other')).toBeVisible()
  await expect(page.getByText('Democracy')).toBeVisible()
})
