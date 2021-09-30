---
title: Contributing rules
---

As a Kyma contributor, you must follow certain guidelines and rules.

## Guidelines

Go to the **Guidelines** section to read about rules and tips for providing [content](/guidelines/content/) and [code](/guidelines/technicalities/) to the Kyma repositories. Also, learn how to create a new [repository](/guidelines/repository/), and how the [release process](/guidelines/release/) looks in Kyma. Make your life easier using various document types [templates](/guidelines/templates/) prepared for those who would like to contribute.

## Documentation types

Read an [overview](/guidelines/templates/#overview-overview) of document templates used in specific Kyma repositories. The templates themselves are collected in the [`resources`](https://github.com/kyma-project/community/tree/main/guidelines/templates/resources/) subfolder in the `community` repository.

Extend the list whenever you define a new template for other document types. Make sure to update one of the tables in the [**Document types templates**](/guidelines/templates/#document-types-templates-document-types-templates) document after you add new templates to the [`resources`](https://github.com/kyma-project/community/tree/main/guidelines/templates/resources/) subfolder.

## Agreements and licenses

Read the subsections to learn the details of the agreements to submit and licences to comply with as a Kyma contributor.

### Individual contributor license agreement

As a Kyma contributor, you must accept the Kyma project's licenses and submit the
[Individual Contributor License Agreement](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8) before you contribute code or content to any Kyma repository. Kyma maintainers will not accept contributions made without such consent. This applies to all contributors, including those contributing on behalf of a company. If you agree to the content of the Agreement, click the link posted by the CLA assistant as a comment to the pull request (PR). The CLA assistant saves your decision for future contributions and notifies you if there is any change to the CLA in the meantime.

### Corporate contributor license agreement

Employees of a company who contribute code need to submit one company agreement in addition to the individual agreement above. This is mainly for the protection of the contributing employees.

An authorized company representative needs to download, fill in, and print
the [Corporate Contributor License Agreement](./assets/SAP%20Corporate%20Contributor%20License%20Agreement%20(5-26-15).pdf) form. Scan it and send it to [info@kyma-project.io](mailto:info@kyma-project.io). The form contains a list of employees who are authorized to contribute on behalf of your company. To report any changes on the list, contact [info@kyma-project.io](mailto:info@kyma-project.io).

## Contribution rules

If you are a contributor, follow these basic rules:

* The contribution workflow in all Kyma repositories bases on the principles of the [GitHub flow](https://guides.github.com/introduction/flow/). Thus, the `main` branch is the most important one. Avoid working directly on it. When you work on new features or bug fixes, work on separate branches.
* Work on forks of Kyma repositories.
* You can merge a PR if you receive an approval from at least one code owner from each part of the repository to which you contribute in your PR.

Every contributor commits to the following agreement:

* In every PR, include a description or a reference to a detailed description of the steps that the maintainer goes through to check if a PR works and does not break any other functionality.
* Provide clear and descriptive commit messages.
* Label your PRs.
* Follow the accepted documentation rules and use appropriate templates.
* As the creator of the PR, you are responsible for ensuring that the PR follows the correct review and approval flow.

## Contribution process

This section explains how you can contribute code or content to any Kyma repository, propose an improvement, or report a bug. The contributing process applies both to the members of the Kyma organization and the external contributors.

### Contribute code or content

To contribute code or content to a given Kyma repository, follow these steps:

1. Make sure that the change is valid and approved. If you are an external contributor, **open a GitHub issue** before you make a contribution.
2. Fork the Kyma repository that you want to contribute to.
3. Clone it locally, add a remote upstream repository for the original repository, and set up the `main` branch to track the remote `main` branch from the upstream repository. See the [**Git Workflow**](#git-wokflow-git-wokflow) document to learn how to configure your fork.
4. Create a new branch out of the local `main` branch of the forked repository.
5. Commit and push changes to your new branch. Create a clear and descriptive commit message in which you specify what you have changed. See the [**Git workflow**](#git-wokflow-git-wokflow) document for commit message guidelines.
6. Create a PR from your branch on the forked repository to the `main` branch of the original, upstream repository. Fill in the PR template according to instructions.
7. Read and accept the Contributor Licence Agreement (CLA).
8. If there are merge conflicts on your PR, squash your commits and rebase the `main` branch.
9. In your PR:
- Provide a reference to any related GitHub issue.
- Make sure that the [**Allow edits from maintainers**](https://help.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) option is selected to allow upstream repository maintainers, and those with the push access to the upstream repository, to commit to your forked branch.
- Choose at least one `area/{capability}` label from the available list and add it to your PR to categorize changes you made. Labels are required to include your PR in the `CHANGELOG.md` file and classify it accordingly.
10. After you create a PR, relevant CI tests need to complete successfully.
- If you are a Kyma organization member, all related CI tests run automatically after you create a PR. If a test fails, check the reason by clicking the **Details** button next to the given job on your PR. Make the required changes and the tests rerun. If you want to run a specific test, add the `/test {test-name}` or `/retest {test-name}` comment to your PR. To rerun all failed tests, add the `/retest` comment.
- If you are an external contributor, contact the repository maintainers specified in the [`CODEOWNERS`](https://github.com/kyma-project/community/blob/main/CODEOWNERS) file to review your PR and add the `/test all` comment to your PR to trigger all tests. A Kyma organization member needs to rerun the tests manually each time you commit new changes to the PR.

11. Wait for the Kyma maintainers to review and approve your PR. The maintainers can approve it, request enhancements to your change, or reject it.

> **NOTE:** The reviewer must check if all related CI tests have completed successfully before approving the PR.

13. When the maintainers approve your change, merge the PR. If you are an external contributor, contact the repository maintainers specified in the `CODEOWNERS` file to merge the PR for you.

### Report an issue

If you find a bug to report or you want to propose a new feature, go to the GitHub issue tracker of a given repository and create an issue. If you are not certain which repository your bug or feature relates to, raise it on the `kyma` repository.

> **NOTE:** The repository maintainers handle only well-documented, valid issues that have not been reported yet. Before you create one, check if there are no duplicates. Provide all details and include examples. When you report a bug, list the exact steps necessary to reproduce it.

See the [**Issues workflow**](/governance/#issues-workflow-issues-workflow) document for details on issues triage and processing workflow.

> **NOTE:** The community is relentless about Kyma security. To report a sensitive security issue, send an email with details directly to [kyma-security@googlegroups.com](mailto:kyma-security@googlegroups.com) instead of using a public issue tracker.

## Maintenance rules

Every maintainer reviews each contribution according to the rules listed in this document.

Although it is the responsibility of the owner of the PR to ensure that the maintainers review and approve the PR, maintainers need to coordinate the overall number of unreviewed and unapproved PRs in their queue, and, if required, take appropriate measures to handle them effectively.

To learn more about maintainers' responsibilities and rules for appointing new maintainers, and removing the existing ones, refer to the [**Kyma working model**](/governance/#kyma-working-model-kyma-working-model) document.

## Maintainers

To identify the maintainers of particular parts of your repository, see the [`CODEOWNERS`](https://github.com/kyma-project/community/blob/main/CODEOWNERS) file in the root directory of each Kyma repository.
