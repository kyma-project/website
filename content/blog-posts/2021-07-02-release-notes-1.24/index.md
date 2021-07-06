---
title: "Kyma 1.24 Ekibastuz"
author:
  name: "Karolina Zydek, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.24.0"
redirectFrom:
  - "/blog/release-notes-124"
---

With engines on and all hands on deck, we are fully concentrated on the upcoming major release of Kyma 2.0. For this reason, this release is rather a short stop on a longer route, meant to apply all patches that would allow us to continue a secure journey. Read on to see the changes we provide in this release.

<!-- overview -->

See the overview of all changes in this release:

- [Installation](#installation) - Istio upgraded to 1.10.2, ORY charts updated
- [Observability](#observability) - Keycloak Gatekeeper replaced with OAuth2 Proxy

## Installation

### Istio upgraded to 1.10.2

In this release, we upgraded Istio from 1.9.5 to 1.10.2.
For more details on the introduced changes, read the official [Istio 1.10.2 release notes](https://istio.io/latest/news/releases/1.10.x/announcing-1.10.2/).  

### ORY charts updated

We also updated ORY charts, changing the Oathkeeper version to 0.38.11-beta.1.
For more details on the introduced changes, read the official [Oathkeeper 0.38-11-beta.1 release notes](https://github.com/ory/oathkeeper/releases/tag/v0.38.11-beta.1).

## Observability

### Keycloak Gatekeeper replaced with OAuth2 Proxy

Keycloak Gatekeeper, which was used to secure access to Kiali, Grafana, and Jaeger, was replaced with [OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy). Due to different capabilities of OAuth2 Proxy, the available override values to expose [Kiali](https://github.com/kyma-project/kyma/blob/main/resources/kiali/values.yaml#L30), [Grafana](https://github.com/kyma-project/kyma/blob/main/resources/monitoring/charts/grafana/values.yaml#L714), and [Jaeger](https://github.com/kyma-project/kyma/blob/main/resources/tracing/values.yaml#L123) also changed respectively. As a result, configuring the exposure of individual resources is not possible anymore. Also, matching custom OAuth2 claims is not supported anymore. 
