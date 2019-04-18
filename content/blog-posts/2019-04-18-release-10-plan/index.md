---
title: "New Kyma Releases: 1.0 Gliwice and 1.1 Helsinki are coming!"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-10-plan"
---

Big news! Finally, our release journey reached the 1.0 milestone with the destination name Gliwice. Most of you probably now ask the questions like: Why Gliwice? Where it is? Gliwice is a city in Poland with SAP Labs office where most of Kyma developers are located. Now when you know the naming background lets dive in the details of our first production release.
 <!-- overview -->

The 1.0 release is all about security and stability. 
We invested a lot in securing all the communication inside the Kyma cluster and finally we will be able to turn on mutual TLS. This is something we already promised in the previous release, but we encountered more problems than originally estimated. The second big feature that was postponed to 1.0 release is integration with Grafana Loki. We didn't make it before because of some incompatible changes in log directories introduced in Kubernetes 1.14 but already applied in Google Kubernetes Engine (more details in [this issue](https://github.com/grafana/loki/issues/393)). And that's all about 1.0 highlights you can see on the surface. But there is still a lot of groundwork for our team to fix already known bugs and issues discovered during extensive testing. Good news is, that our first production-ready version of Kyma will be released next week (about 25.04) and first [release candidate](https://github.com/kyma-project/kyma/releases/tag/1.0.0-rc1) is already out!

Kyma is a dynamic project and we don't want to slow down after reaching production release. Just opposite! We already started preparation for release 1.1 Helsinki and you will get much new stuff there:

- Addon Catalog - we will enable and promote the way how you can share your addons by combining concepts of service catalog bundles with helm charts. Addon can contain services, lambdas, and other Kubernetes objects with documentation and provisioning UI.
- AWS Broker - self-explanatory feature. We already have brokers for GCP and Azure services in Kyma. AWS will make our service consumption offering more complete.
- Asset Store configuration to utilize Google Cloud Storage.
- Kiali integration - the visualization tool for Istio service mesh (alpha version - will require feature toggle enabled).
- Octopus - our new testing tool will replace helm tests. Retries and parallel execution for tests will speed up Kyma development.
- Performance tests infrastructure - we will track how code changes influence throughput and latency of key components and we will tweak Kyma cluster configuration to give you settings suitable for the production environment.

You can find all the items planned for the 1.1 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5c5aae9ddcf5235c1876a4f2).

Kyma 1.1 Helsinki is scheduled for release on 13.05.2019. Keep an eye out for more Kyma news and updates on our blog. See you around! 
