import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/logs')

  await page.getByTestId('log-link-0').click()

  await expect(page.getByTestId('testJsonDisplay')).toBeVisible()
  await expect(page.getByText('PreRuntime')).toBeVisible()
  await expect(page.getByText('Engine')).toBeVisible()
  await expect(page.getByText('Data')).toBeVisible()
})
