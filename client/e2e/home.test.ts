import { test, expect } from '@playwright/test'

test('home page has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/subspace explorer/i)
})

test('home page navigation', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Blockchain' }).click()
  await page.getByRole('link', { name: 'Accounts' }).click()

  expect(page.url()).toContain('/accounts')

  await page.getByRole('link', { name: 'Blocks' }).click()
  expect(page.url()).toContain('/blocks')
  await page.getByRole('link', { name: 'Extrinsics' }).click()
  expect(page.url()).toContain('/extrinsics')
  await page.getByRole('link', { name: 'Events' }).click()
  expect(page.url()).toContain('/events')
  await page.getByRole('link', { name: 'Logs' }).click()
  expect(page.url()).toContain('/logs')
  await page.getByRole('link', { name: 'Home' }).click()
  expect(page.url()).toContain('/#/')
})

test('home page info displayed', async ({ page }) => {
  await page.goto('/')

  const extrinsicsElement = await page.getByRole('heading', { name: 'Signed Extrinsics' })
  await expect(extrinsicsElement).toBeVisible()
  const rewardElement = await page.getByRole('heading', { name: 'Qualified Reward Addresses' })
  await expect(rewardElement).toBeVisible()
  const spaceElement = await page.getByRole('heading', { name: 'Total Space Pledged' })
  await expect(spaceElement).toBeVisible()
  const blockElement = await page.getByRole('heading', { name: 'Processed Blocks' })
  await expect(blockElement).toBeVisible()
  const historyElement = await page.getByRole('heading', { name: 'Blockchain History Size' })
  await expect(historyElement).toBeVisible()
})

test('home page search form', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('Search for Block / Account in gemini-3c ...').click()
  await page.getByPlaceholder('Search for Block / Account in gemini-3c ...').fill('442799')
  await page.locator('form').getByRole('button').nth(1).click()

  await expect(page.getByText('Block #442799')).toBeVisible()

  await expect(page.getByText('Timestamp')).toBeVisible()

  await expect(page.getByText('Block Time')).toBeVisible()

  await expect(page.getByText('Parent Hash')).toBeVisible()
  await expect(page.getByText('Extrinsics Root')).toBeVisible()
  await expect(page.getByText('Spec Version')).toBeVisible()
})
