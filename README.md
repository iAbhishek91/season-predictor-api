# Season Predictor API

service to detect season based on geo position

## Table of contents

* [Dependencies](#Dependencies)
* [Quick start](#Quick-start)
* [Application environment](#Application-environment)
* [Unit test](#Unit-test)
  * [Unit test reports](#Unit-test-reports)
* [Integration test](#Integration-test)
  * [Integration test reports](#Integration-test-reports)
* [API documentation](#API-documentation)
* [Season algorithm](#Season-algorithm)

## Dependencies

this service integrates with

* [temperature-service-api](https://github.com/iAbhishek91/temperature-service-api)

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

> * best way to run this application is in docker. Note the Docker file runs the application in test mode. more detail below.

## Application environment

we have two mode of this application: *dev* and *test*.

* **dev mode:**
  * run with [mocks](#Mocks), without actual integration
  * development and unit testing should be performed on this env.
  * execute the below command for starting the app in dev mode.
  * post used: 2424

```sh
yarn start
```

* **test mode**
  * runs with actual integration with other services.
  * end to end test can be performed in this mode.
  * execute the below command for starting the app in dev mode.
  * port used: 1212

```sh
yarn start:test
```

alternatively, using docker

```sh
# from the root folder of season-predictor-api
docker build -t season-service .
# from the root folder of temperature-service-api
docker build -t temperature-service .
# from the root folder of season-predictor-api
docker-compose up
```

## Unit test

* this microservice has 100% unit test coverage.
* also lint test are integrated.

```sh
yarn test
```

### Unit test reports

post execution of unit test, following reports are generated.

* **coverage report**: available at `./coverage/Icov-report/index.html`.
* **unit test report**: avialble at `./unitTestResult.html`

## Integration test

>NOTE: integration test runs on test mode of the app because dev environment runs on Mock.
>Pre requisits: start both the service in docker. To start app under test mode under, refer section[Application environment](#Application-environment)

* all out integration tests are in `./test` folder.

```sh
yarn test:integration
```

### Integration test reports

post execution of integration test, following reports are generated.

* **integration test report**: avialble at `./integrationTestResult.html`

## API documentation

refer API documentation: `<hosted-domain>/api/v1/docs`

## Season algorithm

based on temperature and humidity, season is determined based on the below ficticious algorithm:

* termperature between 0 and 45 degree centigrade and humidity < 50 % - WINTER
* termperature between 46 and 100 degree centigrade and humidity >= 50 % - SUMMER
* termperature between 0 and 45 degree centigrade and humidity > 50 % - AUTUMN
* termperature between 46 and 100 degree centigrade and humidity <= 50 % - SPRING

## Mocks

in this app we use different types of mock to facilitate development and unit testing.

* **module mocks:** axios module is mocked on global level for unit testing.
* **service mocks:** we have custom mock server built-in which stubs `temperature-service-api`. Hence we can easily develop in isolation.

>NOTE: mocks only works in *development* environment.