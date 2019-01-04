# Documentation Generator

## Overview

This project is responsible for building documentation for the `kyma-project.io` website. It uses GitHub API to detect new releases.

## Installation

To install all dependencies, run this command:

```
npm install
```

To generate documentation with default options, run this command:

```
npm start
```

The configuration options are as follows:

| Name                | Default value     | Description                                           |
| ------------------- | ----------------- | ----------------------------------------------------- |
| APP_TOKEN           | `null`            | The GitHub API OAuth token.                           |
| APP_ORGANIZATION    | `kyma-project`    | The GitHub organization that owns a given repository. |
| APP_REPOSITORY      | `kyma`            | The repository with documentation.                    |
| APP_COMMIT          | `null`            | The commit from the `master` branch with new documentation. |
| APP_OUTPUT          | `out`             | The path for storing the results.                     |
| APP_DOC_CONFIG_FILE | `out/config.json` | The path to the website documentation configuration.  |
| APP_TEMP            | `temp`            | The path for storing temporary data.                  |

### Docker

To build an image, run this command:

```
docker build -t documentation-generator .
```

Use this command to run the image:

```
docker run --rm -v {absolutePathToOutputDir}:/app/documentation -e APP_OUTPUT=/app/documentation -e APP_DOC_CONFIG_FILE=/app/documentation/config.json documentation-generator
```

Replace values in curly braces with proper details, where:

- {absolutePathToOutputDir} is the absolute path to the output directory
