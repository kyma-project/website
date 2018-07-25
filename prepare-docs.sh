#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

documentationRepo="git@github.com:kyma-project/kyma.git"
docsGeneratorImage="eu.gcr.io/kyma-project/content-to-json-generator:0.0.1"
navGeneratorImage="eu.gcr.io/kyma-project/navigation-builder:0.0.1"
temporaryFolder="temporaryFolder"

# clean and remove cloned repo
function removeTemporaryFiles {
    rm -rf ${temporaryFolder}
}

# arguments
SSH_FILE=
DOCS_VERSION=

# read arguments
while getopts 's:v:' flag; do
  case "${flag}" in
    s) SSH_FILE=${OPTARG} ;;
    v) DOCS_VERSION=${OPTARG} ;;
  esac
done

# initial clean
removeTemporaryFiles

echo "Configure git to clone and push..."

# configure git
sh ./git_config.sh -s $SSH_FILE

# clone repo with specific version & go to documentation
git clone ${documentationRepo} ./${temporaryFolder}
cd ${temporaryFolder}

git checkout ${DOCS_VERSION}

cd docs

# prepare docs
for dir in */
do
    for file in "$dir"/docs.config.json
    do
        if [ -f $file ]
        then
            # generate documentation
            currentPath="$(pwd)/$dir"
            docker run -v ${currentPath}:/app/documentation ${docsGeneratorImage}
            docsResult=$?

            if [ ${docsResult} != 0 ]; then
                echo -e "${RED}✗ generate docs for $dir${NC}\n$docsResult${NC}\n"
                removeTemporaryFiles
                exit 1
            else echo -e "${GREEN}√ generate docs for $dir ${NC}\n"
            fi

            cd ${currentPath}out

            # copy to static/docs/${DOCS_VERSION}
            docuType="$(ls)"
            mkdir -p ../../../../static/documentation/${DOCS_VERSION}/${docuType}
            cp -R ${docuType} ../../../../static/documentation/${DOCS_VERSION}
            cd ../..
        fi
    done
done

cd ../..

# generate navigation
docsPath="$(pwd)/static/docs/$DOCS_VERSION"
docker run -v ${docsPath}:/app/docs ${navGeneratorImage}
navigationResult=$?

if [ ${navigationResult} != 0 ]; then
    echo -e "${RED}✗ generate navigation${NC}\n$navigationResult${NC}\n"
    removeTemporaryFiles
    exit 1
else echo -e "${GREEN}√ generate navigation${NC}\n"
fi

# convert and copy manifest
npm install -g js-yaml
js-yaml ./${temporaryFolder}/docs/manifest.yaml > ./static/documentation/${DOCS_VERSION}/manifest.json

# push to remote
echo "Push generated docs.."

git add static/docs/${DOCS_VERSION}
git commit -m "Import docs for Kyma v$DOCS_VERSION"
git push origin HEAD:master
gitResult=$?

if [ ${gitResult} != 0 ]; then
    echo -e "${RED}✗ git push fail${NC}\n$gitResult${NC}\n"
    removeTemporaryFiles
    exit 1
else echo -e "${GREEN}√ git push${NC}\n"
fi