# Season Predictor Api

service to detect season based on geo position

## Quick start

* install *node* and *yarn*. Install yarn using below command.

```sh
npm install -g yarn
```

* clone the repo from the github.

```sh
git clone "git@github.com:iAbhishek91/season-predictor-api.git"
```

* install the required packages

```sh
yarn
```

* quick start the application (refer application environment section for detail information)

```sh
yarn start
```

> * best way to run this application is in docker. Note the Docker file runs the application in production mode.
>   * step-1: build the docker image: `docker build -t season-service .`
>   * step-2: [optional] verify the image file is created: `docker images`
>   * step-3: run the image to form the container: `docker run -i --rm --init -p 1212:1212 --name season-container season-service index.js`

## application environment

we have two mode of this application: dev and production.

* **dev mode:**
  * run with mocks, with out actual integration
  * development and unit testing should be performed on this env.
  * execute the below command for starting the app in dev mode.

```sh
yarn start
```

* **production mode**
  * runs with actual integration with other services.
  * end to end test can be performed in this mode.
  * execute the below command for starting the app in dev mode.

```sh
yarn start:production
```

## Test

* this microservice has 100% unit test coverage.
* also lint test are integrated.

```sh
yarn test
```

## Dependencies

this microservice is a integrates with **temperature-service-api**

## API documentation

refer API documentation: `<hosted-domain>/api/v1/docs`

## Season algorithm

Based on temperature and humidity, season is determined based on the below ficticious algorithm:

* termperature between 0 and 45 degree centigrade and humidity < 50 % - WINTER
* termperature between 46 and 100 degree centigrade and humidity >= 50 % - SUMMER
* termperature between 0 and 45 degree centigrade and humidity > 50 % - AUTUMN
* termperature between 46 and 100 degree centigrade and humidity <= 50 % - SPRING

## TODO

* changelog and history
* contribution guide