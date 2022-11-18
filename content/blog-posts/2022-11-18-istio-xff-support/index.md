---
title: "Support for XFF with Istio"
author:
  name: Vladimir Videlov, Istio and API Gateway @Kyma"
tags:
  - kyma
  - service-mesh
  - api-exposure

redirectFrom:
  - "/blog/istio-xff-support"
---

I'm part of the Kyma team working on the Istio and API Gateway features. As a highly requested feature, we like to introduce configuration support in Kyma Istio for forwarding external client IP address to destination workloads. In this blog post, I'm going to give you more details on how to configure it, and present examples.

## The Background

Many applications require knowing the client IP address of the originating request to behave properly. Usual use-cases include workloads that require the client IP address to restrict its access. The ability to provide client attributes to services has long been a staple of reverse proxies. To forward these client attributes to destination workloads, proxies use the X-Forwarded-For (XFF) header. For more information on XFF, see the IETF’s (RFC)[https://tools.ietf.org/html/rfc7239].

Until now Kyma Istio managed installation did not allow to configure Istio Service Mesh in a way that client attributes are forwarded to the destination workloads. For managed Kyma installations changes applied directly by the user to Istio Service Mesh configuration are reset to the default settings by the Kyma Reconciler.

## The Solution

We want to introduce simplified and reliable way for applying changes to Kyma Istio installation by introducing Kyma Istio Custom Resource (CR). This adds another layer of configuration abstraction for the user and will allow us in the future to utilize the Kubernetes controller pattern.

Applications rely on reverse proxies to forward client IP address in a request (XFF header). However, due to the variety of network topologies, user must set a new configuration property `numTrustedProxies` to the number of trusted proxies deployed in front of the Istio gateway proxy, so that the client address can be extracted correctly. This can be set globally for all gateway workloads in the Kyma Istio CR. Here it is an example:

```yaml
apiVersion: operator.kyma-project.io/v1alpha1
kind: Istio
metadata:
  name: istio
  labels:
    app.kubernetes.io/name: istio
spec:
  config:
    numTrustedProxies: 2
```

You may take a look at the [Kyma Istio CR reference documentation](https://kyma-project.io/docs/kyma/latest/05-technical-reference/00-custom-resources/oper-01-istio/).

...

## Conclusion
...

Stay tuned for my upcoming blog posts!