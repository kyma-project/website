# Documentation

## Overview

This directory contains the following documents that relate to the project:

- [Project Structure](./project-structure.md) describes the structure of this repository
- [Writing blog posts](./writing-blog-posts.md) describes how to write blog posts
- [Writing docs](./writing-docs.md) describes how to write docs for [kyma-project.io/docs](https://kyma-project.io/docs#)

## General tips

### How to modify content on the landing page?

Modify files in `src/locales` accordingly. Structure of this page is defined in `src/pages/index.js` and `src/components`.

### How docs part is populated from `kyma-project/docs`?

It is done automatically during build of website using `Jenkinsfile`, when build is started with `DOCS_VERSION` flag.

### How to contribute as a blog provider or content provider? How to get my things on [kyma-project.io](https://kyma-project.io/)?

Follow these steps to contribute your content:

- Read [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) and [Contribution](https://github.com/kyma-project/community#contribution) paragraph from `README.md` in in `kyma-project/community` repository.
- Fork `kyma-project/kyma` for documentation or `kyma-project/website` as blog provider.
- Fill in pull request with your desired content.
- Wait for review.
