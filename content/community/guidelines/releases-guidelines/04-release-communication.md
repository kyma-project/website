---
title: Release communication
label: internal
---

At the beginning of the release process, the team responsible for the release picks a Release Master who will manage the release process. One of the Release Master's responsibilities is to provide updates regarding the progress of the release process through the public **release** Slack channel. The Release Master is obliged to do the following:

- Inform Kyma teams about release deadlines at least one week before the first release candidate (RC1), and pin the message to the channel so that it is easy to find.

- Prepare the environment to test a release candidate. Share access to the testing environment with Kyma teams so that they can test their components before merging the RC.

- Create an excel sheet where all the manual tests are defined and ensure that all tests are executed by responsible teams.

- Inform Kyma teams about deadlines for cherry-picking changes to the release branch.

- Inform Kyma teams about all the release-related pull requests that require approvals.

- Notify Kyma teams about failing tests to fix them as quickly as possible. Kyma teams responsible for failing tests should communicate with a Release Master about the fixing progress.

## Communication channels

The Release Manager must notify the Kyma team about the planned dates of creating both release candidates, as well as the date of the final release. Apart from that, the Release Master must inform about the progress of the release process. After the release is out, the Release Master sends notification about the new release on the public **release** [Slack](http://slack.kyma-project.io/) channel.

## Communication persons

The following are contact persons responsible for the whole release process in Kyma:

- [Jose Cortina](https://github.com/jose-cortina) (Release Manager)
