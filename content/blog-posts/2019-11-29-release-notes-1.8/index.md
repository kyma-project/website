---
title: "Kyma 1.8 Oslo"
author:
  name: "Tomasz Papiernik, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.8.0"
redirectFrom:
  - "/blog/release-notes-18"
---

With winter right around the corner, we're taking a Nordic stop at our exciting one-city one-release journey. Like clockwork, four weeks after visiting New Delhi, we're calling at a port in Oslo to take in the views and feel Kyma 1.8-infused *hygge*. With enhanced Compass Provisioner, improvements to the CLI, Istio upgrade, and more, Kyma 1.8 Oslo is as solid as a Norwegian biathlete. Read on to learn more about the new features in Kyma 1.8.


<!-- overview -->

See the overview of all changes in this release:
- [CLI](#cli) - More user-friendly testing with the CLI, `provision` command with fewer dependencies
- [Compass](#compass) - Runtime provisioner supports Gardener on Azure and AWS, connecting with Remote Applications from Cockpit, Scenario Details view fixed
- [Console](#console) - Websockets in **Namespaces** view for improved performance, fixed Deployment editing
- [Documentation](#documentation) - Application Connector documentation revisited, comprehensive examples for the Runtime Provisioner
- [Eventing](#eventing) - Memory leaks fixed in Event Bus
- [Security](#security) - XSUAA connector in Kyma, monitoring for API Server Proxy and OAuth2 controllers
- [Service Management](#service-management) - Service Catalog with cascading ServiceBinding deletion
- [Service Mesh](#service-mesh) - Istio upgraded to 1.3.5
- [Known issues](#known-issues) - Information about problems with Kyma instances installed on Gardener-provisioned clusters.
- [Migrations and upgrades](#migrations-and-upgrades) - Prometheus PVC increased to 10GB



## CLI

### More user-friendly testing with the CLI

To make testing Kyma more user-friendly, the `kyma test run` command now supports a `watch` option that gives you a better look at the currently running test suite which is useful not only for manually triggered tests but also for CI pipelines. The output includes the number of tests that already ran, the number of remaining tests and a counter of tests that succeeded, failed or were skipped. Additionally, the new `kyma test logs` command allows you to get the logs of all executed tests.

### Decoupled provision command

The Terraform-based `kyma provision gcp` and `kyma provision gardener` commands are now decoupled from any cloud provider-specific dependencies and rely only on Terraform dependencies. This change lays the groundwork for adding support for Azure AKS in the near future.


## Compass

### Runtime Provisioner supports Gardener on Azure and AWS

The capabilities of the [Runtime Provisioner](https://github.com/kyma-project/kyma/blob/release-1.8/docs/compass/02-01-components.md#runtime-provisioner) were extended - we've added support for provisioning Gardener clusters on Azure and AWS. Due to broadening capabilities of the Provisioner, we also changed the API a bit - the cluster config is now passed in a more generic way, which allows for easier integration with various Hyperscalers.

### Connect with Applications from Cockpit

Connecting with Applications now doesn't require using the CLI. You can get the connection token by clicking **Connect** on the Application Details page.

### Fixed Scenario Details view

The Scenario Details view has been fixed and doesn't crash anymore.


## Console

### Fixes, fixes, fixes

In Kyma 1.8 the Console received two important fixes. One improves the performance of the **Namespaces** view which now uses websockets, allowing for a smoother experience and reduced cluster load.
We also worked to fix Deployment editing through the UI and we're happy to announce that you can edit Deployments through the Console to your heart's content, crash-free!


## Documentation

### Application Connector documentation revisited

We tweaked and provided many minor improvements in Application Connector's documentation. The main focus was to improve rendering and readability of the already-existing docs.

### Runtime Provisioner examples

The first iteration of Provisioner examples is here! We have created a few tutorials that will guide you through the whole process of cluster actions - from provisioning to cluster deletion and cleanup of Runtime data. See the new tutorials [here](https://github.com/kyma-project/kyma/tree/release-1.8/docs/compass).


## Security

### XSUAA connector in Kyma

This release we have added the possibility to delegate user authentication to SAP Cloud Platform XSUAA. To allow this, Dex now supports a new type of connector, called `xsuaa`. Our documentation shows how to configure an XSUAA connector for Dex. For more details, read [this](https://github.com/kyma-project/kyma/blob/release-1.8/docs/security/08-03-add-connector.md) document.

### Monitoring API Server Proxy

In this release, we have started working on monitoring of the API Server Proxy. For now we enabled Golang metrics with visualization using Grafana dashboards. We will continue working on the feature in the upcoming release.

### Monitoring OAuth2 controllers

In similar fashion to the API Server Proxy monitoring, we provided Grafana dashboards for Kyma Ory controllers, the Hydra Maester and the Oathkeeper Maester.


## Eventing

### Fix memory leak in Events

We fixed a memory leak in the publishing component of the Event Bus that could cause the component to reject Events.


## Service Management

### Service Catalog with cascading ServiceBinding deletion

Starting from this release, deleting a ServiceInstance removes all corresponding ServiceBindings. As a result, you don't need to delete ServiceBindings manually.


## Service mesh

### Istio upgraded to 1.3.5

Kyma 1.8 is running on Istio 1.3.5! After a long journey, we have finally managed to upgrade from 1.2.7. Upgraded Istio comes with fixes in the Secret Discovery Service which resolve some of the stability issues.

Additionally, we introduced a major improvement in the Istio Gateway definition by splitting it into multiple, separate gateways. With this change, you can install and access Kyma Core without depending on any other charts. Prior to this change, if a chart that contained a dependency, such as the Application Connector, was not installed, the communication with the cluster failed with code `503` errors. This was caused by the single gateway containing host definitions for all charts, even those that were not installed. This is yet another great step we make towards a more modular Kyma.



## Known issues

### Issues with Kyma running on Gardener

We have identified problems with Kyma instances installed on clusters provisioned through Gardener. The root cause of these problems seems to be Istio, namely the networking and RBAC elements of our service mesh. We're actively working to resolve these problems. Use [this](https://github.com/kyma-project/kyma/issues/6330) GitHub issue to track our progress.

## Migrations and upgrades

We have increased the size of Persistent Volume Claims (PVC) for Prometheus to 10GB to prevent it from running out of disk space. For details, read the [migration guide](https://github.com/kyma-project/kyma/blob/release-1.8/docs/migration-guides/1.7-1.8.md).
