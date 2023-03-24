---
title: "Kyma 2.12.1"
author:
  name: "Magdalena Stręk, PO @Kyma, and Natalia Sitko, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.12.1"
redirectFrom:
  - "/blog/release-notes-212"
---

Each release, small or big, brings precious improvements to the Kyma world. With Kyma 2.12.1, we've updated NATS and Istio to their newer versions and fixed a few security vulnerabilities in the API Gateway component. Read on to learn the details.

<!-- overview -->

See the overview of all changes in this release:

- [API Gateway](#api-gateway) - security fixes
- [Eventing](#eventing) - NATS server image updated to `v2.9.15`
- [Security](#security) - Istio upgraded to version 1.16.3

## API Gateway
The version of API Gateway released with Kyma 2.12.1 contains a few necessary security fixes.

## Eventing  
### NATS server 

With Kyma 2.12.1, we updated the NATS server image to `v2.9.15`. For more details, see the [NATS-Server release notes](https://github.com/nats-io/nats-server/releases/tag/v2.9.15). 

## Security
### Service Mesh
This release comes with Istio upgraded from version 1.16.2 to 1.16.3. To learn more, read the official [Istio 1.16.3 release notes](https://istio.io/latest/news/releases/1.16.x/announcing-1.16/upgrade-notes/).