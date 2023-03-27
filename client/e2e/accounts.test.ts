import { test, expect } from '@playwright/test'

test('accounts info displayed', async ({ page }) => {
  await page.goto('/#/accounts')

  const holderElement = page.getByText('Holders')
  await expect(holderElement).toBeVisible()

  // table titles
  const rankColum = page.getByText('Rank')
  await expect(rankColum).toBeVisible()
  const accountColum = page.getByText('Account')
  await expect(accountColum).toBeVisible()
  const extrinsicColum = page.getByText('Extrinsics')
  await expect(extrinsicColum).toBeVisible()
  const lockedColum = page.getByText('Locked (TSSC)')
  await expect(lockedColum).toBeVisible()
  const balanceColum = page.getByText('Balance (TSSC)')
  await expect(balanceColum).toBeVisible()
})

test('link to account page', async ({ page }) => {
  await page.goto('/#/accounts')

  await page.getByTestId('account-link-0').click()

  expect(page.url()).toContain('/accounts/')
})
