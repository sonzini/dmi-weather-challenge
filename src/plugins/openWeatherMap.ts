import { FastifyInstance, FastifyPluginCallback, FastifyServerOptions } from 'fastify'
import fp from 'fastify-plugin'

const openWeatherMap: FastifyPluginCallback = fp((fastify: FastifyInstance, opts: FastifyServerOptions, done: () => void) => {
  const { OPEN_WEATHER_API_KEY } = fastify.config

  const getWeatherByCity = (city: string, units: string) => {
    return fastify.axios.openWeather.get(`/data/2.5/weather?q=${city}&units=${units === 'kelvin' ? '' : units}&appid=${OPEN_WEATHER_API_KEY}`)
  }

  const getWeatherByGeo = (lat: number, lon: number, units: string) => {
    return fastify.axios.openWeather.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units === 'kelvin' ? '' : units}&appid=${OPEN_WEATHER_API_KEY}`)
  }

  const getGeoByCity = (city: string) => {
    return fastify.axios.openWeather.get(`/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_API_KEY}`)
  }

  fastify.decorate('getWeatherByCity', getWeatherByCity)
  fastify.decorate('getWeatherByGeo', getWeatherByGeo)
  fastify.decorate('getGeoByCity', getGeoByCity)

  done()
})

export default openWeatherMap;