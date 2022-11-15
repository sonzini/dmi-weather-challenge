const getCityTemperature = (fastify) => async(city: String, units: String) => {
  try {
    const storeKey = JSON.stringify({
      city,
      units
    })

    // Check cache and return if exists
    const storedData = fastify.cache(storeKey)
    if (storedData) {
      return storedData
    }

    // Call plugin
    const response = await fastify.getWeatherByCity(city, units)
    const { temp } = response.main;

    // Store data in cache
    fastify.addCache(storeKey, temp)

    return temp
  } catch (error) {
    console.log(error)
    throw new Error('No data found. Check the city name.')
  }
}

export default {
  getCityTemperature
}