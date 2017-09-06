# kladovka

Optimizer of inventory for games

## Docker

Recommended way to run this app is via Docker-CE
https://docs.docker.com/engine/installation/

The workflow for developers should be like so:

- `docker-compose up` in one terminal
- in another terminal, `docker-compose exec dev bash`
- execute all other commands from this readme inside docker container. First
terminal (with `docker-compose up`) should display logs.

If you need to clean everything, do `docker-compose stop && docker-compose rm -f`

## Install required modules

```bat
npm install
npm run deps
```

## Configuration

In root of Kladovka, you must create `config.json`, based on `config.json.example`.

## Build & Run

### Start

To start both watching on frontend and backend:

```bat
npm start
```

Now you can open `http://localhost:8080` (8080 default express port in
`config.json.example`) in your browser and delight our application.

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
