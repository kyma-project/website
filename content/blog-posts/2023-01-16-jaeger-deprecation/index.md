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

As part of the Kyma team working on the Observability capabilities, I'd like to let you know that we decided to deprecate the Kyma tracing component bundling the Jaeger backend for trace collection. In this blog post, I'm going to give you our reasoning behind that decision and outline alternatives.

## The Background

In my recent [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/), I outlined the new strategy for the Observability domain in Kyma. To summarize, the shift towards providing enterprise-grade qualities for Kyma modules moved the focus to enable the users to stream telemetry data into their centralized (outer-cluster) observability backends. Hereby, Kyma explicitly decided to support open and easy integration into existing solutions instead of being yet another provider of a specific observability stack in enterprise-grade quality.

Now, we'll apply the same principle to the Jaeger component, and with that the tracing component as it is. Kyma's current tracing component is very lightweight and does not meet enterprise-grade qualities. Thus, the current approach does not fit our strategy and will be deprecated.

## The Alternative

With Kyma 2.10 the first version of the [telemetry tracing](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/telemetry/telemetry-03-traces/) feature got introduced. Having that, it is possible to [integrate with a custom Jaeger installation](https://github.com/kyma-project/examples/tree/main/jaeger). Besides this, you can start integrating with any trace backend based on native OTLP.

## The Future

The tracing component will be marked as deprecated with Kyma version 2.11. 
Instructions on [how to install Jaeger on your own](https://github.com/kyma-project/examples/tree/main/jaeger) have already been provided and will be maintained on a best-effort base. Kyma's tracing component is planned to be removed with Kyma release 2.14, so you'll want to transition to a custom installation before that.
