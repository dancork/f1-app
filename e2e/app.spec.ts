import { test, expect } from '@playwright/test'

test('has grand prix select', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('combobox', { name: 'Choose a Grand Prix to view data' }),
  ).toBeVisible()
})

test('loads grand prix list', async ({ page }) => {
  await page.routeFromHAR('./hars/meetings.har', {
    url: '*/**/v1/meetings?*',
  })

  await page.goto('/')
  await page
    .getByRole('combobox', { name: 'Choose a Grand Prix to view data' })
    .click()
  expect(await page.getByRole('option').count()).toBe(9)
})

test.describe('select a grand prix', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./hars/meetings.har', {
      url: '*/**/v1/meetings?*',
    })
    await page.goto('/')
    await page
      .getByRole('combobox', { name: 'Choose a Grand Prix to view data' })
      .click()
    await page.getByRole('option', { name: 'Miami Grand Prix' }).click()
    await page.routeFromHAR('./hars/sessions.har', {
      url: '*/**/v1/sessions?*',
    })
    await page.routeFromHAR('./hars/position.har', {
      url: '*/**/v1/position?*',
    })
    await page.routeFromHAR('./hars/drivers.har', {
      url: '*/**/v1/drivers?*',
    })
  })
  test('can select miami grand prix', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'FORMULA 1 CRYPTO.COM MIAMI',
      }),
    ).toBeVisible()
  })
})
