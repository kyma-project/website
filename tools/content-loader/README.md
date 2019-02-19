# Content loader

## Overview

This project prepares content for the Docs on the `kyma-project.io` website. It uses GitHub API to detect new releases in the `kyma` repository and documentation changes under `kyma/docs` merged to the `master` branch. It later uploads the modified `.md` files to the `content` folder in the `website` repository and publishes the documents on the website under a given version.

## Installation

To install all dependencies, run this command:

``` bash
npm install
```

To fetch documentation with default options, run this command:

``` bash
npm start
```

The configuration options are as follows:

| Name                              | Default value     | Description                                                 |
| --------------------------------- | ----------------- | ----------------------------------------------------------- |
| **APP_TOKEN**                     | `null`            | The GitHub API OAuth token                                  |
| **APP_ORGANIZATION**              | `kyma-project`    | The GitHub organization that owns a given repository        |
| **APP_REPOSITORY**                | `kyma`            | The repository with documentation                           |
| **APP_DOCS_COMMIT**               | `null`            | The commit from the `master` branch with new documentation  |
| **APP_DOCS_OUTPUT**               | `out`             | The path for storing the documentation results              |
| **APP_DOCS_VERSIONS_CONFIG_FILE** | `versions.json`   | The path to the website documentation configuration         |
| **APP_DOCS_TEMP_DIR**             | `tempDir`         | The path for storing temporary data                         |

### Docker

To build an image, run this command:

``` bash
docker build -t website-content-loader .
```

Use this command to run the image:

``` bash
docker run --rm -v {absolutePathToOutputDir}:/app/documentation -e APP_DOCS_OUTPUT=/app/documentation -e APP_DOCS_VERSIONS_CONFIG_FILE=/app/documentation/versions.json website-content-loader
```

Replace values in curly braces with proper details, where:

- `{absolutePathToOutputDir}` is the absolute path to the output directory.
