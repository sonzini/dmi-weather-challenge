import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin'


const cache: FastifyPluginCallback = fp((fastify: FastifyInstance, opts: any, done: Function) => {
  const store = new Map();

  fastify.decorate('addCache', (key: String, value: any)=> {
    store.set(key, value)
    return true;
  })

  fastify.decorate('cache', (key: String)=> {
    return store.get(key)
  })

  done()
})

export default cache;