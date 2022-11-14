import { build } from '../helper'

describe('openWeatherMap tests', () => {
  const app: any = build();

  test('Get temperature of London', async () => {
    app.axios.openWeather = {
      ...app.axios.openWeather,
      get: () => ({
        data: {
          main: {
            temp: 10.52
          }
        }
      })
    }
    const temp = await app.getCityTemperature('London', 'metric')
    expect(temp).toEqual(10.52)
  })

  test('Check weather cache', async () => {
    app.axios.openWeather = {
      ...app.axios.openWeather,
      get: () => ({
        data: {
          main: {
            temp: 10.52
          }
        }
      })
    }

    const city = 'London'
    const units = 'metric'

    const temp = await app.getCityTemperature('London', 'metric')
    const itemCached = app.cache(JSON.stringify({
      city,
      units
    }))

    expect(itemCached).toEqual(temp)
  })
})