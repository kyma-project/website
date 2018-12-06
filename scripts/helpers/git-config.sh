#!/usr/bin/env bash

SSH_FILE=
LOCAL='false'

while test $# -gt 0; do
    case "$1" in
        --ssh-file | -s)
            shift
            SSH_FILE=$1
            shift
            ;;
        --local | -l)
            shift
            LOCAL=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done
readonly SSH_FILE
readonly LOCAL

# configure git
if $LOCAL; then
<<<<<<< HEAD
    git config user.email "kyma.bot@sap.com" || exit
    git config user.name "Kyma Bot" || exit
    git config core.sshCommand 'ssh -i '$SSH_FILE'' || exit
=======

    git config user.email "kyma.bot@sap.com" || exit
    git config user.name "Kyma Bot" || exit
    git config core.sshCommand 'ssh -i '$SSH_FILE'' || exit
    git config --global user.email "kyma.bot@sap.com" || exit
    git config --global user.name "Kyma Bot" || exit
    git config --global core.sshCommand 'ssh -i '$SSH_FILE'' || exit
    git config --get user.email
    git config --get --global user.email
    echo $(pdw)
>>>>>>> Fix in makefile
else
    git config --global user.email "kyma.bot@sap.com" || exit
    git config --global user.name "Kyma Bot" || exit
    git config --global core.sshCommand 'ssh -i '$SSH_FILE'' || exit
fi