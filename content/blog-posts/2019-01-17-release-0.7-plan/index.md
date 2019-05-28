---
title: "Kyma 0.7 Dublin scheduled for release on 11.02.2019"
author:
  name: "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-07-plan"
---

We might have just reached Cairo, but it's not time to celebrate yet. We embark on our ships and ride the wave straight to our next destination - Dublin! The capital of Ireland was chosen to be the codename for the upcoming Kyma 0.7 release which is scheduled to launch on 11th February 2019. Only 4 weeks after the 0.6 release! We're pretty excited and proud about how we improved our tooling and release process, which allows us to release more frequently. Thanks to these improvements, starting with the Dublin release, we will release a new version of Kyma every 4 weeks.

What can you expect at the end of the rainbow? 

<!-- overview -->

Although we're making progress fast, we don't forget about our users. We don't leave anyone behind and we aim to make updating Kyma as simple as possible. We want all users to simply grab a new version of the Kyma installer, deploy it, upgrade their deployment to the newest version, and start exploring new features in no time. This might sound really simple, but brings a lot of challenges for our project which is still in the beta phase and changes constantly. Despite the challenges, we're getting ready to implement the easy upgrade flow in the near future. As a part of these preparations, the 0.7 release will bring a new CI/CD pipeline to verify Kyma upgradeability continuously.

The 0.6 release introduced a feature toggle that enables Knative in Kyma installation. In the Dublin release, we will integrate event publishing and subscriptions with Knative Eventing. We will also deliver the first version of the Function Controller that supports Knative as the serverless engine.

With the 0.7 release, we aim to improve quality and stability by adding more end-to-end tests and pipelines that will run these tests on long-running clusters. So far the stability tests ran exclusively on nightly clusters. With the Dublin release, we will introduce weekly clusters to help ensure that no issues pop up after a few days of working with the cluster. We will also tweak Kyma deployments to work better with cluster autoscaling, for example by adjusting the apiserver-proxy deployment and resource quotas in system Namespaces.

Our goal is to run Kyma on any Kubernetes cluster offered as a managed service. Currently, our default environment is the Google Kubernetes Engine (GKE). In the upcoming release, we will tweak our deployment procedure to allow Kyma to run and install smoothly on Azure Kubernetes Service (AKS) clusters. In addition, you will be able to add and configure Azure Broker in your cluster to enable easy provisioning and binding of Microsoft Azure services in your applications.

Developers working with Lambdas will appreciate the possibility to test them directly from the UI. You will able to provide input data and see the value the function returns without exposing it through the API gateway.

In 0.7 release, we also introduce the first version of the Asset Store which is a generic, Kubernetes-native solution that will store our documentation, images, API specifications, and client-side applications. It is an evolution of our current storage solution based on Minio.

As in the previous release, we continue on improving the security of Kyma. The Dublin release will come with the first version of authorization in UI-API Layer (GraphQL), which is based on the proof of concept we worked on.

You can also expect a couple of smaller improvements related to UI/UX, better UI tests, further refactoring for better modularization, and more. You can find all the items planned for the 0.7 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c0790ea1a6a4c6bf4b314c3).

Come back and check out Kyma 0.7 Dublin when it's released on 11.02.2019 and keep an eye out for more Kyma news and updates on our blog.

See you around!
