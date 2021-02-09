---
title: "Kyma 1.15 Vienna"
author:
  name: "Maja Kurcius, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.15.0"
redirectFrom:
  - "/blog/release-notes-115"
---

Same language, different city!
After leaving Ulm, we take a short trip to the City of Music, Vienna.
We all know Vienna for the famous musicians that were either born there or went there to work.
But did you know that Vienna was the largest German-speaking city in the world up to the 20th century, and to date remains the second-largest one, after Berlin?
Not to mention the beautiful architecture of the city!
Inspired by the views, we worked on improving our Console UI.
We also added more documentation sources to the website.
Lastly, we worked on tweaks and improvements for monitoring, Kyma CLI, and the ORY stack.
Read the notes to find out more.

<!-- overview -->

See the overview of all changes in this release:

- [Monitoring](#monitoring) - Jaeger data source in Grafana
- [CLI](#cli) - Installation from a local checkout to a remote cluster, improved resilience of the `install` command
- [ORY stack](#ory-stack) - Reduced Hydra installation time, increased availability of Hydra during updates, improved Oathkeeper stability
- [Console](#console) - Managing OAuth2 clients from the Console UI, collapsible navigation categories, configuration of event triggers for services
- [Website](#website) - Documentation from various repository sources displayed on the website

## Monitoring

### Jaeger data source in Grafana

We took the chance and preconfigured the new Jaeger data source in Grafana. Now you can also explore all traces available in the Jaeger UI by selecting this new data source in the **Explore** section of Grafana.

## CLI

### Installation from a local checkout to a remote cluster

Kyma installation on a remote cluster from a local Kyma GitHub checkout requires building and pushing the `kyma-installer` image to a remote Docker registry. From now on, CLI takes care of this process. When the `install` command detects such a setup, it will prompt you to pass the **--custom-image** parameter specifying the full image name to be used. The CLI will then build and push the image automatically, leveraging the authentication details retrieved from the local Docker client.

###  Improved resilience of the install command

We improved the resilience of the `install` command. Now, even if you encounter connection problems during installation, the process triggered by the `install` command will be resumed and continue until it's completed.

## ORY stack

Improvements in the ORY stack include:

* Significantly reduced Hydra installation time
* Increased availability of Hydra during updates
* Improved Oathkeeper stability and fixed issues with periodic restarts

## Console

### Managing OAuth2 clients from the Console UI

To interact with the Kyma OAuth2 server and secure your microservices and Functions, you must first [register an OAuth2 client](https://github.com/kyma-project/kyma/blob/release-1.15/docs/security/03-06-oauth2-server.md#register-an-oauth2-client). 
So far, you could do it only through `kubectl`.
With Kyma 1.15, you can also register OAuth2 clients from the new view in the Console UI:

![OAuth2 clients in the Console UI](./OAuth2-clients-console.png)

### Collapsible navigation categories

Starting with this release, you can collapse categories which you don't use that often to focus on the views that you use frequently.
For your convenience, the state of collapsed nodes is preserved in the browser cache.  

![Collapsible navigation categories](./collapsible-navigation.png)

### Configuration of event triggers for services

As of now, you can finally subscribe Kubernetes services to events in your Namespace from the Console UI.
This feature allows you to easily manage event subscriptions not only for Functions but also for any custom microservice you deployed in your Namespace.  

![Event triggers for services](./event-triggers-for-services.png)

## Website

### Documentation from various repository sources displayed on the website

In response to numerous requests, we extended the **Docs** view and now display various documentation sources on the website.
From now on, when you hover over **Docs** in the main navigation panel, you can select the repository from which you want to read the documentation.
You can choose from the documentation for [Kyma](https://kyma-project.io/docs/), [CLI](https://kyma-project.io/docs/cli/), and [Control Plane](https://kyma-project.io/docs/control-plane/).

![Documentation from various repositories](./docs-different-repos.png)
