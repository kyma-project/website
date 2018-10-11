# Writing blog posts

1. Create a new file in `src/blog-posts` with filename following format `{NUMBER}-{NAME}.md`.
2. Prepare content.
3. Make a pull request.
4. Wait for review.
5. After merge site will be rebuilt automatically, and you blog post will appear in our site.

Blog post should have following format:

```
---
path: /blog/{ADDRESS}
date: {DATE}
author: {AUTHOR}
tags:
   - {TAG_1}
   - {TAG_2}
   - {TAG_3}
   ...
title: {TITLE}
---

{CONTENT}
```

Where:

- `ADDRESS` is last part of site's address in location bar, for example if you want your blog post to appear under `https://kyma-project.io/blog/some-address`, then second line looks must like this: `path: /blog/some-address`
- `DATE` is date of publication of your blog post, in `YYYY-MM-DD` format
- `AUTHOR` is your name with optional title
- `CONTENT` is written in Markdown and/or HTML.

Example:

```
---
path: /blog/pseudo-latin
date: 2018-10-02
author: Cicero, Roman Philosopher
tags:
   - Lorem
   - Ipsum
   - Dolor
   - Sit
   - Amet
title: Latin's not dead
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat interdum eros a malesuada. Proin porttitor, leo eu dignissim posuere, ante nibh aliquam ipsum, pharetra pharetra nunc libero eu massa.
```

---

## Add image to content

To add image to your blog post copy desired image to `src/blog-posts/assets` and write:

```
![{ALT_TITLE}](./assets/{IMAGE_FILENAME} "{TEXT_WHILE_HOVERING}")
```

where:

- `{ALT_TITLE}` is text which appears if image cannot appear for some reason
- `{TEXT_WHILE_HOVERING}` is optional

Instead of relative path to image you can also use link.

Example:

```
![Kyma logo](https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png "Hover over me!")
```

![Kyma logo](https://raw.githubusercontent.com/kyma-project/website/master/static/android-chrome-192x192.png "Hover over me!")

You can also use HTML tags to show and position images:

```HTML
<img src="{RELATIVE_PATH_OR_LINK}" >
```

Example usage with mixed elements:

```HTML
<p align="center">
    <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
</p>
```

<p align="center">
    <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
</p>

---

## Link between files

### Link to blog posts and other files

In your Markdown, use following snippet:

```Markdown
[{TEXT}]({RELATIVE_PATH_TO_FILE})
```

If you link to other Markdown files you can optionally link to particular paragraph, as shown in the example:

```Markdown
[README](../README.md#development)
```

[README](../README.md#development)

### Link to documentation

Do it as shown in the example:

```
[Overview - In a nutshell](https://kyma-project.io/docs/latest/root/kyma#overview-in-a-nutshell)
```

[Overview - In a nutshell](https://kyma-project.io/docs/latest/root/kyma#overview-in-a-nutshell)
