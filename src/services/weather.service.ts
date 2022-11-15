const getCityTemperature = (fastify) => async (city: String, units: String) => {
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

    // Get latitude and longitude
    const { data: geoData } = await fastify.getGeoByCity(city)
    const lat = geoData[0].lat
    const lon = geoData[0].lon

    // Get weather
    const { data: weatherData } = await fastify.getWeatherByGeo(lat, lon, units)

    const { temp } = weatherData.main;

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