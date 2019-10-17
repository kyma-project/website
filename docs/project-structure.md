# Project structure

This repository has the following structure:

``` text
  ├── .github                     # Pull request and issue templates
  ├── content                     # Content for the website
  │    ├── banner                 # Directory with the "slides.yml" file which contains slides for the banner
  │    ├── blog-posts             # Blog posts
  │    ├── community              # Raw content with assets for /community/* pages
  │    ├── docs                   # Raw content with assets for /docs/* pages
  │    ├── early-adopters         # Raw content for the "Early adopters" section on the landing page
  │    ├── i18n                   # Localization files
  │    └── roadmap                # Raw content with assets for /roadmap/* pages
  ├── docs                        # Directory with project-related documents
  ├── gatsby                      # Directory with files using the Gatsby API for creating static pages or creating nodes
  ├── netlify                     # Sources of lambdas running on the Netlify platform
  ├── scripts                     # Scripts used for Continuous Integration. Do not use them locally
  ├── src                         # Website's source code
  │    ├── common                 # Various helper functions and types
  │    ├── components             # Various generic components such as "Button", "Icon", etc.
  │    ├── layouts                # Custom layouts for pages
  │    ├── modals                 # Custom modals for pages
  │    ├── root                   # Source of the application wrapper
  │    ├── sitemetadata           # Extractor of metadata for pages
  │    ├── types                  # Types separated by page contexts
  │    └── views                  # Template files for a blog post, documentation page, etc.
  ├── static                      # Static content for the website including fonts and images
  ├── tools                       # Various tools used in the development process
  │    └── content-loader         # Tool used to fetch a new documentation version and copy it to the "content/docs" folder
  └── config.json                 # Project's configuration file. For example, it contains languages and site metadata.
```

<!-- If you make any changes in the project structure, remember to update it. -->
