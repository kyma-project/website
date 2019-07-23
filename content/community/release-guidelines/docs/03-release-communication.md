---
title: Release communication
label: internal
---

At the beginning of the release process, the team responsible for the release picks a Release Master who will manage the release process. One of the Release Master's responsibilities is to update the rest of the organization on the progress of the release process. The Release Master is obliged to do the following:

- Inform Kyma teams about release deadlines on Slack channels at least one week before the first release candidate (RC1), and pin the message so that it is easy to find. 

- Prepare the environment to test a release candidate. Share access to the testing environment with Kyma teams so that they can test their components before merging the RC.

- Create an excel sheet where all the manual tests are defined and ensure that all tests are executed by responsible teams.

- Inform Kyma teams about deadlines for cherry-picking changes to the release branch.

- Inform Kyma teams about all the release-related pull requests that require approvals.

- Notify Kyma teams about failing tests to fix them as quickly as possible. Kyma teams responsible for failing tests should communicate with a Release Master about the fixing progress.

## Communication channels

The Kyma team must be notified about the planned dates of both release candidates, as well as the date of the final release. Apart from that, the Release Master must inform about any occurrences regarding the release process. After the release is out, the Release Master sends notification about the new release on the external Kyma community [Slack channel](https://kyma-community.slack.com/messages/CBLBESMST/convo/CBLBESMST-1561563669.058300/).

## Communication persons

The following are contact persons responsible for the whole release process in Kyma:

- [Jose Cortina](https://github.com/jose-cortina) (Release Manager)

## Scrum of Scrums meetings

A Release Master should cooperate with Scrum Masters regarding the release process communication. Either the Release Master or a Scrum Master dedicated to the releasing team must inform other Scrum Masters on the release progress during the biweekly Scrum of Scrums (SoS) meetings.

A dedicated Scrum Master is also responsible for updating the SoS MagicBox under the Wiki page for a given release. The MagicBox must contain all the information and deadlines that affect all Kyma teams.
