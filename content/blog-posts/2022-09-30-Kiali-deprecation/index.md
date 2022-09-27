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

I’m part of the Kyma team working on the Observability feature, and I like to inform you today that we decided to deprecate the Kyma Kiali component and like t to provide you some reasoning behind that decision.

## Motivation

In the recent [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/) I outlined the new focus for the Observability domain in Kyma. To summarize, the shift into providing enterprise-grade qualities for Kyma modules moved the focus to enable the user streaming telemetry data into existing observability backends. Hereby, Kyma explicitly will not focus on being yet another way of running a specific observability stacks in enterprise-grade qualities but focusing on an open and easy integration into existing solutions.

The same principle we will apply now to Kiali. The current Kiali component is very lightweight and does not provide well-defined configuration options at runtime. The Kyma team supports the Kiali project, but don't want to become an active contributor with the goal of running Kiali with managed qualities inside a Kyma cluster. Instead, Kyma needs to assure that the user is at anytime enabled to integrate with Kiali, if they want to.

## The Facts & Alternatives

The Kiali component will be marked as deprecated with Kyma version 2.8. Instructions on how to install Kiali on your own are already [provided](https://github.com/kyma-project/examples/tree/main/kiali) and maintained on a best effort base. After you transitioned to a custom installation, the Kyma component gets removed with Kyma 2.11.

### Conclusion

To sharpen the focus of the project the Kiali component gets transformed into a simple set of instructions. You can start the transformation already today.
