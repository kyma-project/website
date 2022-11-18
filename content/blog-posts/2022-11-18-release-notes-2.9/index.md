---
title: "Kyma 2.9"
author:
  name: "Wojciech Sołtys, RM @Kyma, and Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.9.0"
redirectFrom:
  - "/blog/release-notes-29"
---

Roses are red, violets are blue, and Kyma is ready with the new updates for you. This release comes with some interesting changes. For example, now we officially support Kubernetes in version 1.24. Read on to find out more about the 2.9 release!

<!-- overview -->

See the overview of all changes in this release:

- [General](#general) - support for Kubernetes 1.24
- [Observability](#observability) - Loki deprecation, component updates
- [Telemetry](#telemetry) - a preview of how a trace backend can be integrated in the future
- [Serverless](#serverless) - Node.js 12 runtime deprecation
- [CLI](#cli) - Function commands adjusted to the new API version
- [Eventing](#eventing) - NATS server updated to `v2.9.6`
## General

With this Kyma release, Kubernetes gets officially supported in version 1.24. The default settings for the provision commands, provided by Kyma CLI, were also adjusted. For more details on this version, read the [Kubernetes release notes](https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/).

While working on that, we've already taken major steps towards the next Kubernetes version 1.25 by cleaning all PodSecurityPolicies (PSP) and revising all SecurityContexts. Remember that you may need to replace your custom PSPs with the new security standards; click [here](https://kubernetes.io/docs/tasks/configure-pod-container/migrate-from-psp/) for more information. 

As we removed the generic Kyma PSP, your Pods may be prevented from being deployed now as the providers’ default policies are not fitting. During the upgrade to this Kyma version, you might need to introduce proper PSPs to compensate for the removal unless you've already disabled the PSP admission controller and switched to the new security admission model.

Follow this [migration guide](https://github.com/kyma-project/kyma/blob/release-2.9/docs/migration-guide-2.8-2.9.md) to learn how to clean up your Kyma resources from the PSP leftovers when you upgrade from Kyma 2.8 to 2.9.

## Observability

### Logging 

As you've probably learned from this [blog post](https://kyma-project.io/blog/2022/11/2/loki-deprecation/), we decided to deprecate the Loki installation which is part of the Logging component. Please start the transition to alternative solutions. The actual removal will not happen sooner than in six months, with Kyma 2.15 at the earliest. 

As announced in the release notes for [Kyma 2.6](https://kyma-project.io/blog/2022/8/25/release-notes-26/#configurable-logging), the Fluent Bit component got migrated from the Logging component to the Telemetry component. With this Kyma version, the old Fluent Bit setup finally got removed from the Logging component. Before you can upgrade to Kyma 2.9, you must follow this [migration guide](https://kyma-project.io/docs/kyma/2.6/migration-guide-2.5-2.6) if you have not switched to the telemetry component yet. 

### Monitoring 

In this release, we also updated Prometheus to version 2.39.1, Prometheus Operator to version 0.60.1, and OAuth2 Proxy to version 7.4.0.

For more details, see the release notes for [Prometheus](https://github.com/prometheus/prometheus/releases/tag/v2.39.1), [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator/releases/tag/v0.60.1), and [OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy/releases/tag/v7.4.0).
 
## Telemetry

### Tracing preview 

We are actively working on the possibility of [integrating your trace backend based on OTLP](https://github.com/kyma-project/kyma/issues/11231). You can try out the first preview version by following this new [trace demo](https://github.com/kyma-project/examples/tree/main/trace-demo). Give it a try and feel free to provide feedback on the related [GitHub issue](https://github.com/kyma-project/kyma/issues/11231).

## Serverless

### Node.js 12 runtime deprecated

Node.js 12 has reached the end of its life. Therefore, followed by the depreciation of Node.js 12 Serverless runtime, we decided to finally remove it from the list of the available Function runtimes. 

Your Node.js 12 Functions' workloads will continue to run, but you will not be able to edit them without changing the `runtime` field. Sooner or later, you must change the spec of your existing Node.js 12-based Functions and change the `runtime` field to either `nodejs14` or `nodejs16`.

For more information about the Node.js 12 deprecation, see the [Kyma 2.1 release notes](https://kyma-project.io/blog/2022/3/25/release-notes-21#node-js-12-deprecated).

## CLI

### Adjust Function commands to the new API version

Following the recent API changes in Serverless, the related Kyma CLI commands were adjusted to comply with the `serverless.kyma.project.io/v1alpha2` API version.

## Eventing

### NATS server

NATS server was updated to version 2.9.6. For more information read the [NATS server v2.9.6 release notes](https://github.com/nats-io/nats-server/releases/tag/v2.9.6).

The stream setup was modified for the case of full message storages. This state will now lead to the rejection of new messages and the return of error code `507`. These changes were introduced to prevent the deletion of old messages.