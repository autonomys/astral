import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/events')

  await expect(page.getByText('Events')).toBeVisible()
  await expect(page.getByText('Event Id')).toBeVisible()

  await page.getByTestId('testCopyButton-0').click()
  await expect(page.getByText('Hash copied')).toBeVisible()
  await expect(page.getByText('Action')).toBeVisible()
  await expect(page.getByText('Type')).toBeVisible()
  await expect(page.getByText('Time')).toBeVisible()
})
