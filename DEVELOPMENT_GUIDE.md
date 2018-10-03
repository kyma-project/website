## How to write blog post?

1. Create a new file in `src/blog-posts` with filename `NUMBER-NAME.md`, where `NUMBER` indicates in what order blog posts appear; `NAME` is up to you.
2. Prepare content
3. Make a pull request
4. Wait for review
5. After merge site will be rebuilt automatically, and you blogpost will appear in our site.

Blog post should have following format:

```
---
path: "/blog/{ADDRESS}"
date: "{DATE}"
author: "{AUTHOR}"
tags:
[
   "{TAG_1}",
   "{TAG_2}",
   "{TAG_3}",
   ...
]
title: "{TITLE}"
---

{CONTENT}
```

Where:

- `ADDRESS` is last part of site's address in location bar, for example if you want your blog post to appear under `https://kyma-project.io/blog/some-address`, then second line looks must like this: `path: "/blog/some-address"`
- `DATE` is date of publication of your blog post, in YYYY-MM-DD` format
- `AUTHOR` is your name with optional title
- `CONTENT` is written in Markdown ()

Example:

```
---
path: "/blog/pseudo-latin"
date: "2018-10-02"
author: "Cicero"
tags:
[
   "Lorem",
   "Ipsum",
   "Dolor",
   "Sit",
   "Amet"
]
title: "Latin's not dead"
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat interdum eros a malesuada. Proin porttitor, leo eu dignissim posuere, ante nibh aliquam ipsum, pharetra pharetra nunc libero eu massa.
```

> **NOTE:** There is no comma after last tag.

## How to add documentation?

1. Fork [kyma-project/kyma](https://github.com/kyma-project/kyma/)
2. Add documentation file written in Markdown in appropriate folder in [docs](https://github.com/kyma-project/kyma/tree/master/docs) folder.

Add this file in `/docs/{DIRECTORY}/docs`, where content fits this schema:

```
---
title: {YOUR_TITLE}
---

{CONTENT_WRITTEN_IN_MARKDOWN}
```

If you want your documentation to appear under specific subsection inside main section, change it to:

```
---
title: {YOUR_TITLE}
type: {SECTION_TITLE}
---

{CONTENT_WRITTEN_IN_MARKDOWN}
```

//note -> add two pics with comparison?

> **NOTE:** Omit curly braces in actual document.

2. Make pull request
3. Wait for review
4. After merge of your documentation into `kyma` repository, ask
   //do what exactly

## How to modify content on the landing page?

Modify files in `src/locales` accordingly. Structure of this page is defined in `src/pages/index.js` and `src/components`.

## Project structure

The repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── docs-navigation-builder     # Used for creating navigation file out of documentation
  ├── scripts                     # Scripts used in Continous Integration; don't use locally
  ├── src                         # Source code of website
  │    ├── blog-posts             # Blog posts
  │    ├── components             # Structure of various parts of website
  │    │       ├── blog           # Structure and styles of blog posts
  │    │       ├── content        # Styled content of blog posts
  │    │       ├── cookiee        # Cookie banner
  │    │       ├── docs           # Structure and styles of documentation
  │    │       ├── landing        # Structure and styles of parts of landing page
  │    │       ├── layout         # General strucuture and styles of website
  │    │       ├── loading        # Loading indicator
  │    │       └── translation    # Language switcher
  │    ├── config                 # Configuration files
  │    ├── constants              # Constants used throught project
  │    ├── helpers                # Various helper functions
  │    ├── locales                # Localization files
  │    ├── pages                  # Main pages displayed on website
  │    └── templates              # template files, e.g. for blog post
  └── static                      # Documentation, fonts and images
```

## How docs part is populated from `kyma-project/docs`?

It is done automatically during build of website using `Jenkinsfile`, when build is started with `DOCS_VERSION` flag.

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
