import { test, expect } from '@playwright/test'
import { EXTERNAL_ROUTES } from 'common/routes'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/subspace explorer/i)
})

test('navigation', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Blockchain' }).click()
  await page.getByRole('link', { name: 'Accounts' }).click()

  await expect(page).toHaveURL('/#/accounts')

  await page.getByRole('link', { name: 'Blocks' }).click()
  await expect(page).toHaveURL('/#/blocks')
  await page.getByRole('link', { name: 'Extrinsics' }).click()
  await expect(page).toHaveURL('/#/extrinsics')
  await page.getByRole('link', { name: 'Events' }).click()
  await expect(page).toHaveURL('/#/events')
  await page.getByRole('link', { name: 'Logs' }).click()
  await expect(page).toHaveURL('/#/logs')
  await page.getByRole('link', { name: 'Home' }).click()
  await expect(page).toHaveURL('/#/')
})

test('external links', async ({ page }) => {
  await page.goto('/')

  const page1Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Forum' }).click()
  const page1 = await page1Promise
  await expect(page1).toHaveURL(EXTERNAL_ROUTES.forum)
  const page2Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Docs' }).click()
  const page2 = await page2Promise
  await expect(page2).toHaveURL(EXTERNAL_ROUTES.docs)
  const page3Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Website' }).click()
  const page3 = await page3Promise
  await expect(page3).toHaveURL(EXTERNAL_ROUTES.subspace)
  const page4Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Twitter' }).click()
  const page4 = await page4Promise
  await expect(page4).toHaveURL(EXTERNAL_ROUTES.social.twitter)
  const page5Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Discord' }).click()
  const page5 = await page5Promise
  await expect(page5).toHaveURL('https://discord.com/invite/subspace-network')
  const page6Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Telegram' }).click()
  const page6 = await page6Promise
  await expect(page6).toHaveURL(EXTERNAL_ROUTES.social.telegram)
  const page7Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Github' }).click()
  const page7 = await page7Promise
  await expect(page7).toHaveURL(EXTERNAL_ROUTES.social.github)
  const page8Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Reddit' }).click()
  const page8 = await page8Promise
  await expect(page8).toHaveURL(EXTERNAL_ROUTES.social.reddit)
  const page9Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Medium' }).click()
  const page9 = await page9Promise
  await expect(page9).toHaveURL(EXTERNAL_ROUTES.social.medium)
  const page10Promise = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Youtube' }).click()
  const page10 = await page10Promise
  const page11Promise = page.waitForEvent('popup')
  await expect(page10).toHaveURL(EXTERNAL_ROUTES.social.youtube)
  await page.getByRole('link', { name: 'LinkedIn' }).click()
  const page11 = await page11Promise
  await expect(page11).toHaveURL(EXTERNAL_ROUTES.social.linkedin)
})

test('shows info', async ({ page }) => {
  await page.goto('/')

  const archivedBlockElement = await page.getByRole('heading', { name: 'Archived Block' })
  await expect(archivedBlockElement).toBeVisible()
  const extrinsicsElement = await page.getByRole('heading', { name: 'Signed Extrinsics' })
  await expect(extrinsicsElement).toBeVisible()
  const rewardElement = await page.getByRole('heading', { name: 'Qualified Reward Addresses' })
  await expect(rewardElement).toBeVisible()
  const spaceElement = await page.getByRole('heading', { name: 'Total Space Pledged' })
  await expect(spaceElement).toBeVisible()
  const blockElement = await page.getByRole('heading', { name: 'Best Block' })
  await expect(blockElement).toBeVisible()
  const historyElement = await page.getByRole('heading', { name: 'Blockchain History Size' })
  await expect(historyElement).toBeVisible()
})

// test('table links', async ({ page }) => {
//   await page.goto('/')

//   await page.getByTestId('testLinkBlocks').click()
//   await expect(page).toHaveURL('/#/blocks')

//   await page.goto('/')
//   await page.getByTestId('testLinkExtrinsics').click()
//   await expect(page).toHaveURL('/#/extrinsics')
// })

test('search form', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('Search for Block / Account ...').click()
  await page.getByPlaceholder('Search for Block / Account ...').fill('1228449')
  await page.locator('form').getByRole('button').nth(1).click()
  await expect(page).toHaveURL('/#/blocks/1228449')
})
