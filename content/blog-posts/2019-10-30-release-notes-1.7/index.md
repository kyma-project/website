---
title: "Kyma 1.7 New Delhi"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.7.0"
redirectFrom:
  - "/blog/release-notes-17"
---

Not much time has passed since the last stop in Munich, and yet we're already landing in India with the brand new Kyma 1.7 New Delhi release. There's no wonder we're moving around the globe so fast as the main focus in this release was put in extending Compass functionalities. Apart from that, the Helm Broker becomes more independent as a separate component, and there are also CLI and Security enhancements. Read on to learn more about features that are coming with the Kyma 1.7 release.

<!-- overview -->

See the overview of all changes in this release:
- [Compass](#compass) - Runtime Agent enhancements, Runtime Provisioner first implementation, Tenant Mapping Handler for requests validation, Scenarios view in the Console
- [Service Management](#service-management) - Helm Broker v1.0.0 officially released
- [Security](#security) - Support TLS certificate hot reload
- [CLI](#cli) - Commands for provisioning Kubernetes clusters on GCP and Gardener


## Compass

### Runtime Agent enhancements

Compass Runtime Agent now uses Application names as custom resource names. This affects the way Applications are listed in the Kyma Console. No more pesky IDs - entries are named exactly the same as in the Compass Console!

The second addition to the Runtime Agent involves labelling Runtimes. After successful connection, the Runtime Agent updates the Director with information on exposed endpoints of the Runtime, such as Event Service URL or Console URL.

### Runtime Provisioner first implementation

The first implementation of the [Runtime Provisioner](https://kyma-project.io/docs/components/compass/#architecture-components-runtime-provisioner) is here. We have un-mocked the provisioning part of the API – it is now possible to provision clusters on GCP and Gardener projects using GCP credentials.

### Tenant Mapping Handler for requests validation

Since this release, the [Tenant Mapping Handler](https://github.com/kyma-incubator/compass/blob/master/docs/architecture/authentication-and-authorization.md#tenant-mapping-handler) validates requests that are coming to the Director. It modifies those requests by assigning them to tenants and scope. The authenticated users and systems can work only in the context of a given tenant and with given scopes.

### Scenarios view available in the Console

A new **Scenarios** view in the Compass Console shows Applications and Runtimes connected to a specific scenario. It allows you to manage Applications and Runtimes in a given scenario.

![Details view](./details-view.png)


## Service Management

### Helm Broker v1.0.0 officially released!

Some time ago, the Helm Broker was moved to the [separate repository](https://github.com/kyma-project/helm-broker). As the next step, we created a whole new release process for it, which is based on the Kubernetes release process. From now on, the Helm Broker will be released after implementation of every important feature.


## Security

### Support TLS certificate hot reload

Since this release, you don't have to manually restart applications to make them work with new TLS certificates. From now on, the IAM Kubeconfig Service provides KUBECONFIG configurations for users who have updated their certificates, and the API server proxy accepts requests that are made using `kubectl` with the new KUBECONFIG.


## CLI

### Commands for provisioning Kubernetes clusters on GCP and Gardener

We integrated the new [Hydroform](https://github.com/kyma-incubator/hydroform) library into the CLI. It allows you to provision Kubernetes clusters on GCP and Gardener in a convenient way. The command syntax is not stable yet due to ongoing process of  extending the provisioning logic to support more providers.
