# DMI Coding Challenge by Jorge Mariel

This project was created to demonstrate my knowledge in JS. 

The challenge consist in creating an endpoint with [Fastify Framework](https://www.fastify.io/) that allow us to check the temperature of a city (eg. Rio Cuarto) using [Open Weather Map](https://openweathermap.org/current) and check if it is lower or greater than 15°.

## Available Scripts

before running any script remember installing all dependencies running

```
npm install
```

### To start the development mode:
```
npm run dev
```

Open the browser in [http://localhost:3000](http://localhost:3000) to view it.

### To start the production mode:
```
npm start
```

### To run the test cases.
```
npm run test
```


## Usage of weather endpoint

URL: [/weather?city=Rio%20Cuarto&units=metric&tempToCompare=15](http://localhost:3000/weather?city=Rio%20Cuarto&units=metric&tempToCompare=15)

### Query Params:
* city: City Name
* tempToCompare [optional]: The temperature you want to compare with. By default is 15°. Remember to put just the unit
* units [optional]: Temperature is available in Fahrenheit, Celsius and Kelvin units.
  * For temperature in Celsius use units=metric (default)
  * For temperature in Fahrenheit use units=imperial
  * For temperature in Kelvin use units=kelvin

### Response example:
```
{
    "city": "Rio Cuarto",
    "temperature": 27.57,
    "units": "metric",
    "comparison": {
        "tempToCompare": 15,
        "isGreater": true,
        "isLess": false
    }
}
```