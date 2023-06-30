---
title: "Jaeger deprecation"
author:
  name: Andreas Thaler, PO @Kyma"
tags:
  - kyma
  - observability
  - tracing

redirectFrom:
  - "/blog/jaeger-deprecation"
---

As part of the Kyma team working on the Observability capabilities, I'd like to let you know that we decided to deprecate the Kyma tracing component bundling the Jaeger backend for trace collection. In this blog post, I'm going to give you our reasoning behind that decision and present alternative solutions.

## The Background

In my recent [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/), I outlined the new strategy for the Observability domain in Kyma. Along with the shift towards providing enterprise-grade qualities for Kyma modules, we move the focus on enabling users to stream telemetry data into their centralized (outer-cluster) observability backends. Therefore, Kyma explicitly decided to support open and easy integration into existing solutions instead of being yet another provider of a specific observability stack of enterprise-grade quality.

Now, we will apply the same principle to the Jaeger component and the tracing component as a whole. Kyma's current tracing component is very lightweight and does not meet enterprise-grade standards. Thus, the current approach does not fit our strategy and will be deprecated.

## The Alternative

With Kyma 2.10, we introduced the first version of [telemetry tracing](https://github.com/kyma-project/kyma/blob/release-2.10/docs/01-overview/main-areas/telemetry/telemetry-03-traces.md), which enables you to [perform a custom Jaeger installation](https://github.com/kyma-project/examples/tree/main/jaeger). Besides that, you can also start integrating any other trace backend based on native OTLP.

## The Future

The tracing component will be marked as deprecated with version 2.11 of Kyma. 
Instructions on [how to install Jaeger on your own](https://github.com/kyma-project/examples/tree/main/jaeger) have already been provided and will be maintained on a best-effort basis. Kyma's tracing component is planned to be removed with Kyma 2.14. Please transition to a custom installation before the 2.14 release.
