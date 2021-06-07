---
title: "Kyma 1.20 Amsterdam"
author:
  name: "Karolina Zydek, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.20.0"
redirectFrom:
  - "/blog/release-notes-120"
---

Hartelijk welkom bij Kyma 1.20 Amsterdam! Slip into a comfy pair of clogs, grab a tulip in your hand, and hop on a guided bike tour around recent changes in Kyma. This time it will be a quick but interesting ride, with four stops in the Eventing, Installation, Logging, and Serverless areas. Read on to see how these components have evolved and matured in the recent weeks, as their development is the leitmotif of this release.

<!-- overview -->

> **CAUTION:** If you currently have any overrides for Fluent Bit, you must update them before upgrading your Kyma deployment to 1.20. Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.20/docs/migration-guides/1.19-1.20.md) for details.

See the overview of all changes in this release:

- [Eventing](#eventing) - Removed support for outdated Knative APIs
- [Installation](#installation) - Evaluation and production profiles for Kyma installation and upgrade
- [Logging](#logging) - Revamp of the Fluent Bit chart, support for Secrets in Fluent Bit
- [Serverless](#serverless) - Configurable Docker registry

## Eventing

### Removed support for outdated Knative APIs

We've recently removed support for the `legacysinkbindings.webhook.sources.knative.dev` and `sinkbindings.webhook.sources.knative.dev` Knative APIs. Apart from these APIs, the change does not affect any other Kyma features. You can find the details of this change in the issue [#10628](https://github.com/kyma-project/kyma/pull/10628).

## Installation

### Evaluation and production profiles for Kyma installation and upgrade

Starting with the 1.20 release, you can install or upgrade Kyma with one of these predefined profiles:

- **Evaluation profile** with limited resources, suitable if you want to try out Kyma
- **Production profile** with high availability and scalability, recommended if you use Kyma for your production workload

For more details, read the [overview of both profiles](https://github.com/kyma-project/kyma/blob/1.20.0/docs/kyma/04-01-overview.md#profiles).

## Logging

### Revamp of the Fluent Bit chart

We upgraded to the latest upstream version of the Fluent Bit chart. As a result of changes to its overall structure, it has become much more flexible to use. In its new shape and form, Fluent Bit configuration supports native Fluent Bit parsers and allows you to [configure aliases](https://docs.fluentbit.io/manual/administration/monitoring#configuring-aliases) for input and output plugins.

Read about the details of all introduced changes in the issue [#10089](https://github.com/kyma-project/kyma/issues/10089) and the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.20/docs/migration-guides/1.19-1.20.md).

### Support for Secrets in Fluent Bit

Up until now, when you wanted to send logs to output plugins (such as Elastic Search or HTTP-based services), you had to pass their basic authentication credentials to Fluent Bit using plain ConfigMaps. These times are over. We've just [introduced](https://github.com/kyma-project/kyma/issues/10018) support for the already existing [Fluent Bit feature](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/variables) and provided a way to store these sensitive details in a more secure way - in Secrets.

> **CAUTION:** We strongly recommend you use this new feature and move all your credentials for output plugins to Secrets. Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.20/docs/migration-guides/1.19-1.20.md) for more details.

## Serverless

### Configurable Docker registry

Before 1.20, you could change the default internal Docker registry for your Function images to an external one only through overrides. You had to do it centrally for the whole cluster and trigger either a Kyma installation or an update process afterward. We have now extended this functionality by enabling registry switch at runtime. Changing the underlying Docker registry is now possible without the hassle of running an update. Moreover, you also get the flexibility to choose between different Docker registries for different Namespaces. This way, you can configure registries as you please. You can either opt for one central external registry in the cluster or switch to Docker Hub, Google Container Registry (GCR), or Azure Container Registry (ACR) in specific Namespaces. You can even have different repositories in different Namespaces. Sky is the limit.

Learn more about:
- [Internal and external registries in general](https://github.com/kyma-project/kyma/blob/1.20.0/docs/serverless/03-03-registries.md)
- [How you can switch between registries](https://github.com/kyma-project/kyma/blob/1.20.0/docs/serverless/08-07-switch-to-external-registry.md)
- [Admission webhook and its role in the whole process](https://github.com/kyma-project/kyma/blob/1.20.0/docs/serverless/03-05-supported-webhooks.md#admission-webhook)

> **CAUTION:** Although you can now switch back and forth between Docker registries, bear in mind that the internal registry is suitable only for local development. For production purposes, always use an external one.
