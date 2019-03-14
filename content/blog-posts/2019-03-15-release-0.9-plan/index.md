---
title: "Kyma 0.9 Florence scheduled for release on 08.04.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-09-plan"
---
We have just published release notes for 0.8 and it is time to reveal some news what you can expect in our spring release named Florence. 

 <!-- overview -->

First of all the default eventing in Kyma will be based on KNative. We still will ship Kyma with NATS, but it will open the possibility to support other messaging systems like Google PubSub in the future.

You can expect also several improvements in the monitoring area. We will work on a configurable monitoring and alerting support for Kyma components. Additionally, you will get the latest versions of Grafana and  Prometheus. And our new logging solution - Loki will be exposed nicely in the Console UI and Grafana dashboards.

We were waiting for the new features coming with Istio 1.1 and now when the release candidate is already available we can start the integration process. New Istio version will allow us to get rid of Nginx Ingress Controller serving application connectivity endpoints and simplify our network setup. We can have only one external IP and LoadBalancer for all Kyma components, and much simpler configuration with dynamic DNS (xip.io) - you can provision Kyma cluster without providing any additional parameters (like domain name, certificates, IPs, etc).

There are planned also improvements and refactoring in our UI. 
- Views will be optimized for mobile devices. 
- Modal micro-frontends will enable better component reusability. 
- We will switch to the AssetStore, our own Kubernetes-native solution for content storage, for serving markdown documentation and API specifications like AsyncAPI, OpenAPI, and OData. 

As in previous releases, we will invest in the security area:
- Mutual TLS will be enabled by default 
- Tiller will be accessible only with the client certificate from selected components (installer, brokers).
- Helm Broker will enforce TLS for external Bundles Repositories
- Client authentication will be enabled between NATS Streaming and Knative NATS CCP. 
- Client certificate rotation and revocation for will be enabled in Application Connector.

We will also document Kyma default roles and how to use them to secure access to kubernetes resources for administrators and developers.

Last, but not least we plan to invest more in quality and stability of backup, recovery and upgrade processes. We developed a test framework that automates checking the state of Kyma components after an upgrade or disaster recovery. In this release, we want to add more use cases that will be verified in such tests.

You can find all the items planned for the 0.9 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5c5aae9ddcf5235c1876a4f2).

Come back and check out Kyma 0.9 Florence when it's released on 08.04.2019 and keep an eye out for more Kyma cool news and updates on our blog.
