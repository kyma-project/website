# Writing blog posts

Follow these steps to add a new post on the website:

1. Fork the `website` repository and create a new branch in your fork.
2. Create a new folder in the `content/blog-posts` folder with a name following the `{DATE}-{ADDRESS}` format.
3. Create a file named `index.md` in the newly created directory.
4. Prepare the content in a Markdown file.
5. Make a pull request.
6. Wait for the review.
7. After the merge, the site rebuilds automatically and the blog post appears.

The blog post should have the following format:

``` yaml
---
title: {TITLE}
author:
  name: {AUTHOR}
tags:
  - {TAG_1}
  - {TAG_2}
  - {TAG_3}
  ...
---

{CONTENT}
```

Replace these parameters with real values:

- `{DATE}` is your blog post's publication date, in the `YYYY-MM-DD` format.
- `{ADDRESS}` is the last part of the site's address in the location bar. For example, if you want your blog post to appear under `https://kyma-project.io/blog/{DATE}/{ADDRESS}`, the name of your blog post folder should end with `{ADDRESS}`. For example, name the folder **2019-02-14-release-notes-07** to point to the `https://kyma-project.io/blog/2019/02/14/release-notes-07` link on the website.
- `{AUTHOR}` is your name with an optional position name.
- `{CONTENT}` is written in Markdown and/or HTML. The content must include the `<!-- overview -->` comment which indicates the part of the blog post that will be displayed on the main page. The **Read more** button appears at the end of the paragraph.

>**NOTE:** The `<!-- overview -->` comment cannot be placed at the beginning of the blog post. In such a case, the **Read more** button appears straight after the title of the blog post and the content itself is not displayed.

Example:

``` yaml
---
title: "Latin's not dead"
author:
  name: "Cicero, Roman Philosopher"
tags:
  - Lorem
  - Ipsum
  - Dolor
  - Sit
  - Amet
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<!-- overview -->

Integer volutpat interdum eros a malesuada. Proin porttitor, leo eu dignissim posuere, ante nibh aliquam ipsum, pharetra pharetra nunc libero eu massa.
```

---

## Determine the blog post type

When writing a post you can determine what type it should be. By specifying the type, the content of the post is automatically adapted to the template of the given type. Specifying the type is optional. If you don't provide this information, the post renders in the default way.

To specify a type, you must provide it as metadata in the blog post:

``` yaml
---
...
type: {POST_TYPE}
{ADDITIONAL_FIELDS}
...
---
```

Currently, the [release](#release-type) type is the only blog post type.

### Release type

To create a release blog post, write `release` in place of `{POST_TYPE}` and replace `{ADDITIONAL_FIELDS}` with these details:

``` yaml
releaseTag: {VERSION}
```

where:

- `{VERSION}` is the release Kyma version.

See an example that contains other metadata and the blog post content:

``` yaml
---
title: "Kyma 0.7 Dublin"
author:
  name: "Barbara Szwarc, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "0.7.0"
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<!-- overview -->

Integer volutpat interdum eros a malesuada. Proin porttitor, leo eu dignissim posuere, ante nibh aliquam ipsum, pharetra pharetra nunc libero eu massa.
```

---

## Add an image to content

To add the image to your blog post, copy the desired image to the folder with the `index.md` file and write:

``` Markdown
![{ALT_TITLE}](./{IMAGE_FILENAME} "{TEXT_WHILE_HOVERING}")
```

Replace these parameters with real values:

- `{ALT_TITLE}` is the text which appears if the image cannot appear for some reason.
- `{TEXT_WHILE_HOVERING}` is the text which appears when you move the mouse pointer over the image. This parameter is optional.

You can use a link instead of a relative path to the image.

Example:

``` Markdown
![Kyma logo](https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png "Hover over me!")
```

![Kyma logo](https://github.com/kyma-project/website/blob/master/static/android-chrome-512x512.png "Hover over me!")

However, it is advised to download the image, put it into the folder where the `index.md` file is located, and refer to its relative path instead of an absolute link from the Internet.

You can also use HTML tags to show and position images:

``` HTML
<img src="{RELATIVE_PATH_OR_LINK}" />
```

See the example usage with mixed elements:

``` HTML
<p align="center">
  <img src="./logo.png" width="235">
</p>
```

<!-- markdownlint-disable MD033 -->
<p align="center">
<!-- markdownlint-disable MD033 -->
  <img src="./assets/logo.png" width="235">
</p>

---

## Link between files

### Link to blog posts

Use this pattern to add links to other blog posts:

``` Markdown
[Another blog post](/blog/{DATE}/{ADDRESS})
```

where:

- `{DATE}` is the blog post's publication date, in the `YYYY/MM/DD` format.
- `{ADDRESS}` is the last part of the site's address in the location bar.

Example:

``` Markdown
[Introduction](/blog/2018/07-24/introduction-project-kyma)
```

### Link to documentation

Use this pattern to add links to other documents:

``` Markdown
[Overview - In a nutshell](/docs/{VERSION}/{DOCS_TYPE}/{DOC_TOPIC}/#{HASH})
```

where:

- `{VERSION}` is the version of the referenced documentation.
- `{DOCS_TYPE}` is the type of documentation. The available types are `root` for documents related directly to Kyma, and `components` for the components documentation.
- `{DOC_TOPIC}` is the metadata type of the referenced documentation.
- `{HASH}` is an optional anchor link to the referenced documentation.

Examples:

``` Markdown
[Overview - In a nutshell](/docs/master/root/kyma/#overview-in-a-nutshell)
```

``` Markdown
[Create a bundle](/docs/master/components/helm-broker/#details-create-a-bundle)
```

For posts with release notes, put the release number in place of `{VERSION}`. For example, the reference to the Helm Broker 0.8 documentation looks as follows:

``` Markdown
[Configuration](/docs/0.8/components/helm-broker/#configuration-configuration)
```

For more information on how to write release notes, see [this](https://github.com/kyma-project/community/blob/master/guidelines/content-guidelines/06-release-notes.md) document.
