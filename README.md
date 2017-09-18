# kladovka

Optimizer of inventory for games

## Docker

Recommended way to run this app is via Docker-CE
https://docs.docker.com/engine/installation/

The workflow for developers should be like so:

- `docker-compose up` in one terminal
- in another terminal, `docker-compose exec dev bash`
- execute all other commands from this readme inside docker container. First terminal (with `docker-compose up`) should display logs.

If you need to clean everything, do `docker-compose stop && docker-compose rm -f`

## Windows

Start-up scripts are Linux-dependent so they won't work on Windows unless used within Docker.

Nevertheless, the app itself should run fine on Windows if you install all dependencies by yourself and run the app with Win-compatible launch scripts (which are not present in the repo).

## Install required modules

```bat
npm install
npm run deps
```

## Configuration

Default configuration values are located at `config/config-default.json`.

If you want to override values in it, you need to define environment variable
with same name but prefixed with `KL`.

For example, if you want to redefine `DB_URL`, you need to set `KL_DB_URL` env
variable.

`TESTS_DB` accepts an array, so it has custom syntax when set via env:
`KL_TESTS_DB=mongo,memory`.

## Build & Run

### Start

To start both watching on frontend and backend:

```bat
npm start
```

Now you can open `http://localhost:8080` in your browser and delight our
application (8080 is default express port, you can change it by setting
`KL_EXPRESS_PORT` env variable and changing port in docker-compose.yml).

To see other commands, do

```bat
npm run
```

There are also subproject specific commands:

```bat
cd frontend && npm run
```

etc.

### Run all tests

*Attention*: Don't forget to `npm start` before testing.

```bat
npm test
```

### Clean distributable files

```bat
npm run clean
```
