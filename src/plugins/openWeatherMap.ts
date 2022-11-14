import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const openWeatherMap: FastifyPluginCallback = fp((fastify: any, opts: any, done: Function) => {
  const getCityTemperature = async (city: String, units: String) => {
    try {
      const storeKey = JSON.stringify({
        city,
        units
      })
      const storedData = fastify.cache(storeKey)
      if (storedData) {
        return storedData
      }

      const {
        data
      } = await fastify.axios.openWeather.get(`/data/2.5/weather?q=${city}&units=${units === 'kelvin' ? '' : units}&appid=${fastify.config.OPEN_WEATHER_API_KEY}`)

      const { temp } = data.main;
      fastify.addCache(storeKey, temp)
      return temp
    } catch (error) {
      console.log(error)
      throw new Error('No data found. Check the city name.')
    }
  }

  fastify.decorate('getCityTemperature', getCityTemperature)

  done()
})

export default openWeatherMap;