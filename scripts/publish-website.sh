#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi
