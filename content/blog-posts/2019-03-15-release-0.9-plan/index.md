---
title: "Kyma 0.9 Florence scheduled for release on 08.04.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-09-plan"
---

Next destination? Florence! Time to pack our bags and prepare to leave Edmonton and fly all the way to Tuscany for the next Kyma release - **0.9 Florence**. What's in store for this Italian-themed release?

<!-- overview -->

First of all - Knative. We know, it doesn't really sound Italian, but it's really important for Kyma. Starting with this release, the eventing mechanism is going to be based on Knative by default. Kyma will still ship with NATS, but switching to Knative opens a world of new possibilities and will allow us to support other messaging systems, such as Google PubSub, in the future. 

We're constantly improving monitoring in Kyma, and this release we focus on adding support for configurable monitoring and alerting for all Kyma components. We're updating Grafana and Prometheus to their latest versions and our new logging solution, Loki, will be exposed in Grafana and easily accessible through the Console UI. 

Istio 1.1 release candidate is now available which allows us to start implementing several crucial improvements and simplify our network setup. First of all, we will be able to retire the Nginx Ingress Controller from serving our Application Connectivity endpoints. The new version of Istio will also allow to have a single LoadBalancer IP for all components, and most importantly a much simpler configuration for deployments that use our dynamic DNS solution (xip.io) - you will be able to provision a cluster without providing any additional parameters such as domain names, certificates, IP addresses, and other. 

Italy is known for its love for art and beauty. The 0.9 release doesn't ignore that and improves on the current UI, Michelangelo style: 
  - All UI views will be optimized for mobile devices. 
  - Modal micro-frontends will enable better component reusability. 
  - For rendering documentation, the Console UI will start using the Headless CMS component that is based on Asset Store - a proprietary, Kubernetes-native solution for content storage, serving markdown documentation and API specifications like AsyncAPI, OpenAPI, and OData. 

Similarly to previous releases, we're working hard on increasing the overall security of Kyma. Under the Italian sun we will focus on these topics:
  - Enabling Mutual TLS by default 
  - Making Tiller accessible only with the client certificate from certain components, such as the Installer or brokers
  - Making Helm Broker enforce TLS for external Bundles Repositories
  - Enabling client authentication for communication between NATS Streaming and Knative NATS CCP
  - Enabling client certificate rotation and revocation in the Application Connector

With the introduction of the **kyma-developer** role in the last release, we started working on new documentation describing default roles in Kyma and how to use them to secure access to Kubernetes resources for administrators and developers. Don't worry - even though we're visiting Italy this time around, we're going to write our documentation in English. 

Last, but not least, we plan to work more on the quality and stability of backup, recovery and upgrade processes. We developed a test framework that automates checking the state of Kyma components after an upgrade or disaster recovery. In this release, we want to add more use cases that will be verified by such tests.

You can find all the items planned for the 0.9 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5c5aae9ddcf5235c1876a4f2).

Kyma 0.9 Florence is scheduled for release on 08.04.2019. Keep an eye out for more Kyma news and updates on our blog. See you around! Ciao tutti!
