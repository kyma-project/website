# Documentation generator

## Overview

This project is responsible for building documentation for `kyma-project.io` website. It uses GitHub API to detecting new releases.

## Installation

To install all dependencies, run:

```
npm install
```

To generate a documentation with default options, run:

```
npm start
```

The configuration options are as follows:

| Name                | Default value     | Description                                                 |
| ------------------- | ----------------- | ----------------------------------------------------------- |
| APP_TOKEN           | `null`            | The GitHub API OAuth token.                                 |
| APP_ORGANIZATION    | `kyma-project`    | The GitHub organization with repository.                    |
| APP_REPOSITORY      | `kyma`            | The repository with documentation.                          |
| APP_OUTPUT          | `out`             | The localization where results of execution will be stored. |
| APP_DOC_CONFIG_FILE | `out/config.json` | The path to website documentation configuration.            |
| APP_TEMP            | `temp`            | The localization where temporary data will be stored.       |

### Docker

To build an image, run:

```
docker build -t documentation-generator .
```

To run an image, run:

```
docker run --rm -v {absolutePathToOutputDir}:{absolutePathToOutputDir} -v {absolutePathToTemporaryDir}:{absolutePathToTemporaryDir} -v /var/run/docker.sock:/var/run/docker.sock -e APP_OUTPUT={absolutePathToOutputDir} -e APP_DOC_CONFIG_FILE={absolutePathToOutputDir}/config.json -e APP_TEMP={absolutePathToTemporaryDir} documentation-generator
```

Replace values in curly braces with proper details, where:

- {absolutePathToOutputDir} is the absolute path to output directory
- {absolutePathToTemporaryDir} is the absolute path to temporary directory
