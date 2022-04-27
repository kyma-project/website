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

Not so long ago in a galaxy not so far away, there was a friendly kingdom of Kyma-land ruled by king Kyma the Wise. The king once said: “It is time to improve our kingdom so that we all can lead even happier lives”. As the king had never made an empty promise, he introduced many features, such as a complete setup of the Istio metrics, Istio upgrade to 1.13.2, overriding Function runtime image and improved Eventing backend custom resource (CR) status. Read more if you want to learn about other ideas the king came up with!

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - ORY stack deprecation
- [CLI](#cli) - Removed support for Kyma 1.x
- [Eventing](#eventing) - Improved Eventing backend CR status
- [Observability](#observability) - Improved documentation on limitiations, cleanup of rules and dashboards, complete Istio metrics
- [Serverless](#serverless) - Overrides for the Function runtime image
- [Service Mesh](#service-mesh) - Revert to distroless Istio images provided by Istio, Istio upgraded to 1.13.2

## API Gateway

### ORY stack deprecation note

Due to the growing demand for a closer integration with our Service Mesh Istio implementation, we decided to gradually switch from the current implementation behind Kyma API Gateway ([ORY Hydra](https://www.ory.sh/docs/hydra) and [ORY Oathkeeper](https://www.ory.sh/docs/oathkeeper)) to [Authentication](https://istio.io/latest/docs/concepts/security/#authentication) and [Authorization](https://istio.io/latest/docs/concepts/security/#authorization) features that Istio provides out of the box. With this change, we introduce more options in terms of configuration, flexibility, and performance to our customers. Additionally, we want to keep the Kyma stack as lean as possible. 

The changes will be introduced gradually. We plan to provide as much automigration as possible to ensure a smooth growth of Kyma API Gateway. This is just an intial information, no action is required.

## CLI

### Removed support for Kyma 1.x

As announced in the Kyma 2.0 release notes, starting from the version 2.2, Kyma CLI no longer supports Kyma 1.x versions. All the deprecated commands have been removed and are no longer available: 

- `kyma install`: Kyma 2.x equivalent is `kyma deploy`
- `kyma upgrade`: Kyma 2.x equivalent is `kyma deploy`
- `kyma console`: Kyma 2.x equivalent is `kyma dashboard`
- `kyma provision minikube`: Kyma 2.x equivalent is `kyma provision k3d`

## Eventing

### Improved Eventing backend CR status

We have made the Eventing backend CR status more verbose. We've replaced two of the three booleans, `publisherProxyReady` and `subscriptionControllerReady`, with the Kubernetes conditions. The `eventingReady` boolean remains unchanged.

## Observability

### Improved documentation on limitations

We added a new section outlining the limits of the shipped monitoring stack running on the production profile with the default settings. Read [Monitoring](https://kyma-project.io/docs/kyma/2.2/01-overview/main-areas/observability/obsv-01-monitoring-in-kyma/#limitations) for more information.

### Cleanup of rules and dashboards

We've continued to clean up rules and dashboards. Several rules for Kubernetes introduced by Kyma itself have been removed, as they overlapped with the community-based rules. With that, the monitoring chart is fully based on the rules provided by the community upstream chart. Also, one more Kubernetes-related Grafana dashboard called **Kyma / Pods** has been removed, as it overlapped with the existing dashboards.

### Complete Istio metrics

The Istio metrics setup now follows the approach recommended by Istio and provides all Istio metrics as aggregations over workload. Read [Observability Best Practicies](https://istio.io/latest/docs/ops/best-practices/observability/) for more information.

## Serverless

### Overrides for the Function runtime image

We've extended the definition of the Function CR. Now you can override the base image of the Serverless runtime with a custom Docker image.
 
You may need this feature if you want to build your Functions on top of a runtime with tooling that is not included in the default Alpine-based runtime (for example, the GCC compiler). 
 
Remember that, if you use a custom base image for your Functions, you are responsible for scanning and assessing any potential risks related to commonly known vulnerabilities that are potentially exploitable.
 
There is a dedicated [example](https://github.com/kyma-project/examples/tree/main/custom-serverless-runtime-image) defining a custom runtime and a [tutorial](https://kyma-project.io/docs/kyma/main/03-tutorials/00-serverless/svls-13-override-runtime-image) explaining how to use it in your Functions. 

## Service Mesh

### Revert to distroless Istio images provided by Istio

With the 2.2 Kyma release, both [Istio control plane and data plane](https://istio.io/latest/docs/ops/deployment/architecture/) again use distroless images provided by Istio.

### Istio upgraded to 1.13.2

We've upgraded Istio from 1.12.3 to 1.13.2. For more details on the introduced changes, read the official [Istio 1.13.2 release notes](https://istio.io/latest/news/releases/1.13.x/announcing-1.13.2/).