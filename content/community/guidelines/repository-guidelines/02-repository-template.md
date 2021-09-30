---
title: Repository template
label: internal
---

The [`repository-template`](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template) folder offers a unified file, document, and folder structure. Use it for every new repository that you create in Kyma. It helps you to ensure that the project is consistent and standardized.

## Usage

The `repository-template` folder contains all elements required for a skeleton repository. However, before you copy the content of the `repository-template` folder into your new repository, read carefully the following paragraph to learn what the purpose of the specific files and documents is and which of them you need to adjust.

The `repository-template` folder consists of:

* [`.github`](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/.github) - This folder contains the pull request template, issue templates, and the Stale Bot that monitors inactive issues, marks them as `stale`, and closes them after the specified period of time.

* [`docs`](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/docs) - In this folder, put the repository-specific documentation only. Store any architectural decisions or documents applicable to all Kyma repositories in the `community` repository.

* [CODE_OF_CONDUCT.md](https://github.com/kyma-project/community/blob/main/contributing/01-code-of-conduct.md) - This document is a ready-to-use template which provides a link to the general `CODE_OF_CONDUCT.md` document from the `community` repository. Copy the template into your own repository.

* [CODEOWNERS](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/CODEOWNERS) - In this document, specify the owners of particular parts of your repository. The owners are automatically added as reviewers when you open a pull request that modifies the code and content they own. If you additionally [modify the settings](https://help.github.com/articles/enabling-required-reviews-for-pull-requests/) of the `main` branch and select the **Require review from Code Owners** option, their approvals become obligatory to merge the pull request. Configure the `CODEOWNERS` document and adjust your `main` branch. The [`CODEOWNERS`](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/CODEOWNERS) document contains instructions on how to do both properly.

* [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/main/contributing/02-contributing.md) - This template makes a reference to the [`CONTRIBUTING.md`](https://github.com/kyma-project/community/blob/main/contributing/02-contributing.md) document that contains the general guidance from the `community` repository and describes the rules for contributing to all Kyma repositories. If there is any additional, project-specific information that you want to add to your project's `CONTRIBUTING.md` document, add them under the same sections as in the general [`CONTRIBUTING.md`](https://github.com/kyma-project/community/blob/main/contributing/02-contributing.md) document.

* [LICENSE](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/LICENSE) - It is an obligatory element of every open-source repository. Copy the template into your repository.

* [NOTICE.md](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/NOTICE.md) - The document defines the ownership of the copyright in the repository. Copy the template into your repository.

* [README.md](https://github.com/kyma-project/community/tree/main/guidelines/repository-guidelines/repository-template/README.md) - This is a template with sections that you fill in according to the provided suggestions. Add any information specific for a development guide in this document. Describe how your project works, how to use it, and how to develop it. Because all sections are optional, remove those that do not apply to your project.  
