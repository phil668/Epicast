import { expect, test } from '@playwright/test'

const SITE_URL = 'http://localhost:5173'

test('test page render', async ({ page }) => {
  await page.goto(SITE_URL)
  const res = await page.evaluate(async () => {
    const pageContent = document.body.textContent
    return pageContent?.includes('This is Layout Component')
  })
  expect(res).toBe(true)
})
