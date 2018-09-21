# Docs navigation builder

## Overview

This repository is responsible for building a navigation file out of documentation files provided by the **content-to-json-generator**. A navigation file is used in the documentation page at `kyma-project.io`.


## Installation

To install all dependencies, run:

```
npm install
```

To generate a navigation file out of examplary documentation located at the `docs` folder, run:

```
npm start
```

To customize the location of the `docs` folder, set up the **DOCS_PATH** environment variable. For example:

```
DOCS_PATH=/Users/$USER/path/to/docs/ npm start
```

### Docker

To build an image, run:

```
docker build -t docs-navigation-builder .
```

## Usage

This repository contains the exemplary documentation in the `docs` folder. To generate a navigation file, mount the `docs` folder under the `/app/docs` path. For example:

```
docker run -v /{PATH_TO_PROJECT}/docs/:/app/docs docs-navigation-builder
```

The `navigation.json` appears under the mounted directory, in this case: `/{PATH_TO_PROJECT}/docs/`.
