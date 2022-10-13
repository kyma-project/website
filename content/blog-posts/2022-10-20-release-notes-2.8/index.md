---
title: "---
title: "Kyma 2.8"
author:
  name: "Zhoujing Wang, RM @Kyma, and Maja Szostok, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.8.0"
redirectFrom:
  - "/blog/release-notes-28"
---

## Observability 

 

### Jaeger 

 

As preparation for the bigger changes planned in the tracing area (see https://github.com/kyma-project/community/tree/main/concepts/observability-strategy/configurable-tracing) we updated the Jaeger stack to the latest version 1.37 and enabled OTLP support. At the same time the serverless engine switched to OTLP as well and is ready for the awesome future 

 

### Monitoring 

 

Update to node-exporter 1.4.0 

 

### Logging 

 

Update to Fluent Bit 1.9.9 

 

Improved secret rotation support for LogPipelines. A rotated secret will be detected instantly now. 

 

Reminder: with https://kyma-project.io/blog/2022/8/25/release-notes-26/ the fluent-bit part of the logging component got replaced by the new telemetry component. It will be removed with next kyma release. If you have not adopted to the change yet, please do so now. 

 

### Deprecation of Kiali 

 

The Kyma Observabaility feature got a shift into the direction of integration and openness, to enable enterprise-grade qualities based on external services, see https://kyma-project.io/blog/2022/9/21/observability-strategy for more details. As part of that, a tutorial got introduced on how to integrate Kiali on your own (see this links) with the consequence of getting the Kiali component removed with kyma 2.10.  

 

## API Gateway 
 
This Kyma release comes with an update to APIRule featuring exposing and securing services in multiple namespaces. Now it’s possible to specify service namespace on the `spec.service` level or individually for each service in `spec.rules`. This new field is optional, if you do not specify it the default APIRule Namespace is used. Read more about APIRule CR [here](https://kyma-project.io/docs/kyma/latest/05-technical-reference/00-custom-resources/apix-01-apirule). There is also a new tutorial on how to use it [here](https://kyma-project.io/docs/kyma/latest/03-tutorials/00-api-exposure/apix-09-expose-workloads-multiple-namespaces/) 
 
## Security  

 

### Istio upgraded to 1.15.0 
 

In this Kyma release Istio was upgraded to 1.15.0 version. For more details on the changes, read the official [Istio 1.15.0 release notes](https://istio.io/latest/news/releases/1.15.x/announcing-1.15.0/). 

 

### Istio CNI plugin 

 

This Kyma version introduces Istio CNI plugin, which replaces Istio `istio-init` container elevated Kubernetes RBAC permission. To learn more read about [Istio CNI plugin.](https://istio.io/latest/docs/setup/additional-setup/cni/) 

 

 

## Application Connectivity 

 

### Response rewriting in Application Gateway  

 

From this release, Application Gateway in Kyma supports redirects for the HTTP requests in which the URL host remains unchanged.  

The functionality makes the HTTP clients that originally called Application Gateway follow redirects through the Gateway, passing authorization, custom headers, URL parameters, and the body without an issue. 

For more details, see [Application Gateway details](https://kyma-project.io/docs/kyma/main/05-technical-reference/ac-01-application-gateway-details/).  

 

### Status codes returned by Application Gateway  

 
This release of Kyma brings changes that include HTTP status codes returned by Application Gateway. This has been implemented in cases: when the application specified in the path does not exist, the application, service or entry is not passed in the path, or when call to target API timeouts.  
 
For more information on what status codes are currently used, see the [documentation](https://github.com/kyma-project/kyma/blob/main/components/central-application-gateway/README.md)  

 

## Serverless 
 
Nothing here. OPTL changes mentioned already in the Observalibility section. 
Verification of advanced templating fetures is still pending and will most like be shifted to 2.9 


## Eventing 

The Eventing stack has been upgraded to NATS 2.9.0. 
