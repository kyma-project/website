---
title: Release notes
label: internal
---

Information in release notes must provide readers with everything they need to know to understand the change in the software. A lot of business decisions are made based on the information in release notes. Therefore, always write from the user's perspective, not the developer's perspective. The content of release notes answers the following questions:

* What has changed because of this feature or resolved issue?
* How was the behavior different before this release?
* Are there changes to the UI?
* Are there changes to the functionality?
* Does an error message appear?
* Was the enhancement based upon customer feedback?

Because the release notes contain critical information and act as an important communication tool, follow these guidelines so that the documentation is informative and consistent. When authoring release notes, follow the [Style and Terminology](./08-style-and-terminology.md) for many agreed-upon standards. Read the [instructions](https://github.com/kyma-project/website/blob/main/docs/write-blog-posts.md) to learn how to add the release notes as a blog post on a website.

## Headlines
A headline is short, interesting, and summarizes your release notes. Write headlines in sentence case.

## Write about new features
When writing about new features, write an enticing paragraph instead of a short, bulleted list. This is an opportunity to market the new feature to customers from a business perspective.

## Write about known and resolved issues
When writing about known and resolved issues, don't call them bugs. Use the terms **known issue** and **resolved issues** because it has a more positive tone. A bulleted list of known and resolved issues is okay, but ensure that the descriptions make sense.

## Bulleted lists
For ease of reading, use the same sentence structure throughout a bulleted list. For example, the following items match in sentence structure:
- Feature xyz - This one is really cool.
- Feature abc - This one is really, really, cool.

Don't add an entry that doesn't match, such as:
- Feature JKL: it's not so cool

## Include a migration guide
Whenever a user must perform some manual steps in order to use the newly released version of the software, always provide a migration guide. This document must clearly list all necessary steps the user must perform to successfully upgrade from one version of the software to another. Do **not** describe new features in the migration guide. For this purpose, use the release notes.

## Templates
Here are all the release notes-related templates you may find useful:
- [Release notes](../../../templates/resources/release-notes.md)
- [Release notes input](../../../templates/resources/release-notes-input.md)
