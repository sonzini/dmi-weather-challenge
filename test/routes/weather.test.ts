import { build } from '../helper'

describe('weather tests', () => {
  const app: any = build();


  test('with minimum params', async () => {
    app.getCityTemperature = jest.fn(() => 19.87)

    const res = await app.inject({
      url: '/weather?city=Rio Cuarto'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 19.87,
      "units": "metric",
      "comparison": {
        "tempToCompare": 15,
        "isGreater": true,
        "isLess": false
      }
    })
  })

  test('with kelvin units', async () => {
    app.getCityTemperature = jest.fn(() => 293.02)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=kelvin'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 293.02,
      "units": "kelvin",
      "comparison": {
        "tempToCompare": 15,
        "isGreater": true,
        "isLess": false
      }
    })
  })

  test('with imperial units', async () => {
    app.getCityTemperature = jest.fn(() => 67.77)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=imperial'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 67.77,
      "units": "imperial",
      "comparison": {
        "tempToCompare": 15,
        "isGreater": true,
        "isLess": false
      }
    })
  })

  test('with comparison decimal', async () => {
    app.getCityTemperature = jest.fn(() => 19.87)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=metric&tempToCompare=30.01'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 19.87,
      "units": "metric",
      "comparison": {
        "tempToCompare": 30.01,
        "isGreater": false,
        "isLess": true
      }
    })
  })

  test('with comparison greater', async () => {
    app.getCityTemperature = jest.fn(() => 19.87)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=metric&tempToCompare=30'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 19.87,
      "units": "metric",
      "comparison": {
        "tempToCompare": 30,
        "isGreater": false,
        "isLess": true
      }
    })
  })

  test('with comparison equal', async () => {
    app.getCityTemperature = jest.fn(() => 19.87)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=metric&tempToCompare=19.87'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 19.87,
      "units": "metric",
      "comparison": {
        "tempToCompare": 19.87,
        "isGreater": false,
        "isLess": false
      }
    })
  })

  test('with comparison lower', async () => {
    app.getCityTemperature = jest.fn(() => 19.87)
    
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=metric&tempToCompare=16'
    })
    expect(JSON.parse(res.payload)).toEqual({
      "city": "Rio Cuarto",
      "temperature": 19.87,
      "units": "metric",
      "comparison": {
        "tempToCompare": 16,
        "isGreater": true,
        "isLess": false
      }
    })
  })

  test('invalid unit', async () => {
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&units=xxx'
    })
    expect(JSON.parse(res.payload).message).toEqual('Units invalid. Try "metric" (default), "imperial" or "kelvin"')
  })

  test('without city name', async () => {
    const res = await app.inject({
      url: '/weather'
    })
    expect(JSON.parse(res.payload).message).toEqual('City is missing. Please read the documentation and try again.')
  })

  test('invalid tempToCompare', async () => {
    const res = await app.inject({
      url: '/weather?city=Rio Cuarto&tempToCompare=hello'
    })
    expect(JSON.parse(res.payload).message).toEqual('tempToCompare should be a number. Please read the documentation and try again.')
  })
})