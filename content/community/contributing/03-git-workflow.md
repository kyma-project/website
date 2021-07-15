---
title: Git workflow
---

This document is the best practice guide that contains the rules to follow when working with Kyma repositories.

### Basic rules

Each contributor and maintainer in Kyma must follow this workflow:

* Work on forked repositories.
* Create branches on the fork and avoid working directly on the `main` branch.
* Squash and rebase your commits before you merge your pull request.

### Benefits

The unified workflow has the following benefits:
* It encourages external contribution.
* The history of commits and merges is clean and readable.
* There are fewer merge conflicts and, when they appear, they are easier to solve.

## Prepare the fork

A fork is a copy of the repository from which you raise pull requests to propose changes to the original repository.
The unified Kyma contribution workflow that bases on forks allows both the members of the Kyma organization and the external contributors to contribute code and content through the same process. This keeps the main repositories clean as contributors create branches only on the forked repositories.

>**NOTE:** This guide aims to explain how to work with forks on your local copy of the repository. In case you are a contributor who suggests minor changes using GitHub UI, it is recommended to use a [Pull bot](https://probot.github.io/apps/pull/). This bot keeps your fork up to date by creating and merging a pull request with latest changes into the `main` branch of your fork.

### Steps

>**NOTE:** The document refers to the original repository as the upstream repository and to the forked repository as the origin repository.

Fork a Kyma repository, clone it locally and configure the remote before you start to contribute.

>**NOTE:** When you use two-factor authentication, generate an [SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) and add it to your GitHub account. Use the SSH address to clone the forked repository.

Perform these steps when you configure the fork for the first time:

1. Fork a repository.

In GitHub, locate the Kyma repository you want to work on and click the **Fork** button in the upper-right corner of the repository's main page.

2. Clone the fork to your local machine.

To introduce changes locally, clone the forked repository on your local machine. On GitHub repository's main page, select the **Clone and download** option to copy the fork's HTTPS address. Use either the terminal and the `git clone https://github.com/{your-username}/{your-fork-name}.git` command or the Git GUI to clone the forked repository.  

3. Add a Git remote for the original repository.

Configure a remote repository that points to the upstream repository. This allows you to synchronize changes you make on the fork with the original repository.

In the terminal, navigate to the location of your fork and perform the following steps:

-  Run the `git remote -v` command to list the current configured remote repository for your fork.

The result is as follows:

```
origin  https://github.com/{your-username}/{your-fork}.git (fetch)
origin  https://github.com/{your-username}/{your-fork}.git (push)
```
See the example:
```
origin	https://github.com/i000000/community.git (fetch)
origin	https://github.com/i000000/community.git (push)
```

- Specify a new remote upstream repository to synchronize with the fork:

```
git remote add upstream https://github.com/{original-owner}/{original-repository}.git
```
See the example:

```
git remote add upstream https://github.com/kyma-project/community.git
```

- Verify the new upstream repository using the `git remote -v` command.

The result is as follows:

```
origin    https://github.com/{your-username}/{your-fork}.git (fetch)
origin    https://github.com/{your-username}/{your-fork}.git (push)
upstream  https://github.com/{original-owner}/{original-repository}.git (fetch)
upstream  https://github.com/{original-owner}/{original-repository}.git (push)
```
4. Run the `git fetch --all` command to fetch all remote branches.

5. Set up the local `main` branch to track the remote `main` branch from the upstream repository:

```
git branch -u upstream/main main
```

Now, each time you rebase or check out the `main` branch, you refer to the `main` branch of the upstream repository.

To verify that your local `main` branch points to the `upstream/main`, run the `git branch -vv` command.

The result is similar to the following:

```
* main           c2226e0 [upstream/main] Update the README.md document
```

## Contribute

After you set up your fork, start contributing code and content.

Follow these steps:

1. Create a branch on your fork.

2. Commit changes.

Always provide clear commit messages to track commit changes easier.

3. Push the changes.

Push the changes to the remote forked repository. Use the Git GUI or the terminal.

>**NOTE:** Before you push local changes, make sure you are on the branch you are currently working on. Do not push any changes from the `main` branch.

If you push local changes from the terminal to your remote fork for the first time, use this command:
```
git push -u origin {branch-name}
```

Use the `git push` command to push any further commits made on your local branch to a remote repository.  

4. Open a pull request.

Create a pull request from the branch of your forked repository to the `main` branch of the upstream repository and wait for the maintainers' review.

In each pull request:

- Include a description or a reference to a detailed description of the steps that the maintainer goes through to check if the pull request works and does not break any other functionality.

  Subject line:
  - Include a short description of changes made.
  - Use the imperative mood.
  - Limit the line to 50 characters.
  - Capitalize it.
  - Do not end the subject line with a period.

  Pull request body:
  - If you made multiple changes and the changes refer to different files, provide details in the pull request body.
  - Use the body to explain what and why, rather than how.
  - Use bullet points for a list of items.
  - List any side effects or other unintuitive consequences of this change.

- Put references to any related issues at the end of the pull request body. For example, write `Resolves #123`, `Fixes #43`, or `See also #33`.
- Make sure that the [**Allow edits from maintainers**](https://help.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) option is selected to allow upstream repository maintainers, and users with push access to the upstream repository, to commit to your forked branch.
- Choose at least one `area/{capability}` label from the available list and add it to your pull request to categorize changes you made. Labels are required to include your pull request in the `CHANGELOG.md` file, and classify it accordingly.

> **NOTE:** Steps 5 and 6 are optional. Follow them if you have merge conflicts on your pull request.

5. Squash your commits.

Follow these steps:

```
$ git log # Check the log for the commits history and get the number of your commits that you need to squash. Do not squash commits that are not yours.
```
Press `q` to exit the log.

```
$ git rebase HEAD~{number} -i # Enter the interactive mode to squash the number of commits. For example, to enter interactive mode and squash the last three commits:
$ git rebase HEAD~3 -i
 ```

Leave the top commit, and squash the remaining ones by changing the `pick` command to `squash`. To change the command, type `cw` and then enter `s` in place of `pick`. Press `esc` to exit the insert mode, move to the line with the next commit, and enter `.` to make the same change there. Repeat the same action with all the remaining commits. When you finish, save the changes and exit the editor by pressing `:wq`.

This process squashes all your commits into the top one. Now you can adjust the commit message. Enter the insert mode by typing `i` and change the commit message. The first line is the commit subject. If you want to provide more details, add the commit body in the next lines. Always separate the commit subject from the commit body with a blank line. When you finish, press `esc` to exit the insert mode. Then save the changes and exit the editor by typing `:wq`.

See how to squash your commits step-by-step in this video:

![Squash](./assets/squash.gif)

6. Rebase the `main` branch.

After you squash commits on your branch into one commit, reapply it on the top of the `main` branch. Follow this process:

```
$ git checkout main # Switch to the main branch.
$ git pull # Update the main branch by pulling all changes.
$ git checkout {branch-name} # Switch back to your branch.
$ git rebase main # Reapply commits on the top of the main branch.
$ git push -f # Update your remote branch with the local changes.
```

> **NOTE:** When you use the `git push-f` command, make sure you do not work on a branch simultaneously with another person.

7. Merge your pull request.

Use GitHub to merge the pull request. If you are an external contributor, contact the repository maintainers specified in the `CODEOWNERS` file to do the merge.

>**NOTE:** If there are at least two contributors who add commits to the pull request, contact the repository administrators to enable the **Rebase and merge** option temporarily. It allows you to merge the pull request with the number of commits that corresponds to the number of its contributors.

## Keep your branch up to date

Perform these actions if you work on a branch for a long period of time and you want to update it locally with changes from the upstream repository.

Systematically incorporate changes from the `main` branch into your branch. To keep your branch up to date, use the `git rebase main` command as described in the following flow:

```
$ git checkout main # Switch to the main branch.
$ git pull # Update the main branch by pulling all changes.
$ git checkout {branch-name} # Switch back to your branch.
$ git rebase main # Reapply commits on the top of the main branch.
```

See how to rebase the `main` branch step-by-step in this video:

![Rebase](./assets/rebase.gif)

>**NOTE:** Do not merge the `main` branch into another branch as it can make latter rebase not feasible.
