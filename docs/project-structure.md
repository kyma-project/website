# Project structure

This repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── docs-navigation-builder     # Used for creating navigation file out of documentation
  ├── scripts                     # Scripts used in Continous Integration; don't use locally
  ├── src                         # Source code of website
  │    ├── blog-posts             # Blog posts
  │    ├── components             # Structure of various parts of website
  │    │       ├── blog           # Structure and styles of blog posts
  │    │       ├── content        # Styled content of blog posts
  │    │       ├── cookiee        # Cookie banner
  │    │       ├── docs           # Structure and styles of documentation
  │    │       ├── landing        # Structure and styles of parts of landing page
  │    │       ├── layout         # General strucuture and styles of website
  │    │       ├── loading        # Loading indicator
  │    │       └── translation    # Language switcher
  │    ├── config                 # Configuration files
  │    ├── constants              # Constants used throught project
  │    ├── helpers                # Various helper functions
  │    ├── locales                # Localization files
  │    ├── pages                  # Main pages displayed on website
  │    └── templates              # template files, e.g. for blog post
  └── static                      # Documentation, fonts and images
```
