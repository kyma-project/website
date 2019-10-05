# Writing case study

Follow these steps to add a new case study on the website:

1. Create a new folder in the `content/adopters` folder with a name of your company.
2. Create a file named `index.md` in the newly created directory.
3. Prepare the content in a Markdown file.
4. Make a pull request.
5. Wait for the review.
6. After the merge, the site rebuilds automatically and the your case study appears on `Adopters` in landing page of our website.

## Add a case study

The case study should have the following format:

``` yaml
---
url: {URL}
logo: {LOGO}
title: {TITLE}
info:
  company: {COMPANY}
  location: {LOCATION}
  industry: {INDUSTRY}
---

{CONTENT}
```

Replace these parameters with real values:

- `{URL}` is an url to your company website or case study written on your company blog.
- `{LOGO}` is a path to logo of your company. It can be as relative path to svg provided with markdown file or path to external source.
- `{TITLE}` is a title of case study.
- `{COMPANY}` is the name of your company.
- `{LOCATION}` is the location of your company.
- `{INDUSTRY}` is a name of industry to which your company belongs.
- `{CONTENT}` is written in Markdown and/or HTML. It is a content of case study or feelings from early adopting Kyma in your business.

> **NOTE:** If you want point to case study written in external source (for example, as is mentioned, on your company blog), please provide only `{URL}` and `{LOGO}` fields.

### Example 1

``` yaml
---
url: "https://company.com"
logo: "./company.svg"
title: "Once upon a time in a cloud native world"
info:
  company: "Company"
  location: "Global"
  industry: "Entertainment"
---

Kyma rocks! But Luigi sucks.
```

### Example 2

``` yaml
---
url: "https://company.com/blog/kyma-rocks"
logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
---
```

### Example 3

``` yaml
---
url: "https://company.com"
logo: "./company.svg"
---
```

## Add an image to content

To add the image to your blog post, copy the desired image to the folder with the `index.md` file and write:

``` markdown
![{ALT_TITLE}](./{IMAGE_FILENAME} "{TEXT_WHILE_HOVERING}")
```

Replace these parameters with real values:

- `{ALT_TITLE}` is the text which appears if the image cannot appear for some reason.
- `{TEXT_WHILE_HOVERING}` is the text which appears when you move the mouse pointer over the image. This parameter is optional.

You can use a link instead of a relative path to the image.

Example:

``` markdown
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
