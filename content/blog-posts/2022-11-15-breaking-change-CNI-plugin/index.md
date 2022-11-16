---
title: "Breaking change: Istio CNI plugin"
author:
  name: "Magdalena Stręk, PO @Kyma, and Iwona Langer, Technical Writer @Kyma"
tags:
  - Kyma
  - security
  - Istio CNI plugin 
type: blog post 

redirectFrom:
  - "/blog/breaking-change-CNI-plugin"
---

With the release of Kyma 2.8, we enthusiastically announced the numerous and varied upgrades, updates, improvements, and changes it brought into use. One change, however, **the breaking change**, deserves to be presented in its own blog post so that you do not miss it. Let us properly introduce **the Istio Container Network Interface (CNI) plugin**.

>**NOTE:** For SAP BTP Kyma Runtime, the change will be implemented with version 2.10.

<!-- overview --> 

 ## The problem
Before version 2.8, Kyma Istio was installed in a default way, which meant that workloads being part of the Service Mesh were injected with the `istio-init` container. The `istio-init` container was responsible for setting up the networking functionality for the Istio sidecar proxy. Unfortunately, setting up the networking functionality required elevated Kubernetes RBAC permissions for the workloads owner.

## The solution
Enabling the Istio CNI plugin allows Kyma users to skip the requirement for elevated permissions. This, being an obvious security improvement, also has its consequences. Workloads relying on network in `initContainers` face connectivity errors.  

> **CAUTION** To prepare for **the breaking change** workloads configuration, you must apply the following changes **before** upgrading to Kyma 2.8.

To eliminate the risk of having networking errors, you must configure workloads with one of the following settings:
- Set the UID of the `initContainer` to `1337` using `runAsUser`. `1337` is the UID used by the sidecar proxy. The traffic sent by this UID is not captured by the Istio’s iptables rule. Application container traffic is still captured as usual.
- Set the `traffic.sidecar.istio.io/excludeOutboundIPRanges` annotation to `disable`. It disables redirecting traffic to any CIDRs the `initContainers` communicate with.
- Set the `traffic.sidecar.istio.io/excludeOutboundPorts` annotation to `disable`. It disables redirecting traffic to the specific outbound ports the `initContainers` use.

> **NOTE** In case of SAP BTP Kyma Runtime, you must apply the described changes **before** upgrading to version 2.10.
 
For more information on installing the Istio CNI plugin, read the [original documentation](https://istio.io/latest/docs/setup/additional-setup/cni/).
