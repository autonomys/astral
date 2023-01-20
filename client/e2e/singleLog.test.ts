import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/logs/0001232879-81192-0')
  await expect(page.getByTestId('testJsonDisplay')).toBeVisible()
  await expect(page.getByText('PreRuntime')).toBeVisible()
  await expect(page.getByText('Engine')).toBeVisible()
  await expect(page.getByText('Data')).toBeVisible()
})
