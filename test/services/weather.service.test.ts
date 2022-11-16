import { FastifyInstance } from 'fastify';
import { build } from '../helper'
import weatherService from "../../src/services/weather.service";
import { getCityTemperatureResponse, getGeoByCityResponse } from './mockResponses';

describe('weather service tests', () => {
  const app: FastifyInstance = build();

  test('getCityTemperature', async () => {
    app.getGeoByCity = jest.fn().mockResolvedValue(getGeoByCityResponse)
    app.getWeatherByGeo = jest.fn().mockResolvedValue(getCityTemperatureResponse)

    const city = 'Rio Cuarto'
    const units = 'metric'

    const temp = await weatherService.getCityTemperature(city, units, app)

    expect(app.getGeoByCity).toHaveBeenCalledTimes(1);
    expect(app.getWeatherByGeo).toHaveBeenCalledTimes(1);
    expect(temp).toEqual(19.87)
  })

  test('getCityTemperature cache', async () => {
    app.getGeoByCity = jest.fn().mockResolvedValue(getGeoByCityResponse)
    app.getWeatherByGeo = jest.fn().mockResolvedValue(getCityTemperatureResponse)

    const city = 'London'
    const units = 'metric'

    await weatherService.getCityTemperature(city, units, app)
    await weatherService.getCityTemperature(city, units, app)

    expect(app.getGeoByCity).toHaveBeenCalledTimes(1);
    expect(app.getWeatherByGeo).toHaveBeenCalledTimes(1);
  })
})