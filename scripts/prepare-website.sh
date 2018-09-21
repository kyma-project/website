#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

# arguments
SSH_FILE=

# read arguments
while test $# -gt 0; do
    case "$1" in
        --ssh-file | -s)
            shift
            SSH_FILE=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

echo "Configure git to push new version of website..."

# make ssh dir
mkdir /root/.ssh/

# create known_hosts file
touch /root/.ssh/known_hosts

# add github to known_hosts
ssh-keyscan -H github.com >> ~/.ssh/known_hosts

# key need to be only readable
chmod 400 $SSH_FILE

# create a authentication agent
eval `ssh-agent -s`

# add ssh-key
ssh-add $SSH_FILE
ssh-add -l

# configure git
sh ./scripts/git-config.sh -s $SSH_FILE

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n$gitResult${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi