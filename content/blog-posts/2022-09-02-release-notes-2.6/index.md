---
title: "Kyma 2.6"
author:
  name: Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.6.0"
redirectFrom:
  - "/blog/release-notes-26"
---

Read on to find out exactly what Kyma 2.6 has to offer!

<!-- overview -->

See the overview of all changes in this release:

- [General](#general) - Support for Kubernetes 1.23
- [API Exposure](#api-exposure) -  exposing and securing multiple services
- [Observability](#observability) - Configurable Logging, Eventing Dashboard
- [Serverless](#serverless) - Improved CRD
- [Service Mesh](#service-mesh) - Istio Sidecar Injection, Istio 1.14.3


## API Exposure

### Exposing and securing multiple services

This Kyma release comes with new version of APIRule featuring exposing and securing multiple services. Now it’s possible to define service per rule. Read more about APIRule CR [here](https://kyma-project.io/docs/kyma/latest/05-technical-reference/00-custom-resources/apix-01-apirule).

## Observability

### Configurable Logging

With the new [telemetry component](https://kyma-project.io/docs/kyma/main/01-overview/main-areas/observability/obsv-04-telemetry-in-kyma/), Kyma 2.6 introduces configurable logging – now users can configure how logs are processed. Besides pushing all application logs to the in-cluster Loki service, users can integrate their own logging backends with Kyma. Furthermore, users can now define criteria for log collection, parsers, filters, and outputs. 
For more information, see the [migration guide]().

### Eventing Dashboard

This Kyma release comes with a consolidated Grafana dashboard for Eventing called "NATS Delivery", so you can monitor the published and dispatched events in one, holistic view.

## Serverless

### Improved CRD

With Kyma 2.6, the new version (v1alpha2) of function.kyma-project.io CRD is available. With this we want to improve usability and come one step closer towards a stable v1 version.

The v1alpha2 changes include:

	• More structured information about the function source.  The source sub-object describes either the sources in case of inline function, or Git reference in case of Git functions.  GitRepository CRD will no longer be used to store information about Git sources.
	• build-time and run-time resource configuration were moved under a common parent field called `resourceConfiguration`
	• Experimental support for external Kubernetes resource scalers (I.e via KEDA ScaledObject API) via scale subresource

The following versions of custom resource definitions are deprecated:
	• serverless.kyma-project.io/v1alpha1/Function
	• serverless.kyma-project.io/v1alpha1/GitRepository
No need to update your function templates immediately. We have installed a conversion webhook that will handle on-the-fly conversion between the deprecated v1alpha1 and the new v1alpha2 versions. This convenience must be considered temporary, and the automatic conversion will be removed after 6 months of depreciation grace period.

## Service Mesh

### Istio Sidecar Injection

Starting with this Kyma version, new workloads no longer have Istio sidecars injected automatically, unless configured otherwise. To learn more, read about the [benefits of having your workload as a part of the Istio service mesh](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma/). See also the [Istio documentation on how to enable sidecar injection](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/). 
  
Apart from the described changes, Kyma continues to make sure that the workloads that are part of the Istio service mesh have sidecars up to date.

### Istio upgraded to 1.14.3

In this release, we upgraded Istio from 1.14.1 to 1.14.3. For more details on the changes, read the official [Istio 1.14.3 release notes](https://istio.io/latest/news/releases/1.14.x/announcing-1.14.3/).