import { FastifyReply, FastifyRequest } from "fastify"
import weatherService from "../services/weather.service"
import { validUnits } from "../utils"

type WeatherRequest = FastifyRequest<{
  Querystring: {
    tempToCompare: String,
    units: string,
    city: String,
  }
}>

const getWeatherByCity = (fastify) => async (request: WeatherRequest, reply: FastifyReply) => {
  let { city, units, tempToCompare } = request.query

  // DEFAULTS
  let _units = 'metric'
  let _tempToCompare = 15

  try {
    // VALIDATION & ASSIGN
    if (!city) {
      throw new Error('City is missing. Please read the documentation and try again.')
    }

    if (units) {
      if (!validUnits.includes(units)) {
        throw new Error('Units invalid. Try "metric" (default), "imperial" or "kelvin"')
      } else {
        _units = units
      }
    } 

    if (tempToCompare) {
      if (isNaN(+tempToCompare)) {
        throw new Error('tempToCompare should be a number. Please read the documentation and try again.')
      } else {
        _tempToCompare = +tempToCompare
      }
    }
  } catch (error: any) {
    reply.badRequest(error.message)
  }

  try {
    // Service request
    const temperature = await weatherService.getCityTemperature(fastify)(city, units)
  
    // Format data
    return {
      city,
      temperature,
      units: _units,
      comparison: {
        tempToCompare: _tempToCompare,
        isGreater: temperature > _tempToCompare,
        isLess: temperature < _tempToCompare,
      }
    }
  } catch (error: any) {
    reply.badGateway(error.message)
  }


}

export default {
  getWeatherByCity
}