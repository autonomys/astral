import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/extrinsics', { waitUntil: 'networkidle' })
  await expect(page.getByText('Extrinsic Id')).toBeVisible()
  await expect(page.getByText('Time')).toBeVisible()
  await expect(page.getByText('Status')).toBeVisible()
  await expect(page.getByText('Action')).toBeVisible()
  await expect(page.getByText('Success')).toBeVisible()
  await expect(page.getByText('Block hash')).toBeVisible()
})
