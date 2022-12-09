---
title: "Support for XFF with Istio"
author:
  name: Vladimir Videlov, Istio and API Gateway @Kyma
tags:
  - kyma
  - service-mesh
  - api-exposure

redirectFrom:
  - "/blog/istio-xff-support"
---

I'm part of the Kyma team working on Istio and API Gateway features. In this blog post, we would like to introduce the highly requested configuration support in Kyma Istio for forwarding an external client IP address to destination workloads. Read on to learn more about this improvement and see how to configure it.

## Background

Many applications need to know the client IP address of an originating request to behave properly. Usual use-cases include workloads that require the client IP address to restrict their access. The ability to provide client attributes to services has long been a staple of reverse proxies. To forward client attributes to destination workloads, proxies use the `X-Forwarded-For` (XFF) header. For more information on XFF, see the [IETF’s RFC documentation](https://tools.ietf.org/html/rfc7239) and [Envoy documentation](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_conn_man/headers#x-forwarded-for).

Until now, the managed Kyma Istio installation did not allow configuring Istio Service Mesh in such a way that client attributes could be forwarded to destination workloads. For the managed Kyma installation, changes applied to the Istio Service Mesh configuration directly by the user were reset to default settings by Kyma Reconciler.

## Solution

In order to provide a simplified and reliable way of applying changes to the Istio Service Mesh, we introduced the Kyma Istio Custom Resource (CR). This improvement adds another layer of configuration abstraction for the user and will enable us to utilize the Kubernetes controller pattern in the future.

Applications rely on reverse proxies to forward the client IP address in a request via the XFF header. However, due to the variety of network topologies, the user must specify a new configuration property `numTrustedProxies` to the number of trusted proxies deployed in front of the Istio gateway proxy, so that the client address can be extracted correctly. The configuration can be set globally for all of the gateway workloads in Kyma Istio CR. Here's an example:

```yaml
apiVersion: operator.kyma-project.io/v1alpha1
kind: Istio
metadata:
  name: istio-operator
  namespace: kyma-system
  labels:
    app.kubernetes.io/name: istio-operator
spec:
  config:
    numTrustedProxies: 2
```

Take a look at the [Kyma Istio CR reference documentation](https://kyma-project.io/docs/kyma/main/05-technical-reference/00-custom-resources/oper-01-istio/) for further details.

## Example

1. Configure Kyma Istio with the newly introduced `numTrustedProxies` property in the CR.

- To check if the Istio CR already exists, run:

```bash
kubectl get istios -n kyma-system
```

> **NOTE:** There must be only **one** Kyma Istio CR in a cluster.

- If the CR does not already exist, create it with the specified `numTrustedProxies` value:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: operator.kyma-project.io/v1alpha1
kind: Istio
metadata:
  name: istio-operator
  namespace: kyma-system
  labels:
    app.kubernetes.io/name: istio-operator
spec:
  config:
    numTrustedProxies: 1
EOF
```

- Otherwise, adapt the value of the `numTrustedProxies`. Run:

```bash
kubectl patch istios/istio-operator -n kyma-system --type merge -p '{"spec":{"config":{"numTrustedProxies": 1}}}'
```

2. Allow Kyma Istio Reconciler to apply the changes to Istio ConfigMap. To trigger it without waiting, run:

```bash
kyma deploy --components istio
```

To check if `numTrustedProxies` was successfully applied within Istio ConfigMap, run:

```bash
kubectl get configmap -n istio-system istio --output=jsonpath={.data} | jq '.mesh'
```

3. Expose and secure the `httpbin` workload as described in the [Expose and secure a workload with Istio developer tutorial](https://kyma-project.io/docs/kyma/latest/03-tutorials/00-api-exposure/apix-07-expose-and-secure-workload-istio/).


4. Run the following curl command to simulate a request with proxy addresses in the XFF header:

```bash
curl -s -H "Authorization:Bearer $ACCESS_TOKEN" -H "X-Forwarded-For: 98.1.2.3" "https://httpbin.$DOMAIN_TO_EXPOSE_WORKLOADS/get?show_env=true"
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
    "X-Envoy-External-Address": "98.1.2.3",
    "X-Forwarded-Client-Cert": ...,
    "X-Forwarded-For": "98.1.2.3,10.180.0.3",
    "X-Forwarded-Host": ...,
    "X-Forwarded-Proto": ...,
    "X-Request-Id": ...
  },
  "origin": "98.1.2.3,10.180.0.3",
  "url": ...
}
```

> **NOTE:** In the above example Istio Ingress Gateway resolved to 10.180.0.3. This will not be the case in your environment.

The above output shows the request headers that the `httpbin` workload received.
When the Istio gateway receives a request, it sets the `X-Envoy-External-Address` header to the last address in the XFF header from the request. Please note that the gateway appends its own IP address to the XFF header.

The workload then should consider the `X-Envoy-External-Address` IP address as the client IP.

5. You can also apply the `AuthorizationPolicy` for the Istio gateway to secure workload access by the IP address. To do so, run:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: ingress-policy
  namespace: istio-system
spec:
  selector:
    matchLabels:
      app: istio-ingressgateway
  action: ALLOW
  rules:
  - from:
    - source:
       remoteIpBlocks: ["1.2.3.0/24","98.1.2.3"]
EOF
```

> **NOTE:** In the above example client IP resolved to 98.1.2.3. This will not be the case in your environment.

## Final remarks

Stay tuned for more blog posts on new Kyma Istio and API Gateway features.
