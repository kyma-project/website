---
title: "Kiali deprecation"
author:
  name: Andreas Thaler, PO @Kyma"
tags:
  - kyma
  - observability
  - Kiali

redirectFrom:
  - "/blog/kiali-deprecation"
---

As part of the Kyma team working on the Observability capabilities, I'd like to let you know that we decided to deprecate the Kyma Kiali component. In this blog post, I'm going to give you our reasoning behind that decision.

## The Background

In my recent [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/), I outlined the new strategy for the Observability domain in Kyma. To summarize, the shift towards providing enterprise-grade qualities for Kyma modules moved the focus to enable the users to stream telemetry data into their centralized (outer-cluster) observability backends. Hereby, Kyma explicitly decided to support open and easy integration into existing solutions instead of being yet another provider of a specific observability stack in enterprise-grade quality.

Now, we'll apply the same principle to Kiali. Kyma's current Kiali component is very lightweight and does not meet enterprise-grade qualities. Thus, the current approach does not fit our strategy. 

Instead of running Kiali with managed qualities inside a Kyma cluster, Kyma wants to enable users to connect with Kiali whenever they want.

## The Future

The Kiali component will be marked as deprecated with Kyma version 2.8. 
Instructions on [how to install Kiali on your own](https://github.com/kyma-project/examples/tree/main/kiali) have already been provided and will be maintained on a best-effort base. Kyma's Kiali component is planned to be removed with Kyma release 2.11, so you'll want to transition to a custom Kiali installation before that.


To sharpen the focus of the Kyma project, the Kiali component is transformed into a simple set of instructions. You can start the transformation already today.
