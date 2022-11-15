import weatherService from "../services/weather.service"
import { validUnits } from "../utils"



const getWeatherByCity = async (query, fastify) => {
  const { city, units, tempToCompare } = query

  // DEFAULTS
  let _units = 'metric'
  let _tempToCompare = 15

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

  // Service request
  const temperature = await weatherService.getCityTemperature(city, _units, fastify)

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
}

export default {
  getWeatherByCity
}