#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

# arguments
OVERWRITE=
SSH_FILE=
# read arguments
while test $# -gt 0; do
    case "$1" in
        --ssh-file | -s)
            shift
            SSH_FILE=$1
            shift
            ;;
        --skip | -sk)
            shift
            if (${1} -eq 'true') then
                echo 'Aborting the build to prevent a loop'
                exit 0
            fi
            shift
            ;;
        --overwrite-git-config)
            shift
            OVERWRITE=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

echo "Configure git to push new version of website..."

if [[ -n ${SSH_FILE} ]]; then

    # create a authentication agent
    eval `ssh-agent -s`

    # add ssh-key
    ssh-add $SSH_FILE
    ssh-add -l

    # configure git
    sh ./scripts/helpers/git-config.sh -s $SSH_FILE
fi

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n$gitResult${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi