---
title: "Kyma 2.10"
author:
  name: "Wojciech Sołtys, RM @Kyma, and Iwona Langer, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.10.0"
redirectFrom:
  - "/blog/release-notes-210"
---

The holiday season gave us a welcome break and an excellent opportunity to recharge our batteries. With this energy boost, we’ve set off into the new year, wishing you the best of luck and offering you the best of Kyma in its latest version, 2.10! Read on to find out what we have prepared for you.

<!-- overview -->

See the overview of all changes in this release:

- [Application Connectivity](#application-connectivity) – replacing `kyma-integration` Namespace with `kyma-system` Namespace
- [Eventing](#eventing) – NATS server updated to version 2.9.9
- [Observability](#observability) – Monitoring deprecation
- [Telemetry](#telemetry) – logs improvements, configurable tracing
- [Serverless](#serverless) – previous Jaeger endpoint no longer supported 
- [Service Mesh](#service-mesh) – Istio upgrade, Istio sidecar annotation deprecated, support for XFF header

## Application Connectivity
From now Application Gateway will use the `kyma-system` Namespace instead of the `kyma-integration` Namespace. The Secrets related to the Namespace are not removed automatically in the process of upgrading Kyma to version 2.10. To remove them, you must run the [migration script](https://github.com/kyma-project/kyma/blob/release-2.10/docs/assets/2.9-2.10-OS-copy-secrets-to-system-namespace.sh) after successfully migrating from Kyma 2.9 to Kyma 2.10. 

## Eventing

### NATS
We introduced a `system account` user to allow full leverage of the NATS CLI. For more information, read about [Acquiring NATS server system account credentials](https://github.com/kyma-project/kyma/blob/release-2.10/docs/04-operation-guides/operations/evnt-03-nats-server-system-events.md). 

### Metrics 
We exposed new metrics for backend latency.
We also introduced consistent naming for all metrics exposed by Eventing Publisher Proxy (EPP). 
Read [Kyma Eventing Metrics](https://github.com/kyma-project/kyma/blob/release-2.10/docs/04-operation-guides/operations/evnt-02-eventing-metrics.md) for more details.

## Observability
 
### Kiali
As announced in the blog post on [Kiali deprecation](https://kyma-project.io/blog/2022/10/10/Kiali-deprecation), Kiali was deprecated with Kyma 2.8 and will be removed in Kyma 2.11.

### Deprecation of Monitoring  
We decided to deprecate the monitoring component based on Prometheus/Grafana. Please start the transition to alternative solutions now. The actual removal will happen in half a year or later, with Kyma 2.16 at the earliest. For more information, read [this blog post](https://kyma-project.io/blog/2022/12/9/monitoring-deprecation/).
 
### Monitoring
Kyma 2.10 brings the update to the latest Prometheus images (version 2.40.7).
 
## Telemetry
 
### Logs
With this version of Kyma, we offer solutions to the following issues:
- Improved implementation so that [unnecessary restarts of Fluent Bit DaemonSet are avoided on the LogPipeline changes](https://github.com/kyma-project/kyma/issues/15956)
- Improved [certificate handling of LogPipeline and LogParser webhook](https://github.com/kyma-project/kyma/issues/15765) so that there are no webhook downtimes caused by improper certificates 
- [Dashboard support](https://github.com/kyma-project/kyma/issues/15894) for defining LogPipelines and LogParser 
 
### Traces
The first version of the new [configurable tracing](https://github.com/kyma-project/kyma/blob/release-2.10/docs/01-overview/main-areas/telemetry/telemetry-03-traces.md) feature is available. Under the umbrella of the telemetry module, a new CRD TracePipeline is available as well. That new API will manage an OpenTelemetry Collector which supports you in integrating the trace aspects within a runtime into OTLP-based backends. For now, Basic Authentication is supported, and further ways of authentication will be added soon.
The Serverless and tracing modules were adjusted to the new approach.
Also, Istio got switched to the new approach. Thus, the trace propagation protocol was changed to the W3C Trace Context. Furthermore, the new Istio Telemetry API got activated to configure tracing settings selectively.
 
 
## Serverless

With Kyma 2.10, we stop supporting the configuration of the previous Jaeger endpoint (at port `14268`) as an option for Serverless Functions to send trace data. This endpoint was deprecated with Kyma 2.8 and replaced with one (at port `4318`) that is compliant with Open Telemetry Protocol (OTLP). Functions don’t receive the previous endpoint as a configuration variable. Thus, if not rebuilt, they cannot send proper trace data. Functions built before Kyma 2.8 need to be rebuilt so that their trace data can be properly collected at the new OTLP endpoint introduced with the 2.8 release.


## Service Mesh

### Istio upgraded to 1.16.1  

With this release, we upgraded Istio from 1.15.3 to 1.16.1. For more details on the changes, read the official [Istio 1.16 Upgrade Notes](https://istio.io/latest/news/releases/1.16.x/announcing-1.16/upgrade-notes/).

### Istio sidecar injection annotation deprecated  

As of version 1.16 of Istio, the `sidecar.istio.io/inject` annotation was deprecated in favor of the `sidecar.istio.io/inject` label. To learn how to configure your Pods so that the Istio sidecar injection remains fully supported, read [this blog post]( https://kyma-project.io/blog/2022/12/30/deprecation-of-istio-sidecar-injection-annotation).


### Support for XFF header  

With this version of Kyma, we introduced [Istio custom resource (CR)](https://kyma-project.io/docs/kyma/main/05-technical-reference/00-custom-resources/oper-01-istio/) supporting the configuration of `numTrustedProxies`. Read about the [Support for XFF with Istio](https://github.com/kyma-project/website/blob/main/content/blog-posts/2023-01-11-istio-xff-support/index.md) to learn how to configure Istio CR and secure your workload on a forwarded client IP.
