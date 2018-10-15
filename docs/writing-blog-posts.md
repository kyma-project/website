# Writing blog posts

Follow these steps to add a new post on the website:

1. Create a new file in the `src/blog-posts` folder with a filename following the `{NUMBER}-{NAME}.md` format.
2. Prepare the content.
3. Make a pull request.
4. Wait for the review.
5. After the merge, the site rebuilds automatically and the blog post appears.

The blog post should have the following format:

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

Replace these parameters with real values:

- `{ADDRESS}` is the last part of the site's address in the location bar. For example, if you want your blog post to appear under `https://kyma-project.io/blog/some-address`, the second line should look like this: `path: /blog/some-address`.
- `{DATE}` is the date when you want your blog post to appear on the website. Use the `YYYY-MM-DD` date format.
- `{AUTHOR}` is your name with an optional position name.
- `{CONTENT}` is written in Markdown and/or HTML.

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

## Add an image to content

To add the image to your blog post, copy the desired image to the `src/blog-posts/assets` folder and write:

```
![{ALT_TITLE}](./assets/{IMAGE_FILENAME} "{TEXT_WHILE_HOVERING}")
```

Replace these parameters with real values:

- `{ALT_TITLE}` is the text which appears if the image cannot appear for some reason.
- `{TEXT_WHILE_HOVERING}` is the text which appears when you move the mouse pointer over the image. This parameter is optional.

You can use a link instead of a relative path to the image.

Example:

```
![Kyma logo](https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png "Hover over me!")
```

![Kyma logo](https://raw.githubusercontent.com/kyma-project/website/master/static/android-chrome-192x192.png "Hover over me!")

You can also use HTML tags to show and position images:

```HTML
<img src="{RELATIVE_PATH_OR_LINK}" >
```

See the example usage with mixed elements:

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

In your Markdown documents, use the following snippet:

```Markdown
[{TEXT}]({RELATIVE_PATH_TO_FILE})
```

If you link to other Markdown documents, you can optionally link to a particular paragraph, as in this example:

```Markdown
[README](../README.md#development)
```

[README](../README.md#development)

### Link to documentation

Use this pattern to add links to other documents:

```
[Overview - In a nutshell](https://kyma-project.io/docs/latest/root/kyma#overview-in-a-nutshell)
```

[Overview - In a nutshell](https://kyma-project.io/docs/latest/root/kyma#overview-in-a-nutshell)
