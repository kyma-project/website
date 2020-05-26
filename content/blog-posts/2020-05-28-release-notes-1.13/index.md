---
title: "Kyma 1.13 Tokyo"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.13.0"
redirectFrom:
  - "/blog/release-notes-113"
---

In Japanese culture, there is a concept of _kintsugi_ (金継ぎ) which can be loosely translated as "golden joinery". It assumes mending objects with gold so that they are even more beautiful after improvements are made. With the 1.13 Tokyo release, we follow this amazing custom and provide some golden improvements to Kyma features. This includes installation improvements in Kyma Operator, a couple of tweaks in the brand new Serverless, and changes in Kyma CLI command nomenclature. Apart from that, this release brings yet another set of new Compass features and redesigned backup functionality. Continue reading the release notes for the full story behind Kyma 1.13 Tokyo.
<!-- overview -->

See the overview of all changes in this release:

- [Application Connector](#application-connector) - Deprecation of Connector and Application Registry APIs
- [Installation](#installation) - Improved error handling in Kyma Operator
- [Eventing](#eventing) - Tracing enabled within Event Mesh
- [Compass](#compass) - Availability zones in provisioned clusters, hide Applications from Runtimes, Fetch request for API specification
- [CLI](#cli) - Provisioning commands renamed
- [Serverless](#serverless) - Caching enabled, improved ServiceBinding creation
- [Backup](#backup) - Backup functionality redesigned, backup documentation provided

## Application Connector

### Deprecation of Connector and Application Registry APIs

With [Compass](https://github.com/kyma-incubator/compass) being the target API for the Application Connectivity topics, APIs of both Connector Service and Application Registry have been deprecated. To learn how to install Compass and integrate with it, refer to the [Compass documentation](https://kyma-project.io/docs/components/compass/#installation-enable-compass-in-kyma) or to the [Director GraphQL schema](https://github.com/kyma-incubator/compass/blob/master/components/director/pkg/graphql/schema.graphql) directly. Backward compatibility is preserved by the introduction of [Connectivity Adapter](https://github.com/kyma-incubator/compass/tree/master/components/connectivity-adapter).


## Installation

### Improved error handling in Kyma Operator

Operations performed by Kyma Operator are now atomic. As a result, if an error occurs while processing a component, the controller restores the initial state of that component and retries the step. For more details on [error handling and retry policy](https://kyma-project.io/docs/master/root/kyma#installation-error-handling), refer to the documentation.


## Eventing

### Tracing enabled within Event Mesh

With Kyma 1.13, you can trace event propagation throughout the cluster. Tracing will work both for the default [NatssChannel](https://github.com/knative/eventing-contrib/tree/master/natss/config) implementation used in Kyma and also when you [configure eventing to work with the Kafka Channel](https://kyma-project.io/docs/master/components/event-mesh#tutorials-configure-the-kafka-channel). If you opt for eventing with the Kafka Channel, enable Tracing by configuring Istio. To do so, [increase trace sampling](https://istio.io/docs/tasks/observability/distributed-tracing/configurability/#trace-sampling) and use Jaeger to visualize traces.


## Compass

### Availability zones in provisioned clusters

From now on, the Runtime Provisioner fully supports the availability zone functionality exposed by Hyperscalers. With the use of Gardener API, it is now possible to provision clusters with **zoned** parameter set to `true` as long as the list of availability zones for the requested cluster is provided.

### Hide Applications from Runtimes

It is now possible to configure Compass so that it doesn't return Applications labeled with specific labels in response to the `applicationsForRuntime` query used by Runtimes. To learn [how to hide Applications from Runtimes](https://github.com/kyma-incubator/compass/blob/master/docs/director/03-01-hide-applications-from-runtimes.md), read the documentation.

### Fetch Request for API specification

[Fetch Request](https://github.com/kyma-incubator/compass/blob/master/docs/director/03-fetch-requests.md) is a type in the Director API that contains all information needed to fetch a specification from the given URL. If a Fetch Request is specified, the Director makes a synchronous call to the specified URL and downloads the specification.


## CLI

### Renamed provisioning commands

Kyma CLI commands for cluster provisioning on GKE and AKS are now renamed. There are also three separate provisioning commands for Gardener. With that, the usage is more intuitive and provider-specific default values are applied for all Gardener commands. These are the available provisioning commands:

```
kyma provision gke
kyma provision aks
kyma provision gardener gcp
kyma provision gardener az
kyma provision gardener aws
```

## Serverless

### Caching enabled

We have significantly reduced the overall time in which Functions are built. All steps executed during the build are now cached, which speeds up the whole process. For example, thanks to caching, all packages are installed only when you specifically modify them, not every time you build a Function as it was until now.

### Improved ServiceBinding creation

We also improved the way ServiceBindings are created for Function. So far, you could only create them when the Function was already running, so the order was sequential. We modified the component logic, and now it is possible to create ServiceBindings and Functions synchronously.

## Backup

### Backup functionality redesigned

This release, we removed the Backup component from Kyma, including the component-specific Velero drivers. The backup functionality is still available in a redesigned form that is based on a managed Kubernetes cluster for periodic backups of Kubernetes objects. The volumes, however, are not included in the automated backup procedure. That's why you should back up your volumes periodically using the VolumeSnapshot API resource. Read more about [backing up Kyma](https://kyma-project.io/docs/master/root/kyma/#installation-back-up-kyma) in the documentation.

### Backup documentation

With the new backup strategy, we provide a brand new set of corresponding documentation. Refer to it to learn more about:

- [How backup works for Kyma and what are the on-demand volume snapshots](https://kyma-project.io/docs/master/root/kyma/#installation-back-up-kyma)
- [How to create on-demand volume snapshots](https://kyma-project.io/docs/master/root/kyma/#tutorials-create-on-demand-volume-snapshots)
- [How to create on-demand volume snapshots for cloud providers](https://kyma-project.io/docs/master/root/kyma/#tutorials-create-on-demand-volume-snapshots-for-cloud-providers)
