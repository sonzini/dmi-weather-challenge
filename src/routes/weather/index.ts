import { FastifyPluginAsync } from "fastify"
import weatherController from "../../controllers/weather.controller"

const weather: FastifyPluginAsync = async (fastify: any, opts: any) => {
  fastify.get('/', weatherController.getWeatherByCity(fastify))
}

export default weather