---
title: "Deprecation of the Istio sidecar injection annotation"
author:
  name: 
tags:
  - Kyma
  - Service Mesh

redirectFrom:
  - "/blog/deprecation-of-sidecar-injection-annotation"
---
Every new release brings some updates and fixes to which we need to adjust our workloads. With Istio 1.16 the `sidecar.istio.io/inject` annotation was deprecated in favor of the `sidecar.istio.io/inject` label. Read on to find out how to configure your Pods so that the Istio sidecar injection remains fully supported.

## Overview
To enable injecting the Istio sidecar proxy into a Pod, you can label the entire Namespace the Pod belongs to or the Pod itself. For more information about the Istio sidecar proxy injection, read the [Istio documentation](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/) and visit [this blog post](https://kyma-project.io/docs/kyma/main/04-operation-guides/operations/smsh-01-istio-enable-sidecar-injection/).

So far, you could modify a workload's configuration using either the `sidecar.istio.io/inject` annotation or the `sidecar.istio.io/inject` label. With the 1.16 release of Istio, **the annotation was deprecated** in favor of the label. Therefore, you must verify which of your Pods have the Istio sidecar injection annotation set and replace each of these annotations with the `sidecar.istio.io/inject` label. **Istio will get upgraded to version 1.16 with the release of Kyma 2.10**, but you can already start the necessary preparations. 

## Verify which Pods use the Istio sidecar injection annotation

To see which Pods in your Namespace have the `sidecar.istio.io/inject` annotation set, run one of the following commands:

<div tabs name="kubectl-and-istioctl-commands">
  <details open>
    <summary label="kubectl">
    kubectl
    </summary>

    ```bash
    kubectl get po -o=jsonpath='{.items[?(@.metadata.annotations.sidecar\.istio\.io/inject)].metadata.name}' -n {NAMESPACE}
    ```
    
  </details>
  <details>
    <summary label="istioctl">
    istioctl
    </summary>

    ```bash
    istioctl analyze -n {NAMESPACE}
    ```

  </details>
</div>

Here's an example of a Pod with the `sidecar.istio.io/inject` annotation set to `true`:
```
apiVersion: v1
kind: Pod
metadata:
  name: example-workload
  namespace: test-namespace
  annotations:
    sidecar.istio.io/inject: "true"
spec:
  containers:
  - name: istio-proxy
    image: eu.gcr.io/kyma-project/external/istio/proxyv2:1.16.1-distroless
    ...
  - image: docker.io/kennethreitz/httpbin
    name: example-workload
  ...
```

## Change the Istio sidecar injection annotations to labels

Replace the Istio sidecar injection annotation with the label on each Pod listed as a result of executing the previous command. To do so, remove the `sidecar.istio.io/inject: "true"` annotation from a Pod's template, and add the `sidecar.istio.io/inject: "true"` label. After the changes, a Pod should look like this:

```
apiVersion: v1
kind: Pod
metadata:
  name: example-workload
  namespace: test-namespace
  labels:
    sidecar.istio.io/inject: "true"
spec:
  containers:
  - name: istio-proxy
    image: eu.gcr.io/kyma-project/external/istio/proxyv2:1.16.1-distroless
    ...
  - image: docker.io/kennethreitz/httpbin
    name: example-workload
  ...
```

## Final remarks
 Read [this blog post](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/service-mesh/smsh-03-istio-sidecars-in-kyma) to discover the benefits that the Istio sidecar proxy brings. In [the blog](https://kyma-project.io/blog/) on the Kyma website, you can find all the essential news and tutorials related to Kyma Istio.