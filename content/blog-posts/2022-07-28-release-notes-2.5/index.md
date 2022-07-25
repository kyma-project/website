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

{THE INPUT SAYS THAT @NHingerl IS TO PROVIDE A DRAFT NOTE}

### Fluent Bit updated to version 1.9.6

With Kyma 2.5, we updated Fluent Bit to version 1.9.6. For more details on this version, read the [Fluent Bit release notes](https://fluentbit.io/announcements/v1.9.6/).

## Service Mesh

### Istio Helm chart changes

In this release, we introduced a temporary setting: **global.sidecarMigration**.

It is used to support migration of existing runtimes from enabled sidecar injection to sidecar injection disabled by default, which will resemble current Istio settings.
By default, this new parameter is set to true, so there aren't any changes to sidecar injection in this release.
The parameter will be removed in release 2.7. 