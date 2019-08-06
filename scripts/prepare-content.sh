#!/usr/bin/env bash
# Script for preparing content for kyma-project.io

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
readonly CONTENT_DIR="${SCRIPTS_DIR}/../content"

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

fetch() {
    APP_DOCS_BRANCHES="${BRANCHES}" \
    APP_DOCS_REPOSITORY="kyma" \
    APP_DOCS_OUTPUT="${CONTENT_DIR}/docs" \
    APP_DOCS_VERSIONS_CONFIG_FILE="${CONTENT_DIR}/docs/versions.json" \
    APP_COMMUNITY_OUTPUT="${CONTENT_DIR}/community" \
    APP_COMMUNITY_REPOSITORY="community" \
    APP_ROADMAP_REPOSITORY="community" \
    APP_ROADMAP_OUTPUT="${CONTENT_DIR}/roadmap" \
    APP_ROADMAP_CAPABILITIES_OUTPUT="${CONTENT_DIR}/roadmap/capabilities" \
    APP_ROADMAP_TICKETS_OUTPUT="${CONTENT_DIR}/roadmap/tickets.json" \
    APP_TOKEN="${BOT_GITHUB_TOKEN}" \
    APP_ZEN_HUB_TOKEN="${BOT_ZENHUB_TOKEN}" \
    make -C "./tools/content-loader" fetch-content
}

main() {
    init "${ARGS[@]}"

    if [[ -z "${NETLIFY_CI}" ]]; then
        echo "Co się nauczyliśmy to nasze"
    else
        step "Fetching"
        fetch
        pass "Fetched"
    fi
}
main