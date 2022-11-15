import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'


const cache: FastifyPluginCallback = fp((fastify: FastifyInstance, opts: object, done: () => void) => {
  const store = new Map();

  fastify.decorate('addCache', (key: string, value: object)=> {
    store.set(key, value)
    return true;
  })

  fastify.decorate('cache', (key: string)=> {
    return store.get(key)
  })

  done()
})

export default cache;