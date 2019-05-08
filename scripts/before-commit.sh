#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

##
# TsLint
##
npm run lint-check
tslintResult=$?

if [ ${tslintResult} != 0 ]; then
	echo "${RED}✗ tslint${NC}\n$tslintResult${NC}"
    npm run lint-fix
	exit 1
else echo "${GREEN}√ tslint${NC}"
fi
