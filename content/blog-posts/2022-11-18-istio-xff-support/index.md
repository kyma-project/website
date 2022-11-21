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

Many applications require knowing the client IP address of the originating request to behave properly. Usual use-cases include workloads that require the client IP address to restrict its access. The ability to provide client attributes to services has long been a staple of reverse proxies. To forward these client attributes to destination workloads, proxies use the `X-Forwarded-For` (XFF) header. For more information on XFF, see the IETF’s (RFC)[https://tools.ietf.org/html/rfc7239] and [Envoy documentation](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_conn_man/headers#x-forwarded-for).

Until now Kyma Istio managed installation did not allow to configure Istio Service Mesh in a way that client attributes are forwarded to the destination workloads. For managed Kyma installations changes applied directly by the user to Istio Service Mesh configuration are being reset to the default settings by the Kyma Reconciler.

## The Solution

We want to introduce simplified and reliable way for applying changes to Kyma Istio installation by introducing Kyma Istio Custom Resource (CR). This adds another layer of configuration abstraction for the user and will allow us in the future to utilize the Kubernetes controller pattern.

Applications rely on reverse proxies to forward client IP address in a request via the XFF header. However, due to the variety of network topologies, user must set a new configuration property `numTrustedProxies` to the number of trusted proxies deployed in front of the Istio gateway proxy, so that the client address can be extracted correctly. This can be set globally for all gateway workloads in the Kyma Istio CR. Here it is an example:

```yaml
apiVersion: operator.kyma-project.io/v1alpha1
kind: Istio
metadata:
  name: istio-operator
  labels:
    app.kubernetes.io/name: istio-operator
spec:
  config:
    numTrustedProxies: 2
```

You may take a look at the [Kyma Istio CR reference documentation](https://kyma-project.io/docs/kyma/latest/05-technical-reference/00-custom-resources/oper-01-istio/) further details.

## Example

1. Configure Kyma Istio with the newly introduced `numTrustedProxies` property in the CR.

- Check if the Istio CR exists, with:

```bash
kubectl get istios
```

> **NOTE:** There must be only *one* Kyma Istio CR in the cluster.

- If the CR is not applied already, you must create it with the specified `numTrustedProxies`:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: operator.kyma-project.io/v1alpha1
kind: Istio
metadata:
  name: istio-operator
  labels:
    app.kubernetes.io/name: istio-operator
spec:
  config:
    numTrustedProxies: 2
EOF
```

2. Allow Kyma Istio Reconciler, which runs every minute to apply the changes to Istio ConfigMap. You may check if `numTrustedProxies` was applied with:

```bash
kubectl get cm -n istio-system istio --output=jsonpath={.data} | jq '.mesh'
```

3. Expose a `httpbin` workload as described in our [Expose a workload](https://kyma-project.io/docs/kyma/latest/03-tutorials/00-api-exposure/apix-03-expose-workload-apigateway/) developer tutorial.

> **NOTE:** If you want to apply to already running workloads you need to restart pods injected with Istio proxies in order for the new configuration to take effect.

4. Run the following curl command to simulate a request with proxy addresses in the XFF header:

```bash
curl -s -H 'X-Forwarded-For: 56.5.6.7,72.9.5.6,98.1.2.3' "https://httpbin.$DOMAIN_TO_EXPOSE_WORKLOADS/get?show_env=true"
{
  "args": {
    "show_env": "true"
  },
  "headers": {
    "Accept": ...,
    "Host": ...,
    "User-Agent": ...,
    "X-B3-Parentspanid": ...,
    "X-B3-Sampled": ...,
    "X-B3-Spanid": ...,
    "X-B3-Traceid": ...,
    "X-Envoy-Attempt-Count": ...,
    "X-Envoy-External-Address": "72.9.5.6",
    "X-Forwarded-Client-Cert": ...,
    "X-Forwarded-For": "56.5.6.7,72.9.5.6,98.1.2.3,10.180.0.3",
    "X-Forwarded-Host": ...,
    "X-Forwarded-Proto": ...,
    "X-Request-Id": ...
  },
  "origin": "56.5.6.7,72.9.5.6,98.1.2.3,10.180.0.3",
  "url": ...
}
```

> **NOTE:** In the above example Istio ingress gateway resolved to 10.180.0.3. This will not be the case in your environment.

The above output shows the request headers that the `httpbin` workload received. When the Istio gateway received this request, it set the `X-Envoy-External-Address` header to the second to last (`numTrustedProxies`: 2) address in the XFF header from your curl command. Additionally, the gateway appends its own IP to the XFF header before forwarding it to the `httpbin` workload.

Workload then should consider the `X-Envoy-External-Address` IP address as the client IP.

## Final words

Stay tuned for more blog posts on new features we will release with Kyma Istio and API Gateway.
