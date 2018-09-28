## How can I contribute?

To contribute to this project, follow the rules from the general [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) document in the `community` repository.

## How to add features?

Refer to `README.md`, particularly to [Installation](README.md#Installation) paragraph.

## How to write blog post?

To write blog post you need to create new file in `src/blog-posts` directory, with filename `NUMBER-NAME.md`, where `NUMBER` indicates in what order blog posts appear; `NAME` is up to you.

Blog post should have following format:

```
---
path: "/blog/ADDRESS"
date: "YYYY-MM-DD"
author: "AUTHOR"
tags:
[
   "tag1",
   "tag2",
   "tag3",
]
title: "YOUR TITLE"
---

CONTENTS OF YOUR BLOG POST
```

## How to add documentation

Contribute to [kyma-project/kyma/docs](https://github.com/kyma-project/kyma/tree/master/docs).

## How to modify content on the landing page?

Modify files in `src/locales` accordingly. Structure of this page is defined in `src/pages/index.js` and `src/components`.

## Project structure

The repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── docs-navigation-builder     # Used for creating navigation file out of documentation
  ├── scripts                     # Scripts used in Continous Integration; don't use locally
  ├── src                         # Source code of website
       ├── blog-posts             # Blog posts
       ├── components             # Structure of various parts of website
       ├── config                 # Configuration files
       ├── constants              # Constants used throught project
       ├── helpers                # Various helper functions
       ├── locales                # Localization files
       ├── pages                  # Main pages displayed on website
       └── templates              # template files, e.g. for blog post
  └── static                      # Documentation, fonts and images
```

## How docs part is populated from `kyma-project/docs`?

It is done automatically while building website using `Jenkinsfile`, when build is started with `DOCS_VERSION` flag.

## How to contribute as a blog provider or content provider? How to get my things on [kyma-project.io](https://kyma-project.io/)?

Follow these steps to contribute your content:

- Read [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md) and [Contribution](https://github.com/kyma-project/community#contribution) paragraph from `README.md` in in `kyma-project/community` repository.
- Fork `kyma-project/kyma` for documentation or `kyma-project/website` as blog provider.
- Fill in pull request with your desired content.
- Wait for review.

---

## Step by step instruction of how to develop and what parts to do when?

What? Is this section neccesary?

## What are requirements of good contribution?

What? Is this section neccesary?
