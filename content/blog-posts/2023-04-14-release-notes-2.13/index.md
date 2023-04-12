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

#TODO

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - #TODO
- [Observability](#observability) -  #TODO 
- [Telemetry](#telemetry) - #TODO
- [Serverless](#serverless) - #TODO
- [Security](#security) - #TODO


## API Gateway
Ory Hydra Postgres DB do not allow localhost connections without password anymore https://github.com/kyma-project/kyma/pull/17138

With this Kyma release API Gateway was updated to version 1.5.0, which introduced default request time for exposed workload.


## Observability

### Monitoring

- Update of components:
    - Kube-state-metrics 2.8.1 https://github.com/kyma-project/kyma/pull/17058


## Telemetry

### Manager
- The way how the Telemetry manager caches Kubernetes resources has been improved, so it needs fewer permissions for access to Kubernetes resources. Also, this reduces the memory footprint (https://github.com/kyma-project/kyma/issues/17001).
- Improved validation of LogPipelines by the webhook (https://github.com/kyma-project/kyma/issues/15480).
- The CRD reference documentation is generated from the CRD description, so it's always up to date (https://github.com/kyma-project/kyma/issues/15663).
- Improved resiliency of the setup: If Fluent Bit was deleted, it’s automatically recovered (https://github.com/kyma-project/telemetry-manager/pull/99).

### Tracing
- Update of components:
  - Otel Collector 0.74.0 https://github.com/kyma-project/kyma/pull/17058

### Logging
- Profiles have been removed and production settings are the new default (https://github.com/kyma-project/kyma/issues/16853).
- Improved retry handling (https://github.com/kyma-project/kyma/issues/17113).
- Update of components:
  - Fluent Bit 2.0.10 (https://github.com/kyma-project/kyma/pull/17109)


## Serverless

###  serverless.kyma-project.io/v1alpha1 API version removed

Following the  depreciation (with [kyma 2.6](https://kyma-project.io/blog/2022/8/25/release-notes-26/#serverless)) we are removing the serverless.kyma-project.io/v1alpha1 API version

The conversionwebhook that was converting from the v1alpha1 to v1alpha2 during the grace period is now removed with Kyma 2.13.

### Removed dependencies to cluster-essentials

Serverless module brings all it's belongings within its helm chart and becomes independant on  cluster-essentials module.
This is a step towards kyma modularisation where independant modules are the basic concept.

### Maintanance

We have introduced multiple security patches and fixed a [bug](https://github.com/kyma-project/kyma/issues/17147) related to premature Function CR creation


## Security

### Istio upgraded to 1.17.1

In this release, we upgraded Istio from 1.16.3 to 1.17.1. For more details on the changes, read the official [Istio 1.17.1 release notes](https://istio.io/latest/news/releases/1.17.x/announcing-1.17/upgrade-notes/).