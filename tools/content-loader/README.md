# Documentation Generator

## Overview

This project is responsible for preparing content for the `kyma-project.io` website (documentation). It uses GitHub API to detect new releases.

## Installation

To install all dependencies, run this command:

```
npm install
```

To fetching documentation with default options, run this command:

```
npm start
```

The configuration options are as follows:

| Name                          | Default value     | Description                                                 |
| ----------------------------- | ----------------- | ----------------------------------------------------------- |
| APP_TOKEN                     | `null`            | The GitHub API OAuth token.                                 |
| APP_ORGANIZATION              | `kyma-project`    | The GitHub organization that owns a given repository.       |
| APP_REPOSITORY                | `kyma`            | The repository with documentation.                          |
| APP_DOCS_COMMIT               | `null`            | The commit from the `master` branch with new documentation. |
| APP_DOCS_OUTPUT               | `out`             | The path for storing the documentation results.             |
| APP_DOCS_VERSIONS_CONFIG_FILE | `versions.json`   | The path to the website documentation configuration.        |
| APP_DOCS_TEMP_DIR             | `tempDir`         | The path for storing temporary data.                        |

### Docker

To build an image, run this command:

```
docker build -t website-content-loader .
```

Use this command to run the image:

```
docker run --rm -v {absolutePathToOutputDir}:/app/documentation -e APP_DOCS_OUTPUT=/app/documentation -e APP_DOCS_VERSIONS_CONFIG_FILE=/app/documentation/versions.json website-content-loader
```

Replace values in curly braces with proper details, where:

- {absolutePathToOutputDir} is the absolute path to the output directory
