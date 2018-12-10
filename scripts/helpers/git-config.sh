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
echo ${BOT_GITHUB_EMAIL}
echo ${BOT_GITHUB_USER}

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
git config --global user.email "$BOT_GITHUB_EMAIL"
git config --global user.name "$BOT_GITHUB_USER"
git config --global core.sshCommand 'ssh -i '$SSH_FILE''

git remote add origin git@github.com:kyma-project/website.git