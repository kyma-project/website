---
title: "Kyma 2.13"
author:
  name: "Wojciech Soltys, RM @Kyma, and Iwona Langer, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.13.0"
redirectFrom:
  - "/blog/release-notes-213"
---

Like the sea that relentlessly sends waves softly shaping the shore, we also incessantly keep sending new releases to you and hope to improve your Kyma experience gently but consistently. Here we come, with version 2.13, bringing a collection of updates, fixes, and improvements that will make you love Kyma even more! Read on to find out what we have prepared for you.

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - version 1.5.0 released; localhost connections without password no longer allowed
- [Observability](#observability) -  updated kube-state-metrics 
- [Telemetry](#telemetry) - improved caching of Kubernetes resources and validation of LogPipelines; auto-generated CRD reference documentation; improved setup resiliency; updated OTel Collector 
- [Serverless](#serverless) - removed `serverless.kyma-project.io/v1alpha1` API version and dependencies to cluster-essentials 
- [Security](#security) - Istio upgraded to 1.17.1


## API Gateway  

From now on, the Ory Hydra Postgres database refuses localhost connections without a password, as we have introduced MD5 authentication. Check [this PR](https://github.com/kyma-project/kyma/pull/17138) for more details.

Also, we have updated API Gateway to version 1.5.0 and thus introduced a default request time for the exposed workload.

## Observability  
### Monitoring  

  With the 2.13 version of Kyma, we've [updated kube-state-metrics to version 2.8.1](https://github.com/kyma-project/kyma/pull/17058).

## Telemetry  
### Manager  

This release brings improvement in the way Telemetry Manager caches Kubernetes resources. As a result, the manager has a reduced memory footprint and requires fewer access permissions to Kubernetes resources. For more information on the changes, see [this issue](https://github.com/kyma-project/kyma/issues/17001). 

We have also [improved the validation of LogPipelines by the webhook](https://github.com/kyma-project/kyma/issues/15480), which allows for earlier feedback reception. 

As of now, the CRD reference documentation is always up-to-date as it's [automatically generated from the CRD description](https://github.com/kyma-project/kyma/issues/15663).

We have improved the resiliency of the setup. Consequently, Fluent Bit DaemonSet is automatically recovered in case of unattended deletion. See [this PR](https://github.com/kyma-project/telemetry-manager/pull/99) for more details.

### Tracing  

With Kyma 2.13, we've [updated OTel Collector to version 0.73.0](https://github.com/kyma-project/kyma/pull/17058).

### Logging  

With this release, [the profiles for the Telemetry component have been consolidated](https://github.com/kyma-project/kyma/issues/16853), and no specialized settings for profiles are in use anymore. The settings from the previous production profile are the new default.

We have [updated Fluent Bit to version 2.0.10](https://github.com/kyma-project/kyma/pull/17109) and also [improved its retry handling](https://github.com/kyma-project/kyma/issues/17113) by increasing the Fluent Bit retry limit.

## Serverless  
###  `serverless.kyma-project.io/v1alpha1` API version removed  

Following the depreciation of the `serverless.kyma-project.io/v1alpha1` API version with [Kyma 2.6](https://kyma-project.io/blog/2022/8/25/release-notes-26/#serverless), we've finally removed it in this release. The conversion webhook responsible for converting v1alpha1 to v1alpha2 during the grace period has also been removed.

### Dependencies to cluster-essentials removed

From now on, the Serverless module brings all its belongings within its Helm Chart and becomes independent of the cluster-essentials module. It is a step towards the modularization of Kyma, in which independent modules are the basic concept.

### Maintenance  

We have introduced multiple security patches and fixed the [bug](https://github.com/kyma-project/kyma/issues/17147) responsible for premature Function CR creation.

## Security  
### Istio upgraded to 1.17.1  

With this release, we have upgraded the Istio version from 1.16.3 to 1.17.1. For more details on the changes, read the official [Istio 1.17.1 release notes](https://istio.io/latest/news/releases/1.17.x/announcing-1.17.1/).  
