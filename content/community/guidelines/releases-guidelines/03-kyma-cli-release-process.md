---
title: Kyma CLI release process
label: internal
---

This document describes how to create a Kyma CLI release.

## Release content

A Kyma CLI release consists of:

* GitHub release with automated changelog generation
* Artifacts, including `cli` binaries and source code archives
* A release tag or branch holding the code

## Steps

1. Make sure Kyma is released and create a release branch in the `cli` repository. The name of this branch should follow the `release-x.y` pattern, such as `release-1.4`.

   >**NOTE:** This step applies only to new major and minor versions.

   ```bash
   git fetch upstream
   git checkout --no-track -b {RELEASE_NAME} upstream/main
   git push upstream {RELEASE_NAME}
   ```

2. Ensure that the `KYMA_VERSION` variables in the `Makefile` and `.goreleaser.yml` files from the `cli` repository on the release branch contain the latest Kyma version.

3. In `Makefile`, set `IS_RELEASE=true`

4. Create a PR to `cli/release-x.y` that triggers the presubmit job for `cli`.

5. After merging the PR, create a tag on the release branch that has the same version name as Kyma. If you define a release candidate version, a pre-release is created.  

   ```bash
   git tag -a {RELEASE_VERSION} -m "Release {RELEASE_VERSION}"
   ```

    where {RELEASE_VERSION} could be `1.4.0-rc1`, `1.4.0-rc2` or `1.4.0`.

6. Create the new version
   1. Push the tag to trigger a postsubmit job that creates the GitHub release. Validate if the release is available under [releases](https://github.com/kyma-project/cli/releases).

      ```bash
      git push upstream {RELEASE_VERSION}
      ```

   2. Verify the [Prow Status](https://status.build.kyma-project.io/?repo=kyma-project%2Fcli&type=postsubmit) of the matching revision ({RELEASE_VERSION}).
   3. If the post submit job failed, you can re-trigger it by removing the tag from upstream and pushing it again.

      ```bash
      git push --delete upstream {RELEASE_VERSION}
      git push upstream {RELEASE_VERSION}
      ```
