# Website

## Overview

This repository contains website source for [`kyma-project.io`](https://kyma-project.io). It uses [GatsbyJS](https://www.gatsbyjs.org/) for static site generation.

> **NOTE:** The description of the application configuration, the project structure, the architecture, and other project-specific details are located in the [`docs`](./docs/README.md) directory.

## Prerequisites

Use the following tools to set up the project:

- [Node.js](https://nodejs.org/en/)

## Usage

### Install dependencies

To install all dependencies, run this command:

```
npm install
```

### Launch the website locally

Launch the development server with the hot reloading functionality that allows any change in files in the `src` folder to be immediately visible in the browser. Run the following command:

```
npm run develop
```

### Build the production-ready website

To build a production-ready website, run the following command:

```
npm run build
```

## Development

### Modify content on the landing page

To change the content of the main landing page, modify the [`src/locales/en/LandingPage.json`](../src/locales/en/LandingPage.json) file. Update labels and any other content in the [`src/locales/en/UI.json`](../src/locales/en/UI.json) file. The structure of the landing page is defined in the [`src/pages/index.js`](../src/pages/index.js) file and in the [`src/components`](../src/components) folder.
