#!/usr/bin/env bash

prefix="$1"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

if [ "$prefix" == "frontend" ]; then
    color="${CYAN}"
else
    color="${GREEN}"
fi

while read line; do echo -e "[${color}${prefix}${NC}] ${line}"; done
