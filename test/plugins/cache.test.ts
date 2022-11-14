import { build } from '../helper'

describe('cache tests', () => {
  const app: any = build();

  test('Is saving', async () => {
    const key = 'key to test'
    const data = 'value to store'

    app.addCache(key, data)

    const cachedData = app.cache(key)
    expect(cachedData).toEqual(data)
  })
})