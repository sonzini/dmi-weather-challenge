/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';
import weatherController from '../../src/controllers/weather.controller';
import weatherService from '../../src/services/weather.service';
import { build } from '../helper'

describe('weather tests', () => {
  const app: FastifyInstance = build();

  test('with minimum params', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto' }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(19.87)
    expect(res.units).toEqual("metric")
    expect(res.comparison.tempToCompare).toEqual(15)
    expect(res.comparison.isGreater).toBeTruthy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('with metric units', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', units: 'metric' }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(19.87)
    expect(res.units).toEqual("metric")
    expect(res.comparison.tempToCompare).toEqual(15)
    expect(res.comparison.isGreater).toBeTruthy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('with kelvin units', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(293.02)
    const query = { city: 'Rio Cuarto', units: 'kelvin' }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(293.02)
    expect(res.units).toEqual("kelvin")
    expect(res.comparison.tempToCompare).toEqual(15)
    expect(res.comparison.isGreater).toBeTruthy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('with imperial units', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(67.77)
    const query = { city: 'Rio Cuarto', units: 'imperial' }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(67.77)
    expect(res.units).toEqual("imperial")
    expect(res.comparison.tempToCompare).toEqual(15)
    expect(res.comparison.isGreater).toBeTruthy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('with comparison greater', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', tempToCompare: 30 }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(19.87)
    expect(res.units).toEqual("metric")
    expect(res.comparison.tempToCompare).toEqual(30)
    expect(res.comparison.isGreater).toBeFalsy()
    expect(res.comparison.isLess).toBeTruthy()
  })

  test('with comparison equal', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', tempToCompare: 19.87 }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(19.87)
    expect(res.units).toEqual("metric")
    expect(res.comparison.tempToCompare).toEqual(19.87)
    expect(res.comparison.isGreater).toBeFalsy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('with comparison lower', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', tempToCompare: 16 }

    const res = await weatherController.getWeatherByCity(query, app)

    expect(res.city).toEqual("Rio Cuarto")
    expect(res.temperature).toEqual(19.87)
    expect(res.units).toEqual("metric")
    expect(res.comparison.tempToCompare).toEqual(16)
    expect(res.comparison.isGreater).toBeTruthy()
    expect(res.comparison.isLess).toBeFalsy()
  })

  test('invalid unit', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', units: 'invalid_unit' }

    try {
      await weatherController.getWeatherByCity(query, app)
    } catch (error: any) {
      expect(error.message).toEqual('Units invalid. Try "metric" (default), "imperial" or "kelvin"')
    }
  })

  test('without city name', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = {}

    try {
      await weatherController.getWeatherByCity(query, app)
    } catch (error: any) {
      expect(error.message).toEqual('City is missing. Please read the documentation and try again.')
    }
  })

  test('invalid tempToCompare', async () => {
    weatherService.getCityTemperature = jest.fn().mockResolvedValue(19.87)
    const query = { city: 'Rio Cuarto', tempToCompare: 'invalid_temp' }

    try {
      await weatherController.getWeatherByCity(query, app)
    } catch (error: any) {
      expect(error.message).toEqual('tempToCompare should be a number. Please read the documentation and try again.')
    }
  })
})