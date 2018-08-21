#!/usr/bin/env bash

# read arguments
while getopts 's:' flag; do
  case "${flag}" in
    s) SSH_FILE=${OPTARG} ;;
  esac
done

echo "Configure git to clone and push..."

# configure git
git config --global core.sshCommand 'ssh -i '$SSH_FILE''
gitConfResult=$?

if [ ${gitConfResult} != 0 ]; then
    echo -e "${RED}✗ git config failNC}\n$gitResult${NC}\n"
    removeTemporaryFiles
    exit 1
else echo -e "${GREEN}√ git config${NC}\n"
fi

git config --global user.email "kyma.bot@sap.com"
git config --global user.name "Kyma Bot"