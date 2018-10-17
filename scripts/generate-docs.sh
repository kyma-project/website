#!/usr/bin/env bash
#
# Script for generating and publishing new documentation to kyma-project.io

pushd "$(pwd)" > /dev/null || exit

on_error() {
    echo -e "${RED}✗ Failed${NC}"
    exit 1
}
trap on_error ERR

on_exit() {
    popd > /dev/null || exit
}
trap on_exit EXIT

readonly SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
readonly KYMA_REPOSITORY="https://github.com/kyma-project/kyma.git"
readonly DOCUMENTATION_DIR="${SCRIPTS_DIR}/../static/documentation"
readonly GENERATOR_IMAGE="eu.gcr.io/kyma-project/documentation-generator:0.1.49"

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
    PUBLISH='false'
    SSH_FILE=
    TOKEN=
    while test $# -gt 0; do
        case "$1" in
            --ssh-file | -s)
                shift
                SSH_FILE=$1
                shift
                ;;
            --publish | -p)
                PUBLISH='true'
                shift
                ;;
            --token | -t)
                shift
                TOKEN=${1}
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
    readonly PUBLISH
    readonly SSH_FILE
    readonly TOKEN
}

generate() {
    docker run --rm -v "${DOCUMENTATION_DIR}:/app/documentation" \
               -e APP_OUTPUT="/app/documentation" \
               -e APP_DOC_CONFIG_FILE="/app/documentation/config.json" \
               -e APP_TOKEN="${TOKEN}" \
               ${GENERATOR_IMAGE} || return
}

publish() {
    if [[ -n ${SSH_FILE} ]]; then
        echo "Configuring git"
        bash "${SCRIPTS_DIR}/helpers/git-config.sh" --ssh-file "${SSH_FILE}" || return
    fi

    echo "Detecting changes"
    local changes
    changes=$(git status --porcelain "${DOCUMENTATION_DIR}" | wc -w)
    if [[ "${changes}" -eq 0 ]]; then
        echo "Nothing to publish"
        return
    fi

    echo "Commit documentation"
    git add "${DOCUMENTATION_DIR}" || return
    git commit -m "Publish documentation for Kyma" --no-verify || return

    echo "Pushing documentation to master"
    git push origin HEAD:master || return
}

main() {
    init "${ARGS[@]}" || return

    step "Generating"
    generate || return
    pass "Generated"

    step "Publishing"
    if [[ ${PUBLISH} == true ]]; then
        publish || return
    else
        echo "Skipped"
    fi
    pass "Published"
}
main