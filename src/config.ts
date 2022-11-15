const envSchema = {
  type: 'object',
  required: [],
  properties: {
    OPEN_WEATHER_API_KEY: {
      type: 'string',
    },
    OPEN_WEATHER_API_URL: {
      type: 'string'
    }
  }
}

export const envOptions = {
  // confKey: 'config', // optional, default: 'config'
  schema: envSchema,
  // data: data // optional, default: process.env
}