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

In Japanese culture, there is a concept of _kintsugi_ (金継ぎ) which can be loosely translated as "golden joinery." It assumes mending objects with gold so that they become more beautiful after the improvements. With the 1.13 Tokyo release, we follow this amazing custom and provide some golden improvements to Kyma features. This includes installation improvements in the Kyma Operator, a couple of tweaks in the brand new Serverless, and changes in the Kyma CLI command nomenclature. Apart from that, this release brings yet another set of new Compass features and redesigned backup functionality. Read on for the full story behind Kyma 1.13 Tokyo.
<!-- overview -->

See the overview of all changes in this release:

- [Application Connector](#application-connector) - Deprecated Connector and Application Registry APIs
- [Installation](#installation) - Improved error handling in the Kyma Operator
- [Eventing](#eventing) - Tracing enabled within Event Mesh
- [Compass](#compass) - Availability zones in provisioned clusters, Applications hidden from Runtimes, Fetch Request for API specification
- [CLI](#cli) - Provisioning commands renamed
- [Serverless](#serverless) - Caching enabled, ServiceBinding creation improved, Kubeless Function CRD to be removed
- [Backup](#backup) - Backup functionality redesigned, backup documentation provided

## Application Connector

### Deprecated Connector and Application Registry APIs

With [Compass](https://github.com/kyma-incubator/compass) being the target API for the Application Connectivity topics, APIs of both the Connector Service and the Application Registry have been deprecated. To learn how to install Compass and integrate with it, refer to the [Compass documentation](https://github.com/kyma-project/kyma/blob/release-1.13/docs/compass/04-01-compass.md) or to the [Director GraphQL schema](https://github.com/kyma-incubator/compass/blob/master/components/director/pkg/graphql/schema.graphql) directly. Backward compatibility is preserved by the introduction of [Connectivity Adapter](https://github.com/kyma-incubator/compass/tree/master/components/connectivity-adapter).

## Installation

### Improved error handling in Kyma Operator

Operations performed by the Kyma Operator are now atomic. As a result, if an error occurs while processing a component, the controller restores the initial state of that component and retries the step. Read about [error handling and retry policy](https://github.com/kyma-project/kyma/blob/release-1.13/docs/kyma/04-13-error-handling.md) for more details.

## Eventing

### Tracing enabled within Event Mesh

With Kyma 1.13, you can trace event propagation throughout the cluster. Tracing will work both for the default [NatssChannel](https://github.com/knative-sandbox/eventing-natss/tree/master/config) implementation used in Kyma and with the [Kafka Channel configuration](https://github.com/kyma-project/kyma/blob/release-1.13/docs/event-mesh/08-01-configure-kafka-channel.md). If you opt for eventing with the Kafka Channel, enable Tracing by configuring Istio. To do so, [increase trace sampling](https://istio.io/docs/tasks/observability/distributed-tracing/configurability/#trace-sampling). You can then use Jaeger to visualize traces.

## Compass

### Availability zones in provisioned clusters

From now on, the Runtime Provisioner fully supports the availability zone functionality exposed by hyperscalers. With the use of Gardener API, it is now possible to provision clusters with the **zoned** parameter set to `true` as long as a list of availability zones for the requested cluster is provided.

### Applications hidden from Runtimes

It is now possible to configure Compass not to return Applications labeled with specific labels in response to the `applicationsForRuntime` query used by Runtimes. To learn [how to hide Applications from Runtimes](https://github.com/kyma-incubator/compass/blob/master/docs/director/03-01-hide-applications-from-runtimes.md), read the documentation.

### Fetch Request for API specification

[Fetch Request](https://github.com/kyma-incubator/compass/blob/master/docs/director/03-fetch-requests.md) is a type in the Director API that contains all the information needed to fetch a specification from a given URL. If a Fetch Request is specified, the Director makes a synchronous call to the specified URL and downloads the specification.

## CLI

### Renamed provisioning commands

[Kyma CLI commands](https://github.com/kyma-project/cli/tree/release-1.13#commands) for cluster provisioning on GKE and AKS have been renamed. There are also three separate provisioning commands for Gardener, and provider-specific default values are applied for all the Gardener commands, making CLI even more intuitive now. These are the available provisioning commands:

```
kyma provision gke
kyma provision aks
kyma provision gardener gcp
kyma provision gardener az
kyma provision gardener aws
```

## Serverless

### Caching enabled

We have significantly reduced the overall time within which Functions are built. All steps executed during the build are now cached, which speeds up the whole process. For example, thanks to caching, all packages are installed only when you explicitly modify them, and not every time you build a Function, as it was until now.

### Improved ServiceBinding creation

We also improved the way ServiceBindings are created for Function. So far, you could only create them when the Function was already running, so the order was sequential. We modified the component logic, and now it is possible to create ServiceBindings and Functions synchronously.

### Kubeless Function CRD to be removed

With the next Kyma release, the `functions.kubeless.io` CRD will be removed. As Kyma no longer uses Kubeless, migrate all Functions to `functions.serverless.kyma-project.io` before you start using Kyma 1.14. Refer to the [migration guide](https://github.com/kyma-project/kyma/blob/release-1.12/docs/migration-guides/1.11-1.12.md#serverless) for more details.

## Backup

### Backup functionality redesigned

In this release, we removed the Backup component from Kyma, together with the component-specific Velero drivers. The backup functionality is still available, but in a redesigned form that is based on a managed Kubernetes cluster for periodic backups of Kubernetes objects. The volumes, however, are not included in the automated backup procedure. That's why you should back up your volumes periodically using the VolumeSnapshot API resource. Read more about [backing up Kyma](https://github.com/kyma-project/kyma/blob/release-1.13/docs/kyma/04-12-back-up-kyma.md) in the documentation.

### Backup documentation

With the new backup strategy, we provide a brand new set of corresponding documentation. Refer to it to learn:

- [How backup works for Kyma and what are the on-demand volume snapshots](https://github.com/kyma-project/kyma/blob/release-1.13/docs/kyma/04-12-back-up-kyma.md)
- [How to back up your volumes using on-demand volume snapshots](https://github.com/kyma-project/kyma/blob/release-1.13/docs/kyma/08-06-create-volume-snapshots.md)
- [How to create on-demand volume snapshots for cloud providers](https://github.com/kyma-project/kyma/blob/release-1.13/docs/kyma/08-07-create-volume-snapshots-providers.md)
