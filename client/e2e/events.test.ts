import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/events', { waitUntil: 'networkidle' })

  await expect(page.getByText('Events')).toBeVisible()
  await expect(page.getByText('Event Id')).toBeVisible()
  await expect(page.getByText('Action')).toBeVisible()
  await expect(page.getByText('Type')).toBeVisible()
  await expect(page.getByText('Time')).toBeVisible()
})
