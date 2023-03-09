---
title: "Kyma 2.6"
author:
  name: "Andreas Thaler, PO @Kyma, and Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.6.0"
redirectFrom:
  - "/blog/release-notes-26"
---

You probably know the song ["Kyma, Kyma, Kyma, Kyma, Kyma chameleon"](https://youtu.be/JmcA9LIIXWw?t=44). As you can see with the new release, Kyma, like chameleons, easily adapts to new surroundings. In 2.6, we introduced a new version of APIRule, improved the `function.kyma-project.io` CustomResourceDefinition (CRD), and provided configurable logging. But that's not all! Read on to find out more about the 2.6 release!

<!-- overview -->

See the overview of all changes in this release:

- [API Exposure](#api-exposure) -  Support for exposing and securing multiple services
- [Observability](#observability) - New Configurable Logging and new Eventing Dashboard
- [Serverless](#serverless) - Function CRD improved
- [Service Mesh](#service-mesh) - Istio sidecar injection disabled by default, Istio upgraded to 1.14.3

## API Exposure

### Exposing and securing multiple services

This Kyma release comes with a new version of APIRule, featuring exposing and securing multiple services. Now it’s possible to define a service per rule. Read more about the [APIRule custom resource (CR)](https://github.com/kyma-project/kyma/blob/release-2.6/docs/05-technical-reference/00-custom-resources/apix-01-apirule.md).

## Observability

### Configurable Logging

With the new [Telemetry component](https://github.com/kyma-project/kyma/blob/release-2.6/docs/01-overview/main-areas/observability/obsv-04-telemetry-in-kyma.md), Kyma 2.6 introduces configurable logging. Now you can configure how logs are processed. Besides pushing all application logs to the in-cluster Loki service, you can integrate your own logging backends with Kyma. Furthermore, you can now define criteria for log collections, parsers, filters, and outputs.
> **CAUTION:** If you used override values for the logging chart to configure Fluent Bit, you must follow the [migration guide](https://github.com/kyma-project/kyma/blob/release-2.6/docs/migration-guide-2.5-2.6.md).

### Eventing Dashboard

This Kyma release comes with a consolidated Grafana dashboard for Eventing called NATS delivery, so now you can monitor the published and dispatched events in one, holistic view.

## Serverless

### Improved Function CRD

With Kyma 2.6, the new `v1alpha2` version of the `function.kyma-project.io` CRD is available. It improves usability, and paves the way for a stable `v1` version, which is just around the corner.

The `v1alpha2` changes include:

- The **source** parameter now providing more structured information. For inline Functions, it provides the source. For Git Functions, it provides the Git reference. This information is no longer stored in the GitRepository CR.
- Build-time and run-time resource configurations moved under the common parent field called **resourceConfiguration**.
- Experimental support for external Kubernetes resource scalers (for example via KEDA ScaledObject API) using scale subresource.

The following versions of CRDs are deprecated:

- `serverless.kyma-project.io/v1alpha1/Function`
- `serverless.kyma-project.io/v1alpha1/GitRepository`

You don't need to update your Function templates immediately. Kyma provides a conversion webhook that handles the conversion on the fly between the deprecated `v1alpha1` and the new `v1alpha2` versions. This automatic conversion is a temporary convenience; it will be removed after a 6-month depreciation period.

## Service Mesh

### Istio sidecar injection

Starting with this Kyma version, new workloads no longer have Istio sidecars injected by default. If you want automatic sidecar injection, you must [enable it](https://github.com/kyma-project/kyma/blob/release-2.6/docs/04-operation-guides/operations/smsh-01-istio-enable-sidecar-injection.md) yourself. Learn more about the [benefits of having your workload as a part of the Istio service mesh](https://github.com/kyma-project/kyma/blob/release-2.6/docs/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma.md).
  
Despite the change, Kyma continues to update the sidecars of workloads that are part of the Istio service mesh.

### Istio upgraded to 1.14.3

In this release, Kyma upgraded Istio from 1.14.1 to 1.14.3. For more details, read the official [Istio 1.14.3 release notes](https://istio.io/latest/news/releases/1.14.x/announcing-1.14.3/).
