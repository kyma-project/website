---
title: "Kyma 2.11"
author:
  name: "Zhoujing Wang, RM @Kyma, and Natalia Sitko, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.11"
redirectFrom:
  - "/blog/release-notes-211"
---

With love for cloud-native technologies in our hearts and lots of cool ideas in our minds, we've got through the middle of this snowy and cloudy winter season. Now that we have reached the 2.11 milestone, we can share what we accomplished during this part of the journey. Version 2.11 of Kyma comes with a few exciting improvements, such as FluentBit Deamon Set fully managed by the operator, Istio and FLuentBit upgrades, the new finalizer for APIRule CR, and that is by no means all. Read on to find out the rest of the news.

<!-- overview -->

See the overview of all changes in this release:

- [Application Connectivity](#application-connectivity) - **encodeUrl** parameter
- [Observability](#observability) – Kiali removed, Jaeger deprecated
- [Telemetry](#telemetry) – FluentBit upgraded to version 2.0.8, FluentBit Deamon Set fully managed by the operator, system traces filtering, TracePipelines extension
- [API Gateway](#api-gateway) – improved status handling and CPU reconciling, new finalizer for APIRule CR, APIRule CR conversion bug fixed
- [Security](#security) – Istio upgraded to version 1.16.2, PodPreset functionality removed
- [Eventing](#eventing) – NATS image updated to version 2.9.11

## Application Connectivity 
With Kyma 2.11, we introduced the **encodeUrl** parameter, which allows you to control whether Application Gateway encodes URL characters. Set the parameter to `false` so that the URL path remains unchanged or to `true` to enable the encoding. For example, if the **encodeUrl** is set to `true`, the `/app/api/sample(1%2C2%2C3)%2FescapingURL` path changes to `/app/api/sample%281%2C2%2C3%29/escaping`. When it is set to `false`, the `/app/api/sample(1%2C2%2C3)%2Fescaping` path stays intact. 

## Observability

### Kiali 
Kiali was deprecated with Kyma 2.8 and removed with Kyma 2.11. If you want to continue using Kiali, follow the steps in the [Kiali example](https://github.com/kyma-project/examples/tree/main/kiali) to deploy your custom Kilai. 

### Tracing 
The tracing component was deprecated and will be removed with Kyma 2.14. If you want to continue using Jaeger, follow the steps in the [Jaeger example](https://github.com/kyma-project/examples/tree/main/jaeger) to deploy your custom Jaeger. 
 
## Telemetry

### Logging 
To be able to run the telemetry module as a fully self-contained solution with all the resources managed by the module operator, we have introduced a series of changes and improvements. With Kyma 2.11, we completed this process and released FluentBit Daemon Set [fully managed by the operator](https://github.com/kyma-project/kyma/issues/16570). From now, the FluentBit installation is responsible for serving LogPipeline resources and can be provisioned on-demand only if the user requests a LogPipeline. The FluentBit settings are managed by the module operator and can no longer be influenced directly using the module helm values. 

The FluentBit Daemon Set [got upgraded to the new major version 2](https://github.com/kyma-project/kyma/issues/15932). Besides the performance improvements, the 2.0.8 version introduces OTLP support and enables the Kyma team to start working on the official [OTLP support for LogPipelines](https://github.com/kyma-project/kyma/issues/16307).

We fixed a bug so that the [log files are always read from the beginning](https://github.com/kyma-project/kyma/issues/16645) when starting a FluentBit instance on a newly provisioned node.

### Traces 

System traces emitted by Istio, for example, while communicating with the trace-collector, are now [filtered out by default](https://github.com/kyma-project/kyma/issues/16514). We also added the [extension for TracePipelines](https://github.com/kyma-project/kyma/issues/16393)to Kyma Dashboard and fixed a [bug](https://github.com/kyma-project/kyma/issues/16531) that caused the TracePipeline status not to reflect the status of the managed trace-collector properly. With version 2.11 of Kyma, we introduced support for [custom headers on the OTLP output](https://github.com/kyma-project/kyma/issues/16554) that enables integrations to providers with native OTLP support, such as [Dynatrace](https://www.dynatrace.com/support/help/extend-dynatrace/opentelemetry#tabgroup--opentelemetry--instrument-without-oneagent). 
 
 
## API Gateway

With this version of API Gateway, we improved the status handling, added the finalizer for APIRule CR, fixed the bug related to APIRule CR conversion, and resolved the reconciling CPU issue for Azure.

## Security
 
### Service Mesh 
With Kyma 2.11, we upgraded Istio 1.16.1 to version 1.16.2. Read the official [Istio 1.16.2 release notes](https://istio.io/latest/news/releases/1.16.x/announcing-1.16/upgrade-notes/) to learn about the changes introduced with the new Istio release.

### Pod Preset 
We finally removed the PodPreset functionality that was deprecated with Kyma 2.4. For more information, read the [deprecation note](https://kyma-project.io/blog/2022/6/30/release-notes-24/#pod-preset-deprecation-note).

## Eventing

### NATS server 
The NATS-Server image was updated to version 2.9.11. For more details, take a look at the [NATS-Server release notes](https://github.com/nats-io/nats-server/releases/tag/v2.9.11).