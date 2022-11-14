const OPEN_WEATHER_URL = 'https://api.openweathermap.org'

export const validUnits = ['metric', 'imperial', 'kelvin']

const envSchema = {
  type: 'object',
  required: [],
  properties: {
    OPEN_WEATHER_API_KEY: {
      type: 'string',
    }
  }
}

export const envOptions = {
  // confKey: 'config', // optional, default: 'config'
  schema: envSchema,
  // data: data // optional, default: process.env
}

export const axiosOptions = {
  clients: {
    openWeather: {
      baseURL: OPEN_WEATHER_URL
    }
  }
}