---
title: Kyma release process
label: internal
---

This document describes how to create a Kyma release. Start from defining release jobs as described in the [**Preparation**](#kyma-release-process-kyma-release-process-preparation) section. Then proceed to the [**Steps**](#kyma-release-process-kyma-release-process-steps).

A Kyma release includes the following items:

* Docker images for Kyma components
* A GitHub release including release artifacts, such as source code and configuration
* A Git tag
* A release branch

## Definitions

The table below includes placeholders used throughout this document. When executing the commands, replace each of them with a suitable release number or version.

| Placeholders | Description | Pattern | Example|
|-------|------------|---------|--------|
| `RELEASE` | Release number| `{major}.{minor}` | `1.13`|
| `RELEASE_VERSION` | Release version | `{major}.{minor}.{patch}` or `{major}.{minor}.{patch}-rc{candidate}` | `1.13.0` or `1.13.0-rc1` |
| `RELEASE_VERSION_SHORT` | Release version without additional characters | `{major}{minor}` | `113`|
| `RELEASE_VERSION_DASH` | Release version with dashes |`{major}-{minor}-{patch}` or `{major}-{minor}-{patch}-rc{candidate}`| `1-13-0` or `1-13-0-rc1`|

## Preparation

> **NOTE:** This section applies only to new major and minor versions. If you release a patch, skip the preparation and go to the [**Steps**](#kyma-release-process-kyma-release-process-steps) section.

### kyma-project/kyma

#### Perform initial checks

Check if the `main` branch contains any PR-images:

   ```bash
   git grep -e 'version:\s.*[Pp][Rr]-.*' -e 'image:.*:[Pp][Rr]-.*' -e 'tag:\s.*[Pp][Rr]-.*' --before-context=2  resources tests
   ```

   Ask the teams for fixes if this command returns any output.

#### Create a release branch

>**NOTE:** a release branch needs to be created per new major / minor version. Patch releases and release candidates do not have a dedicated release branch.

Create a release branch in the `kyma` repository. The name of this branch should follow the `release-{major}.{minor}` pattern, such as `release-1.4`.

    ```bash
    git fetch upstream
    git checkout --no-track -b release-{RELEASE} upstream/main
    git push -u upstream release-{RELEASE}
    ```

### kyma-project/test-infra

#### Update the jobs on the main branch

1. Create a PR to `main` containing the following changes to create the new job definitions:

    1. Open `templates/config.yaml`
    2. Add the new release to `global.releases`. Remove the oldest release on the list.
    3. Set `global.nextRelease` to the future release version.
    4. Run `make` in the root of the repository to generate jobs and run tests. If any of the tests is marked red, fix it using these guidelines:
      * For release tests using `GetKymaReleasesSince` or `jobsuite.Since` with a release that is no longer supported, change the method to `GetAllKymaReleases` or `jobsuite.AllReleases` respectively.
      * For release tests using `GetKymaReleasesUntil` or `jobsuite.Until` with a release that is no longer supported, remove the part of the test which includes the method.
    5. If tests are green, commit all jobs.

2. Once the PR is merged to `main`, you can proceed.

#### Create a release branch

>**NOTE:** a release branch needs to be created per new major / minor version. Patch releases and release candidates do not have a dedicated release branch. If this branch already exists this step will be skipped.

Create a release branch in the `test-infra` repository

    ```bash
    git fetch upstream
    git checkout --no-track -b release-{RELEASE} upstream/main
    git push -u upstream release-{RELEASE}
    ```

## Steps

Follow these steps to release another Kyma version. Execute these steps for every patch release or release candidate.

### kyma-project/test-infra

Ensure that the `prow/RELEASE_VERSION` file from the `test-infra` repository on a release branch contains the correct version to be created. If you define a release candidate version, a pre-release is created.  

1. Make sure the `prow/RELEASE_VERSION` file includes just a single line, **without the newline character at the end**:  

    ```bash
    echo -n {RELEASE_VERSION} > prow/RELEASE_VERSION
    ```

2. If you had to change the RELEASE_VERSION, create a PR to update it on the release branch.
3. Once this PR is merged you can proceed.

### kyma-project/kyma

#### Create a PR to the release branch

1. Inside the release branch do the following changes.

   1. In `installation/resources/installer.yaml` replace `eu.gcr.io/kyma-project/develop/installer:{image_tag}` with `eu.gcr.io/kyma-project/kyma-installer:{RELEASE_VERSION}`

   2. In the `resources/core/values.yaml` file, find `clusterAssetGroupsVersion`.

        ```yaml
        docs:
        # (...) - truncated
        clusterAssetGroupsVersion: main
        ```

      And replace the `clusterAssetGroupsVersion` value with the following:

        ```yaml
        docs:
        # (...)
        clusterAssetGroupsVersion: release-{RELEASE}
        ```

2. Create a pull request with your changes to the release branch.

   ![PullRequest](./assets/release-PR.png)

3. If `pre-release-pr-image-guard` fails, ask the owners to change PR-XXX images of the components to the `main` version.
4. If the checks are green, merge the PR and proceed to the next step.

#### Development process towards the release
   > **NOTE:** Every developer who is introducing changes to the specific version can perform steps 1-4.

1. Create a feature-branch based on the given `release-{RELEASE}` branch you want to extend. Add your changes and create a Pull Request.

2. Once you create a Pull Request to the release branch, the set of checks is triggered.
   These jobs run in the same way as jobs that run on every Pull Request to the `main` branch.
   If you create a Pull Request that contains changes to the components, the component-building job is triggered.
   If you make any changes in the charts, the integration tests are triggered.

3. If you detect any problems with your PR, fix the issues until your checks pass.

4. After all checks pass, merge your PR to the release branch. Merging the PR triggers the post-submit integration tests automatically.
   The jobs' status will be visible on the Kyma [TestGrid](https://testgrid.k8s.io/kyma_integration) in the corresponding dashboard tab.

5. If there's a need for additional changes in the release branch during the development process, open a new PR to the release branch.
   Repeat steps 1-4 for this PR.

#### Create a release
1. Once the release process is finished and the release branch is complete, create a new tag in the repository that points to your release branch. To create a tag, run this command:
> **CAUTION:** Make sure you are working on the most up-to-date `release-{RELEASE}` branch for a given release.
```shell
git tag -a {RELEASE_VERSION} -m "Release {RELEASE_VERSION}"
git push upstream {RELEASE_VERSION}
```
The tag must have the same name as in the `RELEASE_VERSION` file. Creating a new tag triggers the following actions:
   * Create a GitHub release and trigger documentation update on the official Kyma website.
   * Create a new release cluster for the given Kyma `RELEASE_VERSION`.
     If you don't have access to the GCP project, post a request in the Slack team channel.
     > **CAUTION**: The cluster is automatically generated for you, and it is automatically removed after 7 days.

2. The Github release post-submit job creates a release in the `kyma-project/kyma` repository, which triggers the [`post-rel{RELEASE_VERSION_SHORT}-kyma-release-upgrade`](https://github.com/kyma-project/test-infra/blob/main/prow/jobs/kyma/kyma-release-upgrade.yaml) pipeline. The purpose of this job is to test upgradability between the latest Kyma release that is not a release candidate and the brand new release published by the release post-submit job.
    For example, if `1.7.0-rc2` is released, the pipeline will try to upgrade `1.6.0` to `1.7.0-rc2`.

    If you detect any problems with the upgrade, contact the teams responsible for failing components.

    > **CAUTION:** The job assumes no manual migration is involved. If the upgrade process requires any additional actions, the pipeline is likely to fail. In such case, the owners of the components concerned are responsible for running manual tests or modifying the pipeline.

3. On the release branch, update the `RELEASE_VERSION` file located in the `prow` folder of the [`kyma-project/test-infra`](https://github.com/kyma-project/test-infra) repository. It must contain the next release candidate version. Do it immediately after the release, otherwise, any PR to a release branch overrides the previously published Docker images.

   For example, if the `RELEASE_VERSION` file on the release branch contains `1.4.1`, change it to `1.4.2-rc1`.

4. Validate the `yaml` and changelog files generated under [releases](https://github.com/kyma-project/kyma/releases).

5. Update the release content manually with links to:

   * Instructions on local Kyma installation
   * Instructions on cluster Kyma installation
   * Release notes

   For installation instructions, use the links from the previous release and update the version number in URLs. If contributors want you to change something in the instructions, they would address you directly. Contact technical writers for the link to release notes.

> **NOTE:** After the Kyma release is complete, proceed with [releasing Kyma CLI](/guidelines/releases-guidelines/03-kyma-cli-release-process.md).

## Post-release tasks

1. Ask the Huskies team to upgrade the Kyma Helm chart on AppHub.

        > **NOTE:** Because of a limitation on the AppHub side, only a few people are allowed to create such a PR, which currently includes the members of the Huskies team.

2. Update `prow/RELEASE_VERSION` in the `main` branch of the `test-infra` repository with the name of the next minor release candidate, and merge the pull request to `main`. For example, if the `RELEASE_VERSION` on the `main` branch is set to `1.4.2`, change the version to `1.5.0-rc1`.
