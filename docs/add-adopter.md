# Add a new adopter

Follow these steps to add information on a new Kyma adopter to the **Used by** section on the website's landing page:

1. Fork the `website` repository and create a new branch in your fork.

   > **NOTE:** If you don't want to fork the repository, create an issue using the **Adopter request** [template](https://github.com/kyma-project/website/issues/new?template=adopter-request.md), and one of the [repository owners](../CODEOWNERS) will create a PR with your case study.

2. Update the `adopters.yaml` file in the `content/adopters` folder with a new list item with your company's details.

   Each element of the list in the `adopters.yaml` file should have the following format:

   ``` yaml
   - websiteUrl: {WEBSITE_URL}
     url: {URL}
     logo: {LOGO}
     content: {CONTENT}
   ```

   Replace these parameters with real values:

   - `{WEBSITE_URL}` is a URL to your company's website.
   - `{URL}` is a URL to your case study published either on your company's website or our blog.
   - `{LOGO}` is a path to your company's logo. It can be either a relative path to an image added under the `content/adopters/logos` folder in your PR or a path to an external source.
   - `{CONTENT}` is a short brief about feelings from adopting Kyma in your business. You can only add text and a maximum of 140 characters.

   > **NOTE:** If your case study is a post on our blog, then `{URL}` should be a relative link to the appropriate post with the `/blog` prefix. For example, add `/blog/2018/7/24/introduction-project-kyma/`.

   See these examples for reference:

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

3. Make a pull request.
4. Wait for the review.
5. After the merge, the site rebuilds automatically and your company's case study appears in the **Used by** section on the landing page.