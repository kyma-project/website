# Writing case study

Follow these steps to add a new case study on the website:

1. Create a new folder in the `content/adopters` folder with a name of your company.
2. Create a file named `index.md` in the newly created directory.
3. Prepare the content in a Markdown file.
4. Make a pull request.
5. Wait for the review.
6. After the merge, the site rebuilds automatically and the your case study appears on `Used by` in landing page of our website.

## Add a case study

The `index.md` file should have the following format:

``` yaml
---
websiteUrl: {WEBSITE_URL}
url: {URL}
logo: {LOGO}
---

{CONTENT}
```

Replace these parameters with real values:

- `{WEBSITE_URL}` is an url to your company website.
- `{URL}` is an url to case study written on your company or our blog.
- `{LOGO}` is a path to logo of your company. It can be as relative path to svg provided with markdown file or path to external source. Extension of logo must be `svg`. Otherwise the site will not build properly.
- `{CONTENT}` is written in Markdown and/or HTML. It is a short part of case study or feelings from early adopting Kyma in your business. Only pure text, without images and other content and maximum 256 characters.

> **NOTE**: If you have a blog post in our blog, then `{URL}` should have format `/blog/{appropriate-post}`.

### Examples

``` yaml
---
websiteUrl: "https://company.com"
url: "https://company.com/blog/kyma-rocks"
logo: "./company.svg"
---

Kyma rocks!
```

``` yaml
---
websiteUrl: "https://company.com/blog/kyma-rocks"
url: "https://company.com/blog/kyma-rocks"
logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
---

Kyma rocks!
```
