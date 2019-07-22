# Generating changelog with pull request labels

Created on 2018-08-06 by Paweł Kosiec (@pkosiec).

## Status

Proposed on 2018-08-06.

## Key assumptions

- Open source community wants as much transparency as possible.
- Changelog should be easy to read.
- Changelog should be available for developers with offline access, if they have cloned the repository.
- Defining changes by contributors should be as easy as possible.

## Proposed solution

The proposed solution is to categorize changes using the pull request labels.

### Workflow

- All developers should categorize their changes with the PR labels.
- All changes with the specific changelog-related labels are included in the changelog.
- Pull requests should have a title written in the imperative mood, just like commit messages. The title will be included in the changelog, along with the author and a link to the particular PR.
- No label on a pull request means that the change will not be included in the changelog.

### Result

- The changelog is written in the form of a `CHANGELOG.md` file and put into the GitHub release description via [GitHub API](https://developer.github.com/v3/repos/releases/#create-a-release) for the specific Git tags.
- All changes are grouped by the selected labels.

Desired output looks as follows:
- [example GitHub releases](https://github.com/lerna/lerna-changelog/releases)
- [example CHANGELOG.md](https://github.com/lerna/lerna-changelog/blob/master/CHANGELOG.md)

### Labels

For now, no new labels are introduced. Instead, the Kyma members reuse the **`area/`** labels from the accepted proposal. This means that all changes are grouped by the area. For example: `installation`, `security`.

**Example:**

> ### Installation
> - Sample change 1
> - Sample change 2
>
> ### Security
> - Sample change 1
> - Sample change 2

In the future, nested grouping for the changelog can be introduced. The first level will be the **change type**, and the second one, the **area of the change**. **Change type** will be marked with the additional prefixed labels. Choosing the right prefix will be discussed later.

**Example:**

> ### Bug fixes
> **Installation**
> - Sample change 1
> - Sample change 2
>
> **Security**
> - Sample change 1
> - Sample change 2
>
> ### Features
> **Installation**
> - Sample change 1
> - Sample change 2
>
> **Security**
> - Sample change 1
> - Sample change 2

## Pros

- One place to define the general changes in a pull request. This place is the pull request title, usually prefilled with commit message, if there is just only one commit.
- Selecting the type of change is a no-brainer. The contributor expands the list of the available PR labels and chooses the right category.
- The [unlabeled pull requests](https://github.com/kyma-project/kyma/issues?q=is%3Aopen+is%3Apr+no%3Alabel) can be filtered and labelled to generate a complete changelog. It is easy to view the full list of PRs and check if they are named correctly. You can also adjust the titles, which is applicable also for the closed pull requests.
- It enforces the user to make a single type of change in a pull request.
- There are many tools available to generate the changelog from the pull requests labels.

## Cons

- More detailed changes in the changelog. For example, if there is a bigger feature which needs multiple PRs, it will be visible as multiple bullet points.
- Pull request authors and reviewers can forget about adding a label to categorize the change. Anyway, even closed pull requests can be edited before generating the changelog. 

## Tools

The changelog can be generated during the CI build job. There are many tools for generating the changelog.

### [Lerna Changelog](https://github.com/lerna/lerna-changelog)

- Very simple tool.
- Generates the changelog with the PR links and authors to standard output. See the example [here](https://github.com/lerna/lerna-changelog/releases). It can be easily piped to a `CHANGELOG.md` file and as a GitHub release.
- Allows to define custom labels.
- Can be run with parameters to generate a full changelog or partial one, for one specific application version.
- Uses GitHub API.

### [GitHub Changelog Generator](https://github.com/github-changelog-generator/github-changelog-generator)

- Generates a changelog based on GitHub issues and PRs.
- Many configuration options.
- No custom labels for PRs are supported. There are only three sections in the generated changelog: `bug`, `enhancement`, and all other changes.
- Uses GitHub API.
- Written in Ruby, which can cause difficulty with the contribution.
