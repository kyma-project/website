---
title: “Kyma 2.15”
author:
  name: “Wojciech Soltys, RM @Kyma, and Malgorzata Swieca, Technical Writer @Kyma”
tags:
  - release-notes
type: release
releaseTag: “2.15.0”
redirectFrom:
  - “/blog/release-notes-215"
---

TBD

## General
For upgrading to Kyma 2.15 please read the migration guide

## Telemetry
### Manager
- In preparation ((https://github.com/kyma-project/telemetry-manager/issues/150)) for turning the telemetry component into a module, resources got consolidated and a cleanup script need to be executed on upgrade. Please follow the related migration script
- More robust handling of webhook certificates (https://github.com/kyma-project/kyma/issues/16626)

### Tracing
- Update of components
  - Otel Collector 0.77.0 (https://github.com/kyma-project/kyma/pull/17469)

### Logging
- Update of components
 - Fluent Bit 2.1.2 (https://github.com/kyma-project/kyma/pull/17485)
- Improved security setup of fluentbit (https://github.com/kyma-project/kyma/pull/17574)

## Security
As a part of security hardening and kyma security team recommendations, ECDHE-RSA-AES256-SHA and ECDHE-RSA-AES128-SHA cipher suites used in default Kyma gateway become deprecated starting from 2.15 Kyma version. Mentioned configuration will be removed in Kyma version 2.18. Clients dependant on mentioned ciphers suites won’t be accepted.

## API Gateway
This Kyma release brings unified timeout for workloads exposed with APIRules. Default timeout for http requests is 180s and it’s defined on Istio VirtualService level.

## Serverless
### Simplified Internal Docker Registry setup
With kyma 2.15 we have simplified serverless configuration with regards to how internal docker regisrty is used. From now on, the images  for function runtime pods are pulled from internal docker registry via NodePort.

With this change we improve security as the internal docker registry is no longer exposed to the outside of the kubernetes cluster. Additionally, it makes serverless fully independent on istio module in all installation modes.

### Deployment profiles removed
We have removed the predefined deployment profiles (evaluation and production) for serverless. This was done as preparation for independant installation model for serverless. We will shift from profiled overrides used at modules installation time towards  runtime-configurable resources.
