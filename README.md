## Description

Rest Api Boilerplate using [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy

## Deploy with PM2 only
This is the recommended way to deploy the app, because it's more lightweight.
More infos about PM2 [here](https://github.com/nestjs/nest).

```bash
# install pm2
$ npm install pm2 -g

# build app
$ npm run build

# run app
$ pm2 start process.yml
```
## Deploy with Docker

```bash
# build image
$ docker build -t <your username>/api .

# run image
$ docker run -p 80:3000 -d <your username>/api
```
