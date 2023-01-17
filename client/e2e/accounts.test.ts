import { test, expect } from '@playwright/test'

test('info display', async ({ page }) => {
  await page.goto('/#/accounts')

  const holderElement = await page.getByText('Holders')
  await expect(holderElement).toBeVisible()

  // table titles
  const rankColum = await page.getByText('Rank')
  await expect(rankColum).toBeVisible()
  const accountColum = await page.getByText('Account')
  await expect(accountColum).toBeVisible()
  const extrinsicColum = await page.getByText('Extrinsics')
  await expect(extrinsicColum).toBeVisible()
  const lockedColum = await page.getByText('Locked (TSSC)')
  await expect(lockedColum).toBeVisible()
  const balanceColum = await page.getByText('Balance (TSSC)')
  await expect(balanceColum).toBeVisible()
})

test('link to account page', async ({ page }) => {
  await page.goto('/#/accounts')

  await page.getByTestId('testAccountLink-0').click()

  await expect(page.url()).toContain('/#/accounts/')
})
