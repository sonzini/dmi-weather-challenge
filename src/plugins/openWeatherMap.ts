import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const openWeatherMap: FastifyPluginCallback = fp((fastify: any, opts: any, done: Function) => {
  const { OPEN_WEATHER_API_KEY } = fastify.config

  const getWeatherByCity = (city: String, units: String) => {
    return fastify.axios.openWeather.get(`/data/2.5/weather?q=${city}&units=${units === 'kelvin' ? '' : units}&appid=${OPEN_WEATHER_API_KEY}`)
  }

  const getWeatherByGeo = (lat: Number, lon: Number, units: String) => {
    return fastify.axios.openWeather.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units === 'kelvin' ? '' : units}&appid=${OPEN_WEATHER_API_KEY}`)
  }

  const getGeoByCity = (city: String) => {
    return fastify.axios.openWeather.get(`/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_API_KEY}`)
  }

  fastify.decorate('getWeatherByCity', getWeatherByCity)
  fastify.decorate('getWeatherByGeo', getWeatherByGeo)
  fastify.decorate('getGeoByCity', getGeoByCity)

  done()
})

export default openWeatherMap;