#!/usr/bin/env sh

case $NODE_ENV in
    production )
        cd src && node server.js | tee -a ../../logs/backend.log
        ;;
    development )
        cd src && node server.js 2>&1 | ../../scripts/logprefix.sh backend | tee -a ../../logs/backend.log
        ;;
    * )
        cd src && node server.js 2>&1 | ../../scripts/logprefix.sh backend | tee -a ../../logs/backend.log
        ;;
esac
