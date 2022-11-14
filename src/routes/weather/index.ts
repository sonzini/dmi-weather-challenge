import { FastifyPluginAsync, FastifyRequest } from "fastify"
import { validUnits } from "../../utils"

type WeatherRequest = FastifyRequest<{
  Querystring: {
    tempToCompare: String,
    units: string,
    city: String,
  }
}>

const weather: FastifyPluginAsync = async (fastify: any, opts: any) => {
  fastify.get('/', async (request: WeatherRequest) => {
    const { query } = request

    if (query.tempToCompare && isNaN(+query.tempToCompare)) {
      throw new Error('tempToCompare should be a number. Please read the documentation and try again.')
    }

    const tempToCompare = +query.tempToCompare || 15
    const units = query.units === 'kelvin' ? 'kelvin' : (query.units || 'metric')
    const city = query.city

    if (!validUnits.includes(units)) {
      throw new Error('Units invalid. Try "metric" (default), "imperial" or "kelvin"')
    }

    if (!city) {
      throw new Error('City is missing. Please read the documentation and try again.')
    }

    const temperature = await fastify.getCityTemperature(city, units)

    return {
      city,
      temperature,
      units,
      comparison: {
        tempToCompare,
        isGreater: temperature > tempToCompare,
        isLess: temperature < tempToCompare,
      }
    }
  })
}

export default weather