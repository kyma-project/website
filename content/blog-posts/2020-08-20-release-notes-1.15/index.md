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

<!-- INTRO HERE -->

<!-- overview -->

> **CAUTION:** Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.15/docs/migration-guides/1.14-1.15.md) before upgrading your Kyma deployment to 1.15.

See the overview of all changes in this release:

<!-- REMOVE IF THERE ARE NONE
- [Known issues](#known-issues) - 
-->
<!-- REMOVE IF THERE ARE NONE
- [Fixed security vulnerabilities](#fixed-security-vulnerabilities) - 
-->
- [Monitoring](#monitoring) - Jaeger datasource in Grafana
- [CLI](#cli) - Installation from a local checkout to a remote cluster, improved resilience of the `install` command
- [ORY](#ory) - Reduced time of Hydra installation, increased availability of Hydra during updates, improved stability of Oathkeeper
- [Console](#console) - Managing OAuth2 clients from the Console UI, collapsible navigation categories, configuration of event triggers for services
- [Website](#website) - Documentation from various repository sources displayed on the website

<!-- REMOVE IF THERE ARE NONE
## Known issues

### ...

...
-->

<!-- REMOVE IF THERE ARE NONE
## Fixed security vulnerabilities

- Vuln. - [Issue #{NO.}]({ISSUE_URL}}) - **{SECURITY_RISK}}** - [PR #{NO.}}]({PR_URL}})
-->

## Monitoring

### Jaeger datasource in Grafana

We took the chance and pre-configured the new available datasource type "Jaeger" in grafana. Now you can explore all traces available in the Jaeger UI also in the explore section of Grafana by selecting that new datasource. 

## CLI

### Installation from a local checkout to a remote cluster

The kyma installation on a remote cluster from a local Kyma github checkout  requires the building and pushing of the kyma-installer image to a remote docker registry. That setup is possible now. When the "install" command detects such setup it requires to specify the --custom-image parameter specyfing the full image name to be used. The CLI will build and push the image automatically, leveraging the authentication details retrieved from the local docker client. 

###  Improved resilience of the `install` command

The install command will not disconnect on connection problems while watching an ongoing installation. With that <!-- TODO: get the rest of the note -->

## ORY

### Reduced time of Hydra installation

Significantly reduced the time required to install the component.

### Increased availability of Hydra during updates


### Improved stability of Oathkeeper

Improved stability, fixed issues with periodic restarts.

## Console

### Managing OAuth2 clients from the Console UI

To interact with the Kyma OAuth2 server and secure your microservices and Functions, you must first [register an OAuth2 client](https://kyma-project.io/docs/components/security#details-o-auth2-and-open-id-connect-server-register-an-o-auth2-client). 
So far, you could do only through `kubectl`. 
With Kyma 1.15, you can also register OAuth2 clients from the new view in the Console UI: 

<!-- TODO: add the screenshot, remember to add the borders 
![OAuth2 clients in the Console UI](./OAuth2-clients-console.png)
-->

### Collapsible navigation categories

You can collapse categories which you don't use that often to focus on the views which you use frequently. 
For your convenience, the state of collapsed nodes is preserved in the browser cache.  

<!-- TODO: add the screenshot, remember to add the borders 
![Collapsible navigation categories](./collapsible-navigation.png)
-->

### Configuration of event triggers for services

As of now, you can finally subscribe Kubernetes services to events in your Namespace from the Console UI. 
This feature allows you to easily manage event subscriptions not only for Functions but also for any custom microservice you deployed in your Namespace.  

<!-- TODO: add the screenshot, remember to add the borders 
![Event triggers for services](./event-triggers-for-services.png)
-->

## Website

### Documentation from various repository sources displayed on the website

In response to numerous requests to display various documentation sources on the website, we extended the Docs view.
From now on, upon selecting **Docs** in the main navigation panel, you choose the repository from which you want to read the docs.
We have started by rendering docs for [CLI](https://kyma-project.io/docs/cli/) and [Control Plane](https://kyma-project.io/docs/control-plane/).
It is possible to add docs from any other repository within the `kyma-project` and `kyma-incubator` GitHub organizations, as long as these docs meet some requirements and you perform some additional configuration steps.
To learn the details, see the [instruction on adding a new repository documentation](https://kyma-project.io/community/guidelines/content#add-new-documentation-to-the-website-add-new-documentation-to-the-website-add-a-new-repository-documentation). 

<!-- TODO: add the screenshot, remember to add the borders 
![Documentation from various repositories](./docs-different-repos.png)
-->
 