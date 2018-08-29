#!/usr/bin/env bash

# arguments
DOCS_VERSION=
INPUT=
OUTPUT=

# read arguments
while test $# -gt 0; do
    case "$1" in
        --input | -i)
            shift
            INPUT=$1
            shift
            ;;
        --output | -o)
            shift
            OUTPUT=$1
            shift
            ;;
        *)
            echo "$1 is not a recognized flag!"
            exit 1;
            ;;
    esac
done

# convert and copy yaml to json file
echo "Convert and copy yaml to json file"

npm install -g js-yaml
js-yaml ${INPUT} > ${OUTPUT}