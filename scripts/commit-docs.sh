#!/usr/bin/env bash

# arguments
DOCS_VERSION=
SSH_FILE=

# read arguments
while test $# -gt 0; do
    case "$1" in
        --docs-version | -v)
            shift
            DOCS_VERSION=$1
            shift
            ;;
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

echo "Configure git to push..."

# configure git
sh ./scripts/git-config.sh -s $SSH_FILE

# push to remote
echo "Push generated docs.."

git add static/documentation/${DOCS_VERSION}
git commit -m "Import docs for Kyma $DOCS_VERSION"
git push origin HEAD:master
gitResult=$?

if [ ${gitResult} != 0 ]; then
    echo -e "${RED}✗ git push fail${NC}\n$gitResult${NC}\n"
    exit 1
else echo -e "${GREEN}√ git push${NC}\n"
fi