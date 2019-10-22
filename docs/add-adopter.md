# Add adopter

Follow these steps to add a new adopter of Kyma on the website:

1. Fork repository and create new branch in your forked repo.
2. Update the `adopters.yaml` file in `content/adopters` folder with new list item with information about your company. See under the list for more information.
3. Make a pull request.
4. Wait for the review.
5. After the merge, the site rebuilds automatically and the your company appears on `Used by` in landing page of our website.

The each element of list in `adopters.yaml` file should have the following format:

``` yaml
- websiteUrl: {WEBSITE_URL}
  url: {URL}
  logo: {LOGO}
  content: {CONTENT}
```

Replace these parameters with real values:

- `{WEBSITE_URL}` is an url to your company website.
- `{URL}` is an url to case study written on your company or our blog.
- `{LOGO}` is a path to logo of your company. It can be as relative path to image provided with PR in `content/adopters/logos` folder or path to external source.
- `{CONTENT}` is a short brief about feelings from adopting Kyma in your business. Only pure text and maximum 140 characters.

> **NOTE**: If you have a blog post in our blog, then `{URL}` should be as a relative link to appropriate blog post with `/blog` prefix, for example `/blog/2018/7/24/introduction-project-kyma/`.

### Examples

``` yaml
- websiteUrl: "https://company.com"
  url: "https://company.com/blog/kyma-rocks"
  logo: "./logos/company.svg"
  content: "Kyma rocks!"
```

``` yaml
- websiteUrl: "https://company.com"
  url: "/blog/2020/1/1/kyma-rocks/"
  logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  content: "Kyma rocks!"
```
