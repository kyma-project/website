---
title: "Kyma 1.0 Gliwice"
author:
  name: "Barbara Szwarc, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.0.0"
redirectFrom:
  - "/blog/release-notes-10"
---

The 1.0 release may not be abundant in new features, but it surely adds value to your everyday Kyma experience. We have put a lot of effort in securing all the communication inside the Kyma cluster to make Kyma even more stable and secure. These improvements, along with the resolved issues, will make the development even smoother and more enjoyable.

<!-- overview -->

See the overview of all changes in this release:

- [Logging](#logging) - Logging solution based on Loki
- [Service Mesh](#service-mesh) - Mutual TLS enabled by default 

## Logging

### Loki bundled and enabled 

[Loki](https://github.com/grafana/loki), a lightweight Prometheus-like log management system, is now the central logging solution. It is fully integrated with the Kyma Console and the bundled Grafana. 
 
## Service Mesh

### Mutual TLS enabled by default

Starting from this release, all communication between services is handled by Istio using mutual TLS, which greatly increases the security of implementations built on Kyma. As this feature is connected to the automatic sidecar injection, developers do not need to apply any additional configuration to enable mTLS. Note that you can easily disable mTLS on the Namespace or Service level. 