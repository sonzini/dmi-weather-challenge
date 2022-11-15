import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import weatherController from "../../controllers/weather.controller"

type WeatherRequest = FastifyRequest<{
  Querystring: {
    tempToCompare: string,
    units: string,
    city: string,
  }
}>

const weather: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', (request: WeatherRequest, reply: FastifyReply) => {
    try {
      return weatherController.getWeatherByCity(request.query, fastify)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      reply.badRequest(error.message)
    }
  })
}

export default weather