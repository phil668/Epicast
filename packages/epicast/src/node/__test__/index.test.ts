import { expect, it } from 'vitest'

it('add', () => {
  expect(1 + 1).toBe(2)
  expect('map'.slice(1)).toMatchSnapshot('"ap"')
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"')
})
