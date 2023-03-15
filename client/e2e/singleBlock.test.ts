import { test, expect } from '@playwright/test'

test('data show', async ({ page }) => {
  await page.goto('/#/blocks')

  await page.getByTestId('block-link-0').click()

  await expect(page.getByText('Timestamp')).toBeVisible()

  await expect(page.getByText('Block Time')).toBeVisible()

  await expect(page.getByText('Parent Hash')).toBeVisible()
  await expect(page.getByText('Extrinsics Root')).toBeVisible()
  await expect(page.getByText('Spec Version')).toBeVisible()
})
