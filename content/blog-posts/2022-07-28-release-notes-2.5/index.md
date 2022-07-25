---
title: "Kyma 2.5"
author:
  name: "Maja Szostok, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.5.0"
redirectFrom:
  - "/blog/release-notes-25"
---

In this release, we're [rowing our boat gently down the stream](https://www.youtube.com/watch?v=2d_GLxa4_bg), introducing support for Kubernetes 1.23, new alpha functionality, updates, and deprecation and changes in preparation for the new and better. Read on to find out exactly what Kyma 2.5 has to offer!

<!-- overview -->

See the overview of all changes in this release:

- [General](#general) - Support for Kubernetes 1.23.
- [API Exposure](#api-exposure) - APIRule version deprecation
- [Observability](#observability) - Configurable Logging in alpha, Fluent Bit updated to 1.9.6
- [Service Mesh](#service-mesh) - Istio Helm chart changes

## General

With Kyma 2.5, we now officially support Kubernetes in version 1.23. For more details on this version, read the [Kubernetes release notes](https://kubernetes.io/blog/2021/12/07/kubernetes-1-23-release-announcement/).

## API Exposure

### APIRule version deprecation

This Kyma release comes with deprecation of the APIRule CR in version `gateway.kyma-project.io./v1alpha1`. 

In the future releases, we will work on supporting [exposure of multiple services under the same host](https://github.com/kyma-project/kyma/issues/9936) and on the first version of [securing workloads with Istio](https://github.com/kyma-project/kyma/issues/12669). Stay tuned!

## Observability

### Configurable Logging in the alpha version

With release 2.5, we introduced an exciting alpha feature: Kyma’s Telemetry component.

It opens up the logging stack by separating the log collection and shipment from storage and analysis, and offers configuration possibilities at runtime. 
To ship logs to your preferred external logging backend, simply provide your own Fluent Bit output configuration. 

Of course, you can still use Kyma’s pre-configured Loki component as the logging backend within the cluster.

For more information, read the [Telemetry component](https://kyma-project.io/docs/kyma/2.5/01-overview/main-areas/observability/obsv-04-telemetry-in-kyma/) documentation.

### Fluent Bit updated to version 1.9.6

With Kyma 2.5, we updated Fluent Bit to version 1.9.6. For more details on this version, read the [Fluent Bit release notes](https://fluentbit.io/announcements/v1.9.6/).

## Service Mesh

### Istio Helm chart changes

In this release, we introduced a temporary setting: **global.sidecarMigration**.

It is used to support migration of existing runtimes from enabled sidecar injection to sidecar injection disabled by default.
In Kyma 2.5, this new parameter is set to `true`, so there aren't any changes to sidecar injection yet.
After the migration in a future release, the new setting will match the default Istio settings.

The parameter is here only for the migration purposes and will be removed in a future Kyma version.

To learn more about this topic, read about [Istio sidecars and why you want them](https://kyma-project.io/docs/kyma/2.5/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma/).