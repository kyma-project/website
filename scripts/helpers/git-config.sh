#!/usr/bin/env bash

SSH_FILE=

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
readonly SSH_FILE

# create a authentication agent
eval `ssh-agent -s`

# add ssh-key
ssh-add $SSH_FILE
ssh-add -l

echo $(ls)
# configure git
git config --global user.email "kyma.bot@sap.com"
git config --global user.name "Kyma Bot"
git config --global core.sshCommand 'ssh -i '$SSH_FILE''

git remote add origin git@github.com:kyma-project/website.git