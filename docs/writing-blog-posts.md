# How to write blog post?

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
