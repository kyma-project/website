# Website

<a href="https://www.netlify.com" target="_blank">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
</a>

## Overview

This repository contains website source for [`kyma-project.io`](https://kyma-project.io). The website uses [GatsbyJS](https://www.gatsbyjs.org/) for static site generation and is deployed by [Netlify](https://www.netlify.com).

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