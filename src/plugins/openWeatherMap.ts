import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const openWeatherMap: FastifyPluginCallback = fp((fastify: any, opts: any, done: Function) => {
  const getWeatherByCity = async (city: String, units: String) => {
    const {
      data
    } = await fastify.axios.openWeather.get(`/data/2.5/weather?q=${city}&units=${units === 'kelvin' ? '' : units}&appid=${fastify.config.OPEN_WEATHER_API_KEY}`)
    return data
  }

  fastify.decorate('getWeatherByCity', getWeatherByCity)

  done()
})

export default openWeatherMap;