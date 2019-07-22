> This template is dedicated to technical writers. Use it to write release notes for Kyma releases. Add them as a new `index.md` document in a dedicated `YYYY-MM-DD-release-notes-X.X` folder under [`website/content/blog-posts/`](https://github.com/kyma-project/website/tree/master/content/blog-posts). Place any related screenshots in the same folder. Follow the content-related guidelines and tips for writing [release notes](../../content-guidelines/release-notes.md).

<!-- Fill in the required metadata for the blog post to render properly on the "kyma-project.io" website. Remember to remove the code block. -->

```
---
title: "Kyma {release-number} {code-name}"
author:
  name: "{Name and surname}, {Role} @Kyma"
tags:
  - release-notes
type: release
releaseTag: "{release-number}"
redirectFrom:
  - "/blog/release-notes-{release-number}"
---
```

> Write an introductory paragraph and present the most important release highlights from all components. List the highlights as bullet points and provide relative links to their corresponding sections.

- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}
- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}
- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}

> For example, write:
> [Application Connector modularization](#modularization) - Components have been moved to separate Helm charts.

> Add the <!-- overview --> comment after this introductory paragraph to separate the excerpt rendered on the main page from the rest of the document. For more details, see [these](https://github.com/kyma-project/website/blob/master/docs/write-blog-posts.md) guidelines.

> Introduce other component features or fixes that are included in the release notes. They should reflect the names of subsections under each component. Add relative links to component sections.

- [Application Connector](#relative-link-to-subsection) - {List of other features and fixes}
- [Console](#relative-link-to-subsection) - {List of other features and fixes}
- [Eventing](#relative-link-to-subsection) - {List of other features and fixes}
- [Logging](#relative-link-to-subsection) - {List of other features and fixes}
- [Monitoring](#relative-link-to-subsection) - {List of other features and fixes}
- [Security](#relative-link-to-subsection) - {List of other features and fixes}
- [Serverless](#relative-link-to-subsection) - {List of other features and fixes}
- [Service Catalog](#relative-link-to-subsection) - {List of other features and fixes}
- [Service Mesh](#relative-link-to-subsection) - {List of other features and fixes}
- [Tracing](#relative-link-to-subsection) - {List of other features and fixes}

> For example, write:
> [Application Connector](#application-connector) - Extended tests, client certificate verification

---

## {Component name}

### {Feature or fix name}

> Write a short paragraph that describes the feature or the fix in details and explains its benefits to the Kyma users. Include screenshots to illustrate the change better.

### Known issues

> Describe any known issues that the users can face, together with the way on how to solve these issues.
