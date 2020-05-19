---
title: "Tools, sources, and all the magic behind the Kyma website"
author:
  name: "Maciej Urbanczyk and Karolina Zydek"
tags:
  - graphql
  - netlify
  - gatsby
redirectFrom:
  - "/blog/2020-05-19-kyma-website"
---

Our website, just like success, has many fathers maintaining it from the very first day it was born out of the burning need for a homepage for our soon-to-be-open-sourced Kyma. It evolved in time, in an agile spirit, extended with new views and features that were added when the need arose or an idea for improvement popped into our heads. As much as we love it, we realize it might seem a bit complex, especially for those who would like to contribute to it for the first time. In this post we explain which tools we decided to use, how the website is built, and where all the sources sit - all this aiming to "tame the beast" and bring it a bit closer to you.

<!-- overview -->

## Building tool

When it comes to the tool we wanted to build our website with, we decided to choose a static site generator that would:
- Make the development process easier by providing a set of ready-to-use plugins and templates.
- Provide support for Search Engine Optimization (SEO), increasing our website's visibility on search engines.

Our choice fell on [Gatsby](https://www.gatsbyjs.org/), partially because it is based on React that our frontend developers were used to and particularly fond of. Gatsby also uses GraphQL to query and pull source data, and we already used it for our [Console Backend Service](https://kyma-project.io/docs/components/console/#details-console-backend-service) in Kyma for the communication between Console UI views and k8s resources.

In its initial version, the website was quite simple and almost solely based on the logic provided by Gatsby. Basically, we wrote React components for particular views following Gatsby's tutorials and templates, used the available plugins to extend the data and content. Gatsby then pulled all the data from specified Markdown sources, built, and rendered the content on GitHub pages.

## Deployment tool

Although we used GitHub pages initially to deploy and host our website, we turned to [Netlify](https://www.netlify.com/) that offers a favorable [policy plan](https://www.netlify.com/legal/open-source-policy/) for the open-source projects.

As the website expanded, we simply needed a platform that would meet the needs ahead of us. Netlify managed to do so by offering:

- [Continuous deployment](https://www.netlify.com/blog/2015/09/17/continuous-deployment/) enabling automatic website built triggered by GitHub commits.

- [Deploy previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) built on pull requests, allowing you to detect any rendering issues before they are merged to the master.

- [AWS functions](https://docs.netlify.com/functions/overview/) for running on-demand code triggered by events coming from the GitHub and ZenHub APIs. In Kyma, we use it as a trigger for running the build and deployment of given website views. This function is triggered whenever you:

  - Merge content to the `docs` folder in the `kyma` repository, to the `community` repository, or to the `content` folder in the `website` repository

  - Create a release in the `kyma` repository. This triggers the rebuild of the **Docs** view and triggers a new release switcher.

  ![Release switcher](./release-switcher.png)

  - Add or remove the `Epic` label to issues (ZenHub API), the release for which the epic is planned (ZenHub API), the issue's capability label (GitHub API), or the issue title.

  ![Issue labels](./issue-labels.png)

  - Change ClusterAssetGroups that provide the structure for the left topic navigation in **Docs** and **Community**.

  ![Left navigation in docs](./left-navigation.png)

## Custom rendering

To customize content rendering in some of the views, we put our own twists on the standard logic provided by Gatsby.

### Documentation component

In Kyma, we render the documentation sources both on the website under the **Docs** view and as built-in documentation in the UI on every Kyma cluster. To unify the way in which it is shown in both places, we created our own React [documentation component](https://github.com/kyma-incubator/documentation-component) for rendering such specification formats as Markdown, OpenAPI, AsyncAPI, and OData. We use this component on the website to render Markdown and OpenAPI specifications with [custom styles](https://github.com/kyma-project/website/tree/master/src/components/generic-documentation/render-engines) applied in chosen views. The documentation component also provides the documentation toggle, right navigation and scrollspy in **Docs** and **Community** views:

![Features provided by the documentation component](./documentation-component.png)

### React-markdown library

We also wanted to customize the way we render some Markdown elements. Since Gatsby didn't support that, and we couldn't find any other tool for that, we created the [react-markdown library](https://github.com/kyma-incubator/documentation-component/tree/master/packages/markdown-render-engine) that is our wrapper for the [`react-markdown`](https://github.com/rexxars/react-markdown). We used it in **Docs**, **Blog**, and **Community** views to customize such Markdown elements as panels, or icons next to external links.

![Features provided by the react-markdown library](./react-markdown.png)

### ClusterAssetGroups

We even found a place for a chunk of Kubernetes implementation in our frontend. In Kyma, we use our in-house, k8s-based component [Rafter](https://kyma-project.io/docs/components/rafter/#overview-rafter-in-kyma) as a backend mechanism for uploading data for documentation topics and storing them in external buckets located in MinIO storage. Rafter is based on AssetGroup and ClusterAssetGroup custom resources (CRs) - we decided to use their structure on the website to configure the left navigation for [documentation topics](https://kyma-project.io/community/guidelines/content#add-new-documentation-to-the-website-add-new-documentation-to-the-website) in the **Docs** and **Community** views, simply by fetching content from these `.yaml` files. Each [ClusterAssetGroup](https://github.com/kyma-project/kyma/tree/master/resources/core/charts/docs/charts/content-ui/templates) is a separate node in the navigation, that our content loading tool uploads along with the source documentation and renders in the order and under the name specified in the CRs.

![ClusterAssetGroups for the left navigation](./ClusterAssetGroups.png)

## Views and their sources

![Views on the website](./views.png)

Each view on the website takes its sources from a different repository.

- **Docs** - `docs` folder in the `kyma` repository
- **Blog** - `blog-post` folder in the `website` repository
- **Community** - `community` repository
- **Roadmap** - `capabilities` folder in the community repository for descriptions of our project areas, and GitHub issues with `Epic` and a given capability's labels for the roadmap details.
- **Landing page** - `content` folder in the `website` repository, including the banner, and the **Used by** section with Kyma users

Before the website build, all this content is moved to the `website` repository by the [content loader](https://github.com/kyma-project/website/tree/master/tools/content-loader) - our in-house TypeScript tool we use for fetching:
- Content from various repository sources
- Details of issues from ZenHub and GitHub APIs

## Building and deployment process

Now that you know all pieces of the puzzle, let's have a look at how they fit together. The diagram and description beneath show the whole website building process triggered after merging a pull request.

![Website building flow](./building-process.svg)

1. When you merge your PR to the `kyma/docs`, `website` or `community` repositories, the GitHub API sends an event to the Netlify function that triggers the master build.

2. The build triggers the content loader to fetch the given repository content, along with related ClusterAssetGroups, and perform initial data serialization and filtering. The content loader then moves the fetched content into the temporary folders in the `website` repository.

3. Gatsby reads this content through the connected plugins and retrieves selected data, such as metadata in docs. It later transforms it into a GraphQL schema that could be pulled by React components.

4. Gatsby uses the [Browser API](https://www.gatsbyjs.org/docs/browser-apis/) to build particular static HTLM sites from React components, using data from the GraphQL schema.

5. Gatsby performs the optimization process - it compiles the source code so that the sites could load faster on all sorts of devices.

6. Netlify deploys the static sites on Netlify.

## Preview

Before your merge the pull request and it gets published on the Kyma website, you can preview your changes to see if the formatting of the text is correct, images fit well, and links work as expected. That is possible thanks to the [preview feature](https://kyma-project.io/community/guidelines/content#documentation-preview-documentation-preview) supported by Netlify. It attaches links to autogenerated previews of all website views to your pull requests (PRs).

We enabled this feature on these Kyma repositories:

- [`kyma`](https://github.com/kyma-project/kyma/tree/master/docs) for changes in the `/docs` folder that contains sources of the official Kyma documentation rendered in the [**Docs**](https://kyma-project.io/docs/) view.

- [`community`](https://github.com/kyma-project/community) for changes rendered in the [**Community**](https://kyma-project.io/community/) view.

- [`website`](https://github.com/kyma-project/website) for changes rendered on the [landing page](https://kyma-project.io/) and in the [**Blog**](https://kyma-project.io/blog/) view.

Previews are built for PRs containing changes made to any file within these repositories, for both successful and failed builds. The only exception is the `kyma` repository where Netlify only builds previews for changes in the `/docs` folder and publishes notifications only for successful builds on such PRs.

When it comes to the building process, it looks very similar to the general flow. The only difference is that the Netlify function is not involved. Every commit on a pull request triggers the content loader straightaway which generates only the preview of the view you actually modify.

![Successful preview build on a pull request](./successful-preview.png)

## How and where to contribute

When it comes to our future plans concerning the website, we have some ideas on how to improve its overall performance, simplify contribution and introduce easy feedback options. We log all those ideas as [GitHub issues](https://github.com/kyma-project/website/issues) in the `website` repository - feel encouraged to do the same if an idea for improvement crosses your mind.

You can also move straightaway to action and contribute on your own to the look and feel of https://kyma-project.io/.

The contribution flow is quite simple:

1. Fork a repo.
2. Create a pull request.
3. Add content and wait for our review and approval.

The fun may begin when you try to figure out where the sources of all views are. However, we hope this table clarifies it a bit and helps you to find your way through our repositories and the website structure:

| Website view | Where? | What? | How? |
|---|---|---|---|
| **Landing page** | [`website/content/adopters/adopters.yaml`](https://github.com/kyma-project/website/blob/master/content/adopters/adopters.yaml) | Kyma User | Follow the [instruction](https://github.com/kyma-project/website/blob/master/docs/add-user.md) or [log and issue](https://github.com/kyma-project/website/issues/new?template=new-user-request.md) and we will add it for you. |
| **Landing page** | [`website/content/banner/slides.yml`](https://github.com/kyma-project/website/blob/master/content/banner/slides.yml) | Banner | Follow this [instruction](https://github.com/kyma-project/website/blob/master/docs/banner-modification.md). |
| **Docs** | [`kyma/docs`](https://github.com/kyma-project/kyma/tree/master/docs) | Document or topic | Add a document that follows one of the [templates](https://kyma-project.io/community/guidelines/templates/#document-types-templates-document-types-templates-document-types-for-kyma-components) or follow instructions to [add a new topic](https://kyma-project.io/community/guidelines/content/#add-new-documentation-to-the-website-add-new-documentation-to-the-website). |
| **Blogs** | [`website/content/blog-post`](https://github.com/kyma-project/website/tree/master/content/blog-posts) | Blog post | Follow the [instruction](https://github.com/kyma-project/website/blob/master/docs/write-blog-posts.md). |
| **Community** | [`community`](https://github.com/kyma-project/community) | Document | |
| **Roadmap** | All repos | Epic | Log and issue, assign it to the proper milestone on Zenhub, and add your capability's and `epic` labels. |
| **Roadmap** | [`community/capabilities`](https://github.com/kyma-project/community/tree/master/capabilities) | Capability | Create a PR. |

Apart from contribution, we are also open to feedback. If you have any thoughts to share or questions to ask, contact us directly on the [`#kyma-project-io`](http://slack.kyma-project.io/) Slack channel.
