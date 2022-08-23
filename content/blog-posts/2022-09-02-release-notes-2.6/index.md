---
title: "Kyma 2.6"
author:
  name: Andreas Thaler PO @Kyma, and Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.6.0"
redirectFrom:
  - "/blog/release-notes-26"
---

You probably know the song ["Kyma, Kyma, Kyma, Kyma, Kyma chameleon"](https://www.youtube.com/watch?v=JmcA9LIIXWw). As you can see in the new release, Kyma, like chameleons, easily adapts to new surroundings. In 2.6 we introduce a new version of APIRule, improved function.kyma-project.io CRD, and configurable logging. But that's not all! Read on to find out more about the 2.6 release!

<!-- overview -->

See the overview of all changes in this release:

- [API Exposure](#api-exposure) -  Exposing and securing multiple services
- [Observability](#observability) - Configurable Logging, Eventing Dashboard
- [Serverless](#serverless) - Improved CRD
- [Service Mesh](#service-mesh) - Istio Sidecar Injection, Istio 1.14.3


## API Exposure

### Exposing and securing multiple services

This Kyma release comes with the new version of APIRule featuring exposing and securing multiple services. Now it’s possible to define service per rule. Read more about [APIRule CR](https://kyma-project.io/docs/kyma/latest/05-technical-reference/00-custom-resources/apix-01-apirule).

## Observability

### Configurable Logging

With the new [telemetry component](https://kyma-project.io/docs/kyma/main/01-overview/main-areas/observability/obsv-04-telemetry-in-kyma/), Kyma 2.6 introduces configurable logging. Now you can configure how logs are processed. Besides pushing all application logs to the in-cluster Loki service, you can integrate your own logging backends with Kyma. Furthermore, you can now define criteria for log collection, parsers, filters, and outputs. 
For more information, see the [migration guide]().

### Eventing Dashboard

This Kyma release comes with a consolidated Grafana dashboard for Eventing called **NATS Delivery**, so you can monitor the published and dispatched events in one, holistic view.

## Serverless

### Improved CRD

With Kyma 2.6, the new version (v1alpha2) of function.kyma-project.io CRD is available. With this, we improve usability and come one step closer to a stable v1 version.

The v1alpha2 changes include:

	• More structured information about the Function source.  The source subobject describes either the sources, in the case of inline Functions, or Git reference in the case of Git Functions. GitRepository CRD will no longer be used to store information about the Git sources.
	• build-time and run-time resource configuration were moved under a common parent field called `resourceConfiguration`.
	• Experimental support for external Kubernetes resource scalers (for example via KEDA ScaledObject API) using scale subresource.

The following versions of CustomResourceDefintions are deprecated:
	• serverless.kyma-project.io/v1alpha1/Function
	• serverless.kyma-project.io/v1alpha1/GitRepository
There is no need to update your Function templates immediately. We have installed a conversion webhook that handles the conversion on the fly between the deprecated v1alpha1 and the new v1alpha2 versions. This convenience must be considered temporary, and the automatic conversion will be removed after 6 months depreciation period.

## Service Mesh

### Istio Sidecar injection

Starting with this Kyma version, new workloads no longer have Istio sidecars injected automatically, unless configured otherwise. To learn more, read about the [benefits of having your workload as a part of the Istio service mesh](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma/). See also the [Istio documentation on how to enable sidecar injection](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/). 
  
Apart from the described changes, Kyma continues to make sure that the workloads that are part of the Istio service mesh have sidecars up to date.

### Istio upgraded to 1.14.3

In this release, we upgraded Istio from 1.14.1 to 1.14.3. For more details on the changes, read the official [Istio 1.14.3 release notes](https://istio.io/latest/news/releases/1.14.x/announcing-1.14.3/).
