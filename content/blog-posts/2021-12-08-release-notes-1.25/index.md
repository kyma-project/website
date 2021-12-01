---
title: "Kyma 1.25"
author:
  name: "Maja Kurcius, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.25.0"
redirectFrom:
  - "/blog/release-notes-125"
---

Salve!
If you're wondering why the salutation in Latin and why we're using the _lingua franca_ at the moment:
after we left Ekibastuz, we decided to stop exploration for just a little while and land on this unnamed island to patch our boat a bit and boost our security. This release is not big, but it's an important one, as it brings you updated Ory stack and upgraded Observability components.

<!-- overview -->

See the overview of all changes in this release:

- [Installation](#installation) - Ory stack updated
- [Observability](#observability) - Fluent Bit, Grafana, and OAuth2 Proxy upgraded 

## Installation

### Ory stack updated

With this release, we have upgraded the following Ory components:

- Ory Oathkeeper from 0.38.11 to 0.38.15
- Ory Hydra from 1.8.5 to 1.10.7
- Ory Hydra Maester from 0.0.21 to 0.0.24
- Ory Oathkeeper Maester from 0.1.4 to 0.1.5

See the official list of changes for [Ory Oathkeeper](https://github.com/ory/oathkeeper/releases/tag/v0.38.15-beta.1), [Ory Hydra](https://github.com/ory/hydra/releases/tag/v1.10.7), [Ory Hydra Maester](https://github.com/ory/hydra-maester/releases/tag/v0.0.24), and [Ory Oathkeeper Maester](https://github.com/ory/oathkeeper-maester/releases/tag/v0.1.5). 

## Observability

### Observability components upgraded

With Kyma 1.25, we have also refreshed Observability a bit (no pun intended). Fluent Bit has been upgraded to the latest version 1.8.10, Grafana got a minor upgrade to 7.5.11, and OAuth2 Proxy was bumped to version 7.2.0.
For more information, read the release notes for [Fluent Bit](https://fluentbit.io/announcements/v1.8.10/), [Grafana](https://grafana.com/docs/grafana/v7.5/whatsnew/whats-new-in-v7-5/), and [OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy/releases/tag/v7.2.0).