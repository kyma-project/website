---
title: Issues workflow
---

In the Kyma project, we use [GitHub Issues](https://github.com/features/issues/) for both tracking the development process and managing the issues on a team and sprint level.

This document explains:

- How the issues and pull requests workflows are organized in the Kyma project
- How issues triage is organized
- Which tools are used on every stage of the workflow

## Used labels

Our statement is to:
* Use default labels provided by GitHub
* Introduce new labels only if necessary

### Default labels

The default labels provided by GitHub are as follows:

![](./assets/default_labels.png)

### Custom labels

Here are the custom labels introduced by the Kyma team. The labels colors are provided in brackets in Hex code:

* `WIP` (#ECF44F) indicates that an issue is not ready for further processing.
* `decision` (#ED635E) indicates that an issue is related to a decision.
* `priority/critical` (#FB0104) indicates the top-priority of a given issue.
* `area/{CAPABILITY_NAME}` (#3CB913) indicates which capabilities are related to a given issue. You can assign more than one `area` label to an issue.
* `area/quality` (#3CB913) indicates that an issue is related to a quality topic.
* `area/performance` (#3CB913) indicates that an issue is related to a performance topic.
* `security/{SEVERITY}` (#2D51F9) indicates a security issue based on its [CVSSv3](https://www.first.org/cvss/calculator/3.0) severity, either `low`, `medium`, `high`, or `critical`.
* `sig/{SIG_NAME}` (#E99694) indicates which [Special interest group (SIG)](/collaboration/#overview-overview) identified the issue and is responsible for further follow-up on the issue.
* `wg/{WG_NAME}` (#E99694) indicates which [Working group (WG)](/collaboration/#overview-overview) identified the issue and is responsible for further follow-up on the issue.

## Issues triage

Here is the flow diagram explaining how issues triage is performed:

![](./assets/kyma-triage.svg)

There are eight different stages of the triage:

| Stage | Description | Labels |
|--------- |----------|---------|
| Validity | Assess the validity of the issue (whether it is taken for the further triage and proper classification). | invalid, duplicate, wontfix, question |
| Kind | Differentiate whether the related issue is a new feature or a bug. | enhancement, bug, test-failing, test-missing |
| Decision | Check if the issue is related to a [decision](#kyma-working-model-kyma-working-model-decision-making). | decision |
| Help | Identify issues that do not have high priority and can be taken by the community. | help wanted, good first issue|
| Security | Specify the [CVSSv3](https://www.first.org/cvss/calculator/3.0) severity with the support of the security team. | security/{SEVERITY} |
| SIG/WG | Clarify which SIG or WG is involved in this issue and is responsible for the further follow-up on the issue. | sig/{SIG_NAME}, wg/{WG_NAME}|
| Priority | Prioritize issues in the general Kyma backlog to select those which are the most critical and should be taken as first. | priority/critical |
| Area | Clarify which capabilities or qualities are involved in a given issue. | area/{CAPABILITY_NAME}, area/quality or area/performance|

## Backlog

The [Kyma backlog](https://github.com/kyma-project/kyma/issues) contains issues that went through the triage, are not closed, and have labels added (except for the issues with the `question` label). Backlog prioritization is realized by assigning issues to Kyma milestones and assigning the `priority/critical` label. Critical issues assigned to the current milestone have the highest priority.

### Team sprints

Team Sprints are modeled as GitHub Projects. During the planning, a team selects issues from the backlog considering:
- priority (high priority first)
- area (default capability of the team first)
- dependencies (unblock others)

When the work is done, the issue is closed.

### Stale issues

To keep the Kyma backlog clean, the bot monitors all repositories in the organization. It marks old, inactive issues with the `stale` (Hex: #E4E669) label and closes them after a given period of time. For configuration details, check the [sample file](https://github.com/kyma-project/kyma/blob/main/.github/stale.yml).

Although the bot helps us to keep the backlog clean, we regularly monitor its activities to make sure it is not closing issues that are still valid and important for Kyma. The Kyma team reviews the issues in the [Kyma backlog](https://github.com/kyma-project/kyma/issues) and acts on the issues as follows:
- Closed issues:
  - If the issue is still valid, reopen it and remove the `stale` label from it.
  -  If the issue is invalid, change the `stale` label to a more relevant one and add a comment that provides background and explains why the issue remains closed.
- Open issues:
  -  If the issue is valid, remove the `stale` label from it.
