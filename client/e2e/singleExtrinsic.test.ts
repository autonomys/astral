import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/extrinsics/0001232359-000006-152c6')

  await expect(page.getByRole('heading', { name: 'Extrinsic #1232359-27' })).toBeVisible()
  await expect(page.getByText('Timestamp')).toBeVisible()
  await expect(page.getByText('Block Time')).toBeVisible()
  await expect(page.getByText('Hash')).toBeVisible()
  await expect(page.getByText('Module')).toBeVisible()
  await expect(page.getByText('Call')).toBeVisible()
  await expect(page.getByText('01 Dec 2022 | 20:13:29(-04:00)')).toBeVisible()
  await expect(page.getByText('a month')).toBeVisible()
  await expect(page.getByTestId('testJsonDisplay')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Events' })).toBeVisible()
})
