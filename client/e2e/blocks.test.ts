import { test, expect } from '@playwright/test'

test('data show', async ({ page }) => {
  await page.goto('/#/blocks')

  await expect(page.getByText('Blocks')).toBeVisible()
  await expect(page.getByText('Block').nth(2)).toBeVisible()
  await expect(page.getByText('Time')).toBeVisible()
  await expect(page.getByText('Status')).toBeVisible()
  await expect(page.getByText('Extrinsics')).toBeVisible()
  await expect(page.getByText('Events')).toBeVisible()
  await expect(page.getByText('Block hash')).toBeVisible()

  // await page.getByTestId('testCopy-0').click()

  // await expect(page.getByText('Hash copied')).toBeVisible()
})
