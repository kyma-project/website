---
title: "Kyma 1.19 Zagreb"
author:
  name: "Justyna Sztyper, Technical Writer @Kyma"
tags:
  - release-notes
type: release-notes
releaseTag: "1.19.0"
redirectFrom:
  - "/blog/release-notes-119"
---

Sretna Nova Godina!

Maybe after these wishes you already know that our journey in 2021 begins in Croatia, specifically in its capital city, Zagreb. Apart from its famous café culture, beautiful historic buildings and amazing views, Zagreb offers you delicious snacks such as licitar. This time we also have some tasty improvements for you. Read the notes to find out what they are.

<!-- overview -->

> **CAUTION:** Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.19/docs/migration-guides/1.18-1.19.md) before upgrading your Kyma deployment to 1.19.

See the overview of all changes in this release:

- [Console](#console) - Improved left navigation structure
- [Installation](#installation) - Istio upgrade to 1.8.2
- [Serverless](#serverless) - Managing function secrets & configs, limiting parallel function builds

## Console

### Improved left navigation structure

We have reviewed the categories displayed in left navigation. 
We adjusted the structure to better match kubernetes taxonomy. With that in mind, it is now more natural to find the workloads, their configuration and networking setup.  

## Installation 

### Istio upgrade to 1.8.2 

With this release, we have upgraded Istio from 1.7.4 to 1.8.2. Find more details in the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.19/docs/migration-guides/1.18-1.19.md)) and the [Istio 1.8.2 release notes](https://istio.io/latest/news/releases/1.8.x/announcing-1.8/). 

## Serverless

### Manage function secrets & configs  

You can define secrets and config maps used by funtions in the function descriptor (config.yaml) and apply them using Kyma CLI. 

### Limiting parallel function builds  
We have changed the function build process so that it doesn't allow for unlimited simultanous builds. There is a pool of 5 simultanous builds available by default.  
This will protect from draining the computational resources on small runtimes, in a scenario where bulk function reconciliation is triggered. 
