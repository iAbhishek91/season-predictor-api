# Season Predictor Api

service to detect season based on geo position

## Dependencies

this microservice is a depends on **temperature-service-api**

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

* quick start the application

```sh
yarn start
```

> this application is also **containerized**, can be executed using Docker. Just build the Dockerfile and run the image file.

## Test

* this microservice has 100% unit test coverage.
* also lint test are integrated.

```sh
yarn test
```

## API documentation

refer API documentation: `<hosted-domain>/api/v1/docs`

## Season algorithm

Based on temperature and humidity, season is determined based on the below ficticious algorithm:

* termperature between 0 and 45 degree centigrade and humidity < 50 % - AUTUMN
* termperature between 10 and 45 degree centigrade and humidity > 50 % - SPRING

## TODO

* changelog and history
* contribution guide