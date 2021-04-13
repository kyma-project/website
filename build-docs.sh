#!/bin/bash

export APP_PREVIEW_SOURCE_DIR="/Users/i515376/Workspace/Go/src/github.com/kyma-project/kyma"
export APP_DOCS_BRANCHES="preview"
export APP_PREPARE_FOR_REPO="kyma"
make  netlify-docs-preview
