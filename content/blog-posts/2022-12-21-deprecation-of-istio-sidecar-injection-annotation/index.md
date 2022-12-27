---
title: "Deprecation of the Istio sidecar injection annotation"
author:
  name: 
tags:
  - Kyma
  - Service Mesh

redirectFrom:
  - "/blog/deprecation-of-sidecar-injection-annotation"
---
Years go by, seasons change, and every new release brings some updates, fixes, and deprecation notes to which we need to adjust our workloads. With Istio 1.16 the `sidecar.istio.io/inject` annotation was deprecated in favor of the `sidecar.istio.io/inject` label. Read on to find out how to configure your Pods so that the Istio sidecar injection remains fully supported.

## Overview
The Istio sidecar proxy can be injected into a Pod in two ways:
* When you set the `istio-inject` label to `enable` at the Namespace level, every newly created Pod has the Istio sidecar proxy automatically injected. 
* When you directly modify the Deployment's configuration file and set the `istio-inject` label.

So far, you could modify a workloads's configuration using either the `sidecar.istio.io/inject` annotation or the `sidecar.istio.io/inject` label. From version 1.16 of Istio, **using the annotation is no longer fully supported**. Therefore, you must verify which of your Pods have the Istio sidecar injection annotation defined and replace each of these annotations with the `sidecar.istio.io/inject` label.

## Verify which Pods use the sidecar injection annotation

To see which Pods in your workloads have the `sidecar.istio.io/inject` annotation set, run the following kubectl command:
```
Insert a kubectl command
```
Or the following istioctl command:
```
Insert a istioctl command
```

Here's an example of a Pod with the `sidecar.istio.io/inject` annotation set to `true`:
```
Insert an example
```

## Change the sidecar injection annotations to labels

You must replace `sidecar.istio.io/inject` annotation with the `sidecar.istio.io/inject` label on each of the Pods listed after executing the previous commands. In order to do so, ...

```
Insert instructions
```

Here's an example of a Pod that has the Istio sidecar injection annotation successfully replaced with the label:
```
Insert an example
```

## Final remarks
 Read [this blog post](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma) to discover the benefits that the Istio sidecar proxy brings. If you want to learn how to enable the Istio sidecar injection, follow [this guide](https://kyma-project.io/docs/kyma/main/04-operation-guides/operations/smsh-01-istio-enable-sidecar-injection/). In [the blog section](https://kyma-project.io/blog/) on Kyma website you can always find the news, updates, and tutorials related to Kyma Istio.