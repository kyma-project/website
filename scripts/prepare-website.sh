#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

# read arguments
while test $# -gt 0; do
    case "$1" in
        --skip | -sk)
            shift
            if [[ ${1} == true ]]; then
                echo 'Aborting the build to prevent a loop'
                exit 0
            fi
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n$gitResult${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi