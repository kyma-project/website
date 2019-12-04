# Add a new Kyma user

Follow these steps to add information on a new Kyma user to the **Used by** section on the landing page:

1. Fork the `website` repository and create a new branch in your fork.

   > **NOTE:** If you don't want to fork the repository, create an issue using the **New user request** [template](https://github.com/kyma-project/website/issues/new?template=new-user-request.md), and one of the [repository owners](../CODEOWNERS) will add it to the website for you.

2. Update the [`adopters.yaml`](/content/adopters/adopters.yaml) file in the `content/adopters` folder with a new list item containing your company's details.

   Each element of the list in the `adopters.yaml` file should have the following format:

   ```yaml
   - websiteUrl: { WEBSITE_URL }
     url: { URL }
     logo: { LOGO }
     content: { CONTENT }
     cssProperties:
        {CSS_PROPERTY}: {CSS_VALUE}
        ...
   ```

   Replace these parameters with real values:

   - `{WEBSITE_URL}` is a URL to your company's website.
   - `{URL}` is a URL to your case study published either on your company's website or on our blog. This field is optional.
   - `{LOGO}` is a path to your company's logo. It can be either a relative path to an image added under the `content/adopters/logos` folder in your PR or a path to an external source.
   - `{CONTENT}` is a short description of your feelings about adopting Kyma in your company. Add only text with a maximum of 144 characters.
   - `{CSS_PROPERTY}` and `{CSS_VALUE}` are property/value pair. See [that](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference) and [that](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) documents for reference. This field is optional - if not used remove the `cssProperties` key.

   > **NOTE:** If your case study is a post on our blog, `{URL}` should be a relative link to the appropriate post with the `/blog` prefix. For example, add `/blog/2018/7/24/introduction-project-kyma/`.

   See these examples for reference:

   ```yaml
   - websiteUrl: "https://company.com"
     url: "https://company.com/blog/kyma-rocks"
     logo: "./logos/company.svg"
     content: "Kyma rocks!"
     cssProperties:
       padding: 10px 0
   ```

   ```yaml
   - websiteUrl: "https://company.com"
     logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
     content: "Kyma rocks!"
   ```

3. Make a pull request.
4. Wait for the review.
5. After the merge, the site rebuilds automatically and your company's case study appears in the **Used by** section on the landing page.
