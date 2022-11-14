import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async(request, reply) => {
    return { root: true }
  })

  fastify.get('/ping', async(request, reply) => {
    return 'pong'
  })
}

export default root;
