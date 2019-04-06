#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

readonly SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly PREPARE_CONTENT_SCRIPT="${SCRIPTS_DIR}/prepare-content.sh"

# prepare content for website
echo "Prepare content for website..."

eval $PREPARE_CONTENT_SCRIPT
preparing=$?

if [ ${preparing} != 0 ]; then
    echo -e "${RED}✗ preparing content fail${NC}\n$"
    exit 1
else echo -e "${GREEN}√ preparing content${NC}\n"
fi

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi
