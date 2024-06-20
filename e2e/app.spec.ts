import { test, expect } from '@playwright/test'

test('grand prix menu', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('combobox', { name: 'Choose a Grand Prix to view data' }),
  ).toBeVisible()
})

test('grand prix list for current year', async ({ page }) => {
  await page.routeFromHAR('./hars/meetings.har', {
    url: '*/**/v1/meetings?*',
  })

  await page.goto('/')
  await page
    .getByRole('combobox', { name: 'Choose a Grand Prix to view data' })
    .click()
  expect(await page.getByRole('option').count()).toBe(9)
})

test.describe('selected grand prix', () => {
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

  test('grand prix heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'FORMULA 1 CRYPTO.COM MIAMI',
      }),
    ).toBeVisible()
  })

  test('grand prix circuit name', async ({ page }) => {
    await expect(page.getByRole('term').first()).toContainText('Circuit')
    await expect(page.getByRole('definition').first()).toContainText(
      'Miami, United States',
    )
  })

  test('grand prix date', async ({ page }) => {
    await expect(page.getByRole('term').last()).toContainText('Date')
    await expect(page.getByRole('definition').last()).toContainText(
      '3 May 2024',
    )
  })
})

test.describe('results', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./hars/meetings.har', {
      url: '*/**/v1/meetings*',
    })
    await page.routeFromHAR('./hars/sessions.har', {
      url: '*/**/v1/sessions*',
    })
    await page.routeFromHAR('./hars/position.har', {
      url: '*/**/v1/position*',
    })
    await page.routeFromHAR('./hars/drivers.har', {
      url: '*/**/v1/drivers*',
    })
    await page.goto('/')
    await page
      .getByRole('combobox', { name: 'Choose a Grand Prix to view data' })
      .click()
    await page.getByRole('option', { name: 'Miami Grand Prix' }).click()
  })

  test('driver results list', async ({ page }) => {
    await expect(
      page.getByRole('list', { name: 'Grand prix result by driver' }),
    ).toBeVisible()
    expect(
      await page
        .getByRole('list', { name: 'Grand prix result by driver' })
        .getByRole('listitem')
        .count(),
    ).toBe(20)
  })

  test('results are accessible', async ({ page }) => {
    await expect(
      page.getByRole('listitem', {
        name: /Lando Norris finished P1 for McLaren/i,
      }),
    ).toBeVisible()
  })

  test('driver name', async ({ page }) => {
    await expect(
      page
        .getByRole('listitem', {
          name: 'Lando NORRIS finished P1 for McLaren',
        })
        .getByRole('heading', {
          level: 2,
          name: 'Lando NORRIS',
        }),
    ).toBeVisible()
  })

  test('driver finishing position', async ({ page }) => {
    await expect(
      page
        .getByRole('listitem', {
          name: 'Lando NORRIS finished P1 for McLaren',
        })
        .getByText('P1'),
    ).toBeVisible()
  })
  test('positions gained', async ({ page }) => {
    await expect(
      page
        .getByRole('listitem', {
          name: 'Lando NORRIS finished P1 for McLaren',
        })
        .getByLabel('4 positions gained'),
    ).toBeVisible()
  })

  test('positions lost', async ({ page }) => {
    await expect(
      page
        .getByRole('listitem', {
          name: 'Max VERSTAPPEN finished P2 for Red Bull Racing',
        })
        .getByLabel('1 positions lost'),
    ).toBeVisible()
  })

  test('no visible position change', async ({ page }) => {
    const result = await page.getByRole('listitem', {
      name: 'Pierre GASLY finished P12 for Alpine',
    })
    await expect(result).toBeVisible()
    await expect(
      result.getByLabel(/[\d]+ positions [gained|lost]/),
    ).not.toBeVisible()
  })
})
