---
title: "Kyma 2.11.3"
author:
  name: "Tim Riffer, Istio and API Gateway @Kyma, and Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.11.3"
redirectFrom:
  - "/blog/release-notes-211"
---

As you can see, we're constantly striving to improve user experience. Here we are with Kyma 2.11.3 and the upgrades you will find useful.

<!-- overview -->

## Istio Ingress Gateway HorizontalPodAutoscaler (HPA) supporting `autoscaling/v2`

The default values for the Istio Ingress Gateway HPA configuration have been adapted to support `autoscaling/v2` as part of removing `autoscaling/v2beta1` for Kubernetes v1.25.  
