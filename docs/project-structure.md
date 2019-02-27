# Project structure

This repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── content                     # Content for the website
  │    ├── assets                 # Assets files
  │    ├── banner                 # Directory with the "slides.yml" file which contains slides for the banner
  │    ├── blog-posts             # Blog posts
  │    ├── docs                   # Raw documentation with assets for various Kyma versions
  │    └── i18n                   # Localization files
  ├── docs                        # Directory with project-related documents
  ├── gatsby                      # Directory with files using the Gatsby API for creating static pages or creating nodes
  ├── plugins                     # Original plugins used in the "gatsby.config.js" file
  ├── scripts                     # Scripts used for Continuous Integration. Do not use them locally
  ├── src                         # Website's source code 
  │    ├── common                 # Various helper functions and types
  │    ├── components             # Structure of website's components
  │    │    ├── blog              # Structure and styles of the blog posts
  │    │    ├── docs              # Documentation page structure and styles
  │    │    ├── landingPage       # Landing page structure and styles
  │    │    ├── layout            # Website structure and styles
  │    │    ├── notFoundPage      # 404 page structure and styles
  │    │    └── shared            # Various generic components such as "Button", "Icon" etc.
  │    ├── pages                  # Main pages displayed on the website
  │    └── templates              # Template files, for example, for a blog post
  ├── static                      # Static content for the website including fonts and images
  ├── tools                       # Various tools used in the development process
  │    └── content-loader         # Tool used to fetch a new documentation version and copy it to the "content/docs" folder
  └── config.json                 # Project's configuration file. For example, it contains languages and site metadata.
```

<!-- If you make any changes in the project structure, remember to update it. -->
