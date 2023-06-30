---
title: "Kyma 2.3"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "2.3.0"
redirectFrom:
  - "/blog/release-notes-23"
---

Summer is just around the corner. The days are longer and brighter and we can't help but think about the upcoming holidays. That's why with Kyma 2.3 we say goodbye to the good old spring days (and to some Kyma components), and we already look forward to new challenges. Read the full release notes to learn about all the improvements and fixes we provided with the Kyma 2.3 release.

<!-- overview -->

> **CAUTION:** Before upgrading to Kyma 2.3, read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-2.3/docs/migration-guide-2.2-2.3.md).

See the overview of all changes in this release:

- [Application Connectivity](#application-connectivity) - Removal of Application Registry and Connector Service
- [API Gateway](#api-gateway) - Ory stack upgrade
- [Observability](#observability) - Monitoring upgrade
- [Serverless](#serverless) - Improved Git Functions handling, fixed the incorrect lifecycle management of the Serverless defaulting webhook certificate, additional rescheduling of Function's failed build jobs


## Application Connectivity

### Removal of Application Registry and Connector Service

Kyma 2.3 brings a big change in the Application Connectivity area – almost 2 years ago we've published a note about the [deprecation of those services](https://github.com/kyma-project/website/blob/main/content/blog-posts/2020-05-29-release-notes-1.13/index.md#application-connector) and now they have been completely removed. The functionality of connecting and registering external services is no longer available in the [standalone mode](https://github.com/kyma-project/kyma/tree/release-2.3/docs/01-overview/main-areas/application-connectivity) of Kyma. Worry not though. If you want to keep the old flow available in your cluster, you can make use of [Compass](https://github.com/kyma-incubator/compass) and Kyma integration.

We strongly encourage you to explore other options – [Central Application Gateway](https://github.com/kyma-project/kyma/tree/main/components/central-application-gateway#api) provides an easier way of reaching external APIs, and all you need to do is apply a simple YAML file with an Application custom resource (CR) instead of going through the cumbersome certificate flow. Eventing can also be easily exposed with an API Rule.

Also, due to the removal of the mentioned components, we recommend you to delete the obsolete resources when upgrading to Kyma 2.3. Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-2.3/docs/migration-guide-2.2-2.3.md) to learn more.


## API Gateway

### Ory stack upgrade

As of the Kyma 2.3 release, we have upgraded:
- Ory Oathkeeper from 0.38.15 to v0.38.25. For more details, read the official [Oathkeeper v0.38.25-beta.1](https://github.com/ory/oathkeeper/releases/tag/v0.38.25-beta.1) release notes.
- Ory Hydra from 1.10.7 to 1.11.8. For more details, read the official [Hydra v1.11.8](https://github.com/ory/hydra/releases/tag/v1.11.8) release notes.
- Ory Hydra-Maester from 0.0.24 to 0.0.25. For more details, read the official [Hydra-Maester v0.0.25](https://github.com/ory/hydra-maester/releases/tag/v0.0.25) release notes.
- PostgreSQL from 11.14 to 11.15. For more details, read the official [PostgreSQL 11.15](https://www.postgresql.org/docs/release/11.15/) release notes.


## Observability

### Monitoring upgrade

In 2.3, we have also upgraded monitoring component to the latest version of the [`kube-prometheus-stack`](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) chart. With that, multiple Prometheus rules got updated and the components were upgraded to the following versions:
- Prometheus-operator v0.56.2
- Alertmanager 0.24.0
- Prometheus 2.35.0
- Grafana 7.5.16


## Serverless

### Improved Git Functions handling

We improved the reconciliation of Git Functions and removed redundant `git fetch` operations, which improves the stability of Function Controller.

### Fixed the incorrect lifecycle management of the Serverless defaulting webhook certificate

With 2.3, we fixed the incorrect lifecycle management of the Serverless defaulting webhook service certificate. Previously, the certificate was expiring after few days and it wasn't renewed. Now, the certificate is renewed automatically after expiration.

### Additional rescheduling of Function's failed build jobs

2.3 brings yet another improvement in the Serverless area. Now, if a Function build fails, it is rescheduled after some time, which wasn't the case in the previous release. This improves consistency and integrity of the Function's state after Kyma upgrade.
