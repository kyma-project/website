#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

temporaryFolder="temporaryFolder"
sshFile="/website/ssh_key.pem"

# clean and remove cloned repo
function removeTemporaryFiles {
    rm -rf ${temporaryFolder}
}

echo "Configure git to push new version of website..."

# make ssh dir
mkdir /root/.ssh/

# create known_hosts file
touch /root/.ssh/known_hosts

# add github to known_hosts
ssh-keyscan -H github.com >> ~/.ssh/known_hosts

# key need to be only readable
chmod 400 $sshFile

# create a authentication agent
eval `ssh-agent -s`

# add ssh-key
ssh-add $sshFile
ssh-add -l

# configure git
sh ./git_config.sh -s $sshFile

# prepare website
echo "Prepare website..."

npm run publish:origin
publish=$?

if [ ${publish} != 0 ]; then
    echo -e "${RED}✗ publish website fail${NC}\n$gitResult${NC}\n"
    exit 1
else echo -e "${GREEN}√ publish website${NC}\n"
fi