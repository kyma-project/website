---
title: "Kyma 2.2"
author:
  name: "Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release
releaseTag: "2.2.0"
redirectFrom:
  - "/blog/release-notes-22"
---

Not so long ago in a galaxy not so far away, there was a friendly kingdom of Kyma-land ruled by king Kyma the Wise. The king once said: “It is time to improve our kingdom, so that everyone can lead even happier lives”. As the king has never made an empty promise, he introduced many features, such as complete setup of the Istio metrics, Istio upgrade to 1.13.2, overriding Function runtime image and improved Eventing backened CR status. Read more, if you want to learn about other ideas the king came up with!

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - ORY stack deprecation
- [CLI](#cli) - Removed support for Kyma 1.x
- [Eventing](#eventing) - Improved Eventing Backend CR status
- [Observability](#observability) - Improved documentation on limitiations, cleanup of rules and dashboards, complete Istio metrics
- [Serverless](#serverless) - Overrides for function runtime image
- [Service Mesh](#service-mesh) - Revert to distroless Istio images provided by Istio, Istio upgraded to 1.13.2

## API Gateway

### ORY stack deprecation note

Due to the growing demand for a closer integration with our Service Mesh Istio implementation, we decided to gradually switch from the current implementation behind Kyma API Gateway ([ORY Hydra](https://www.ory.sh/docs/hydra) and [ORY Oathkeeper](https://www.ory.sh/docs/oathkeeper)) to [Authentication](https://istio.io/latest/docs/concepts/security/#authentication) and [Authorization](https://istio.io/latest/docs/concepts/security/#authorization) features that Istio provides out of the box. With this change, we introduce more options in terms of configuration, flexibility, and performance to our customers. Additionally, we want to keep the Kyma stack as lean as possible. 

The changes will be introduced gradually. We plan to provide as much automigration as possible to ensure a smooth growth of Kyma API Gateway. This is just an intial information, no actions are required.

## CLI

### Removed support for Kyma 1.x

As announced in the Kyma 2.0 release notes, with version 2.2 the Kyma CLI no longer supports Kyma 1.x versions. All deprecated commands have been removed. 

The following commands are no longer available: 

- `kyma install`: Kyma 2 equivalent is `kyma deploy`
- `kyma upgrade`: Kyma 2 equivalent is `kyma deploy`
- `kyma console`: Kyma 2 equivalent is `kyma dashboard`
- `kyma provision minikube`: Kyma 2 equivalent is `kyma provision k3d`

## Eventing

### Improved Eventing backend CR status

With Kyma 2.2, we have made the Eventing backend CR status more verbose. We've replaced two (`publisherProxyReady` and `subscriptionControllerReady`) of the three booleans with the Kubernetes conditions. The `eventingReady` boolean remains unchanged.

## Observability

### Improved documentation on limitations

We added a new section outlining the limits of the shipped monitoring stack, running on the production profile with the default settings. Read [Monitoring](https://kyma-project.io/docs/kyma/main/01-overview/main-areas/observability/obsv-01-monitoring-in-kyma/#limitations) for more information.

### Cleanup of rules and dashboards

We continue to cleanup rules and dashboards. Several rules for Kubernetes introduced by Kyma itself were removed, as they were overlapping with the community-based rules. With that, the monitoring chart is fully based on the rules provided by the community upstream chart. Also, one more Kubernetes-related Grafana dashboard called "Kyma / Pods" was removed, as it overlapped with the existing dashboards.

### Complete Istio metrics

The Istio metrics setup now follows the recommended approach of Istio and provides all Istio metrics as aggregations over workload.

## Serverless

### Overrides for the Function runtime image

With Kyma 2.2, we extend the definition of the Function custom resource. Now it allows you to override base image of the serverless runtime with a custom docker image.
 
You may need this feature if you want to build your Functions on top of runtime with tooling that is not included in the default alpine based runtime (i.e. GCC compiler). 
 
Remember that, if you use a custom base image for your Functions, you are responsible for scanning and assessing any potential risks related to commonly known vulnerabilities that are potentially exploitable.
 
There is a dedicated [example](https://github.com/kyma-project/examples/tree/main/custom-serverless-runtime-image) defining a custom runtime and a [tutorial](https://kyma-project.io/docs/kyma/main/03-tutorials/00-serverless/svls-13-override-runtime-image) explaining how to use it in your Functions. 

## Service Mesh

### Revert to distroless Istio images provided by Istio

With the 2.2 Kyma release, both [Istio control plane and data plane](https://istio.io/latest/docs/ops/deployment/architecture/) use distroless images provided by Istio.

### Istio upgraded to 1.13.2

With this release, we upgraded Istio from 1.12.3 to 1.13.2. For more details on the introduced changes, read the official [Istio 1.13.2 release notes](https://istio.io/latest/news/releases/1.13.x/announcing-1.13.2/).