// import fp from 'fastify-plugin'
import { Http2ServerResponse } from 'http2';
import { Axios } from 'axios'

// When using .decorate you have to specify added properties for Typescript
interface IConfig {
  OPEN_WEATHER_API_KEY: string;
  OPEN_WEATHER_API_URL: string;
}

interface IAxios {
  openWeather: Axios
}
declare module 'fastify' {
  export interface FastifyInstance {
    config: IConfig;
    axios: IAxios;
    getWeatherByCity(): Promise<Http2ServerResponse>
    getWeatherByGeo(): Promise<Http2ServerResponse>
    getGeoByCity(): Promise<Http2ServerResponse>
    cache(k: string): void
    addCache(k: string, v: string): void
  }
}
