# Content Loader

## Overview

The Content Loader prepares content for the **Docs**, **Community**, and **Roadmap** sections on the `kyma-project.io` website. It uses GitHub API to detect:

- New releases in the `kyma` repository
- Documentation changes under [`kyma/docs`](https://github.com/kyma-project/kyma/tree/master/docs) merged to the `master` branch of the `kyma` repository
- Documentation changes merged to the `master` branch of the `community` repository
- GitHub issues with the `epic` label

Once detected, the Content Loader prepares content for the **Docs**, **Community**, and **Roadmap** sections and publishes it on the website.

## Prerequisites

Use the following tool to set up the project:

- [Node.js](https://nodejs.org/en/)

## Installation

To install all dependencies, run this command:

``` bash
npm install
```

To fetch documentation with the default configuration, run this command:

``` bash
npm start
```

The configuration options are as follows:

| Name                                    | Required | Default value            | Description                                                           |
| ----------------------------------------| :------: | :----------------------: | --------------------------------------------------------------------- |
| **APP_TOKEN**                           | **YES**  | `null`                   | GitHub API OAuth token                                            |
| **APP_ZEN_HUB_TOKEN**                   | **YES**  | `null`                   | ZenHub API OAuth token                                            |
| **APP_ORGANIZATION**                    | **YES**  | `kyma-project`           | GitHub organization that owns a given repository                  |
| **APP_DOCS_REPOSITORY**                 | **YES**  | `kyma`                   | Repository with documentation                                     |
| **APP_DOCS_BRANCHES**                   | **YES**  | `["master"]`             | Branches with documentation                                       |
| **APP_DOCS_OUTPUT**                     | **YES**  | `docs`                   | Path for storing the documentation results                        |
| **APP_DOCS_VERSIONS_CONFIG_FILE**       | **YES**  | `versions.json`          | Path to the website documentation configuration                   |
| **APP_DOCS_TEMP_DIR**                   | **YES**  | `tempDocsDir`            | Path for storing temporary data for documentation                 |
| **APP_DOCS_RELEASE_NUMBER**             | **NO**   | `3`                      | Number of the latest releases to be shown on the website          |
| **APP_COMMUNITY_OUTPUT**                | **YES**  | `community`              | Path for storing the community content results                    |
| **APP_COMMUNITY_REPOSITORY**            | **YES**  | `community`              | Repository with the community content                             |
| **APP_COMMUNITY_TEMP_DIR**              | **YES**  | `tempCommunityDir`       | Path for storing temporary data for the community content         |
| **APP_ROADMAP_REPOSITORY**              | **YES**  | `community`              | Repository with capabilities descriptions                         |
| **APP_ROADMAP_OUTPUT**                  | **YES**  | `roadmap`                | Path for storing the roadmap content results                      |
| **APP_ROADMAP_TEMP_DIR**                | **YES**  | `tempRoadmapDir`         | Path for storing temporary data for the roadmap content           |
| **APP_ROADMAP_CAPABILITIES_DIR**        | **YES**  | `capabilities`           | Capabilities location in the `community` repository               |
| **APP_ROADMAP_CAPABILITIES_OUTPUT**     | **YES**  | `roadmap/capabilities`   | Path for storing the capabilities results                         |
| **APP_ROADMAP_TICKETS_OUTPUT**          | **YES**  | `roadmap/tickets.json`   | Path for storing the tickets results                              |
| **APP_ROADMAP_LABELS**                  | **YES**  | `["Epic"]`               | Labels for tickets                                                |
| **APP_ROADMAP_NON_CATEGORIZED_ISSUES**  | **YES**  | `Future`                 | Release name for non-categorized issues                           |
| **APP_ZENHUB_URL_PREFIX**               | **YES**  | `https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/issues` | Prefix to a ZenHub issue URL |
