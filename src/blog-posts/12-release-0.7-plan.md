---
path: "/blog/release-0.7-plan"
date: "2019-01-17"
author: "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
title: "Kyma 0.7 Dublin scheduled for release on 11.02.2019"
---

Cairo release is out, but we do not celebrate, because we just started our journey to Dublin. This is a code name for Kyma release 0.7 which will be available on 11th February 2019. Yes, it is only 4 weeks after 0.6! We improved a lot our tooling and release process, so we can release more frequently, and we will do it every 4 weeks.

With fast progress, we do not forget about our users and we don't want to left them behind. Our goal is to make Kyma upgrades as simple as possible, so users can just grab a new version of Kyma Installer, deploy it, and after a while they can use new cool features. It is not so simple if the project is still in beta phase and a lot of changes are introduced, but we want to be ready. That's why we will establish CI/CD pipeline to verify Kyma upgradeability continuously. 

In the last release, we introduced feature toggle that enables Knative in Kyma installation. In this release, we will integrate event publishing and subscription with Knative Eventing. We also deliver the first version of Function Controller that will support Knative as a serverless engine.

With the 0.7 release, we aim to improve quality and stability by adding more end-to-end tests and pipelines that will run them on long-running clusters. So far we had stability tests running on nightly clusters, now we introduce weekly clusters to make sure we don't have issues that appear after a few days. We will also adjust Kyma deployments to work better with cluster autoscaling (e.g. apiserver-proxy deployment and resource quotas on system namespaces).

Our goal is to run Kyma on any Kubernetes cluster offered as managed service. Our default environment is Google Kubernetes Engine (GKE). In this release, we will tweak it to run smoothly on Azure Kubernetes Service (AKS). In addition, you will be able to add and configure Azure Broker in your cluster to enable easy provisioning and binding Microsoft Azure services in your applications.

Developers working with Lambdas will appreciate the possibility to test them directly from UI. You will able to provide input data and see the function return value without exposing it through API gateway.

In 0.7 release, we also introduce the first version of Asset Store - generic Kubernetes native solution that will be used to keep our documentation, images, API specifications, and client-side applications. It is an evolution of our current storage based on Minio.

As in the previous release, we will work on improvements in security. The first version of authorization in UI-API Layer (GraphQL) will be done, based on the proof of concept we did recently.

There will be also a couple of smaller improvements related to UI/UX, better UI tests, refactoring for better modularization, etc. You can find all the items planned for the 0.7 in [Zenhub](https://github.com/kyma-project/kyma/issues/1502#workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c0790ea1a6a4c6bf4b314c3).
