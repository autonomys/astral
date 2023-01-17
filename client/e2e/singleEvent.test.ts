import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/#/events/0001231829-000000-35b5c')

  await expect(page.getByRole('heading', { name: 'Event #0001231829-000000-35b5c' })).toBeVisible()

  await expect(page.getByText('Timestamp')).toBeVisible()
  await expect(page.getByText('Block Time')).toBeVisible()
  await expect(page.getByText('Life Time')).toBeVisible()
  await expect(page.getByText('Module')).toBeVisible()
  await expect(page.getByText('Call')).toBeVisible()
  await expect(page.getByText('Balances')).toBeVisible()
  await expect(page.getByText('Result')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Events' })).toBeVisible()
})
