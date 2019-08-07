---
title: "New Kyma Releases: 1.0 Gliwice and 1.1 Helsinki are coming!"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-10-plan"
---

Extra! Extra! Read all about it! With the 1.0 Gliwice release, we have successfully reached our first big release milestone in Kyma. We realize that some of you might be confused and ask "Why Gliwice?" or "Where even is that place?" A quick [Wikipedia search](https://en.wikipedia.org/wiki/Gliwice) reveals that Gliwice is a Polish city situated in the southern part of the country, in the Upper Silesia. Founded in the 13th century, it has a rich history, a beautiful old town, and a river running right through its heart. From the software point of view, Gliwice is the home of the SAP Labs office which has most of the developers working on Kyma. Now that the naming conundrum is solved, let's dive into the details of our first production release.

<!-- overview -->

The 1.0 release is all about security and stability. We invested a lot of time and energy in securing all communication in the Kyma cluster and finally we are able to turn on mutual TLS by default. This is something we promised to deliver in the previous release, but in the course of implementation we encountered more problems than we anticipated. Another important feature that we had to postpone and we're releasing with the 1.0 release is the integration with Grafana Loki. We didn't manage to implement it earlier because of several incompatible changes in log directories introduced in Kubernetes 1.14 but already applied in the Google Kubernetes Engine. See [this issue](https://github.com/grafana/loki/issues/393) for more details. These are the highlights of the Gliwice release. 

Our first production-ready version of Kyma will be released next week, around 25.04 and the first [release candidate](https://github.com/kyma-project/kyma/releases/tag/1.0.0-rc1) is already out!

Kyma is a dynamic project and we don't want to slow down after giving you a proper production release. Just the opposite! We already started preparation for the next release. Have a look at the new and exciting stuff that's going to come in 1.1 Helsinki:

- Addon Catalog - we will enable and promote a new way to share addons by combining the concepts of Service Catalog bundles with Helm charts. Add-ons can contain services, lambdas, and other Kubernetes objects along with the documentation and provisioning UI.
- AWS Broker - We already have brokers for GCP and Azure services in Kyma. Adding AWS to the roster will make our service consumption offering more complete.
- Asset Store configuration will utilize Google Cloud Storage.
- Kiali integration - we will add the alpha version of this visualization tool for the Istio Service Mesh - it will require enabling a feature toggle.
- Octopus - our new testing tool will replace Helm tests. Retries and parallel execution for tests will speed up Kyma development.
- Performance tests infrastructure - we will track how code changes influence the throughput and latency of key components and we will tweak Kyma cluster configuration to give you settings suitable for the production environment.

You can find all the items planned for the 1.1 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5c5aae9ddcf5235c1876a4f2).

Kyma 1.1 Helsinki is scheduled for release on 13.05.2019, and 1.0 Gliwice is going to be available very soon. Keep an eye out for more Kyma news and updates on our blog. See you around! 
