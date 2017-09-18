#!/usr/bin/env bash

docker-compose build prod
docker tag kladovka/prod registry.heroku.com/kladovka/web
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" registry.heroku.com
docker push registry.heroku.com/kladovka/web
