---
title: "Kyma 2.8"
author:
  name: "Zhoujing Wang, RM @Kyma, and Maja Szostok, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.8.0"
redirectFrom:
  - "/blog/release-notes-28"
---

We've been working as [busy bees](https://www.youtube.com/watch?v=96tOPyuhuJs) to present to you Kyma 2.8. We packed this release with upgrades, updates, and improvements, as well as some changes to prepare the ground for the features to come. For example, we introduced support for response rewriting in Application Gateway, and improved Secret rotation for LogPipelines, but there's much more!

While we get back to [beeing](https://youtu.be/eBMxaOeREHA?t=8) busy with what's next, you go and explore what we've prepared for you.

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - exposing workloads in multiple Namespaces with one APIRule
- [Application Connectivity](#application-connectivity) - response rewriting and updated status codes in Application Gateway
- [Eventing](#eventing) - upgrade to NATS 2.9.0
- [Observability](#observability) - component updates, improved secret rotation support for LogPipelines, Kiali deprecation
- [Security](#security) - upgrade to Istio 1.15.0, `istio-init` container replaced with Istio CNI plugin
- [Serverless](#serverless) - Serverless engine switched to OTLP

## API Gateway

### Exposing workloads in multiple Namespaces with one APIRule

This Kyma release comes with an update to the APIRule CR that lets you expose and secure services in multiple Namespaces. Now it’s possible to specify the service Namespace either on the **spec.service** level or individually for each service in **spec.rules**. This new field is optional. If you do not specify it, the default APIRule Namespace is used. 

For more details, see the [APIRule CR documentation](https://kyma-project.io/docs/kyma/2.8/05-technical-reference/00-custom-resources/apix-01-apirule).
Check out also our new tutorial on how to [expose workloads in multiple Namespaces with a single APIRule definition](https://kyma-project.io/docs/kyma/2.8/03-tutorials/00-api-exposure/apix-09-expose-workloads-multiple-namespaces/).

## Application Connectivity

### Response rewriting in Application Gateway

From this release, Application Gateway in Kyma supports redirects for the HTTP requests in which the URL host remains unchanged.

With this functionality, the HTTP client has the option to resolve redirects within the scope of the same API.
If so configured, the HTTP client that originally called Application Gateway follows redirects through the Gateway, passing authorization, custom headers, URL parameters, and the body.

For more details, see [Application Gateway details](https://kyma-project.io/docs/kyma/2.8/05-technical-reference/ac-01-application-gateway-details/).

### Status codes returned by Application Gateway

In this release, we also updated the HTTP status codes that Application Gateway returns in the following cases:
- When the Application specified in the path does not exist.
- When the Application, service or entry is not passed in the path.
- When a call to target API times out.

For more details, see [Status codes for errors returned by Application Gateway](https://github.com/kyma-project/kyma/blob/release-2.8/components/central-application-gateway/README.md#status-codes-for-errors-returned-by-application-gateway).

## Eventing

### NATS upgraded to 2.9.0

In Kyma 2.8, we upgraded the Eventing stack to NATS 2.9.0.

For more details on this version, see the official [NATS 2.9.0 release notes](https://docs.nats.io/release-notes/whats_new#server-release-v2.9.0).

## Observability

### Jaeger 

In preparation for the [bigger changes planned in the Tracing area](https://github.com/kyma-project/community/tree/main/concepts/observability-strategy/configurable-tracing), we updated the Jaeger stack to [version 1.37](https://github.com/jaegertracing/jaeger/releases/tag/v1.37.0), and enabled [OTLP](https://opentelemetry.io/docs/reference/specification/protocol/) support.

At the same time, the [Serverless engine switched to OTLP](#serverless-engine-switched-to-otlp) as well, and is ready for the awesome future.

### Monitoring 

In this release, we also updated the Prometheus `node-exporter` to version 1.4.0, and `kube-state-metrics` to version 2.6.0.

For more details, see the release notes for [`node-exporter`](https://github.com/prometheus/node_exporter/releases) and [`kube-state-metrics`](https://github.com/kubernetes/kube-state-metrics/releases/tag/v2.6.0).

### Logging 

Yet another update that we made in this release is bumping Fluent Bit to [version 1.9.9](https://fluentbit.io/announcements/v1.9.9/). 

We also improved Secret rotation support for LogPipelines. A rotated Secret is now detected instantly.

> **NOTE:** Mind that with [Kyma 2.6](https://kyma-project.io/blog/2022/8/25/release-notes-26/), the Fluent Bit part of the Logging component was replaced by the new Telemetry component. This Fluent Bit part will be removed with the next Kyma release. If you have not adopted the change yet, do so now. 

### Deprecation of Kiali

The Kyma Observability feature was shifted in the direction of integration and openness to enable enterprise-grade qualities based on external services. 
See the blog post on [Observability strategy](https://kyma-project.io/blog/2022/9/21/observability-strategy) for more details. 
As a consequence, Kiali will be removed in Kyma 2.10. See the blog post on [Kiali deprecation](https://kyma-project.io/blog/2022/10/10/Kiali-deprecation/).

Worry not, though, as you can still integrate it on your own. 
We've got you covered, and we've prepared a tutorial on how to [install custom Kiali in Kyma](https://github.com/kyma-project/examples/blob/main/kiali/README.md).
 
## Security

### Istio upgraded to 1.15.0 

In this Kyma release, Istio was upgraded to version 1.15.0. 

For more details on the changes, read the official [Istio 1.15.0 release notes](https://istio.io/latest/news/releases/1.15.x/announcing-1.15/). 

### Istio CNI plugin

This Kyma version introduces the Istio CNI plugin. The plugin replaces the `istio-init` container, and it provides the same networking functionality, but it doesn't require Istio users to have elevated Kubernetes RBAC permission. 

To learn more, read about the [Istio CNI plugin](https://istio.io/latest/docs/setup/additional-setup/cni/).

## Serverless

### Serverless engine switched to OTLP

Following the [changes in Observability](#jaeger) and opening new [OTLP](https://opentelemetry.io/docs/reference/specification/protocol/)-compliant endpoints in Jaeger, the Serverless engine now configures Functions to send trace data to this new endpoint.
Functions built before releasing Kyma 2.8 will continue sending trace data to the previous endpoint.

For more information, see the [Environment variables in Serverless](https://kyma-project.io/docs/kyma/2.8/05-technical-reference/00-configuration-parameters/svls-02-environment-variables).