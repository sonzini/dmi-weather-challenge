import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async () => {
    return { root: true }
  })

  fastify.get('/ping', async () => {
    return 'pong'
  })
}

export default root;
