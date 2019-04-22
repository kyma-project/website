#!/usr/bin/env bash
#
# Script for fetching and publishing new documentation to kyma-project.io

set -e
set -o pipefail

pushd "$(pwd)" > /dev/null

on_error() {
    echo -e "${RED}✗ Failed${NC}"
    exit 1
}
trap on_error ERR

on_exit() {
    popd > /dev/null
}
trap on_exit EXIT

readonly SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly KYMA_REPOSITORY="https://github.com/kyma-project/kyma.git"
readonly DOCUMENTATION_DIR="${SCRIPTS_DIR}/../content/docs"
readonly LOADER_IMAGE="eu.gcr.io/kyma-project/develop/website-content-loader:e3981101"

# Colors
readonly ARGS=("$@")
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[0;33m'
readonly NC='\033[0m' # No Color

pass() {
    local message="$1"
    echo -e "${GREEN}√ ${message}${NC}"
}

step() {
    local message="$1"
    echo -e "\\n${YELLOW}${message}${NC}"
}

init() {
    BRANCHES=''

    while test $# -gt 0; do
        case "$1" in
            --branches | -b)
                shift
                BRANCHES=$1
                shift
                ;;
            --help | -h)
                exit 0
                ;;
            *)
                echo "$1 is not a recognized flag!"
                exit 1
                ;;
        esac
    done
    readonly BRANCHES
}

copy() {
    docker run --rm -v "${DOCUMENTATION_DIR}:/app/documentation" \
               -e APP_DOCS_BRANCHES="${BRANCHES}" \
               -e APP_DOCS_OUTPUT="/app/documentation" \
               -e APP_DOCS_VERSIONS_CONFIG_FILE="/app/documentation/versions.json" \
               -e APP_TOKEN="${BOT_GITHUB_TOKEN}" \
               ${LOADER_IMAGE}
}

main() {
    init "${ARGS[@]}"

    step "Copying"
    copy
    pass "Copied"
}
main
