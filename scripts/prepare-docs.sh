#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
INVERTED='\033[7m'
NC='\033[0m' # No Color

documentationRepo="https://github.com/kyma-project/kyma.git"
docsGeneratorImage="eu.gcr.io/kyma-project/content-to-json-generator:0.0.2"
navGeneratorImage="eu.gcr.io/kyma-project/navigation-builder:0.1.20"

# clean and remove cloned repo
function removeCloneRepoFolder {
    rm -rf ${cloneRepoFolder}
}

# arguments
DOCS_VERSION=
CLONE_REPO_FOLDER=

# read arguments
while test $# -gt 0; do
    case "$1" in
        --docs-version | -v)
            shift
            DOCS_VERSION=$1
            shift
            ;;
        --clone-repo-folder | -f)
            shift
            CLONE_REPO_FOLDER=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

# initial clean
removeCloneRepoFolder

# clone repo with specific version & go to documentation
echo "Clone repo..."

git clone ${documentationRepo} ${CLONE_REPO_FOLDER}
cd ${CLONE_REPO_FOLDER}

git checkout ${DOCS_VERSION}

# prepare docs
echo "Prepare documentation..."

cd docs

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
                removeCloneRepoFolder
                exit 1
            else echo -e "${GREEN}√ generate docs for $dir ${NC}\n"
            fi

            cd ${currentPath}out

            # copy to static/documentation/${DOCS_VERSION}
            docuType="$(ls)"
            mkdir -p ../../../../static/documentation/${DOCS_VERSION}/${docuType}
            cp -R ${docuType} ../../../../static/documentation/${DOCS_VERSION}
            cd ../..
        fi
    done
done

cd ../..

# generate navigation
echo "Generate navigation..."

docsPath="$(pwd)/static/documentation/$DOCS_VERSION"
docker run -v ${docsPath}:/app/docs ${navGeneratorImage}
navigationResult=$?

if [ ${navigationResult} != 0 ]; then
    echo -e "${RED}✗ generate navigation${NC}\n$navigationResult${NC}\n"
    removeCloneRepoFolder
    exit 1
else echo -e "${GREEN}√ generate navigation${NC}\n"
fi