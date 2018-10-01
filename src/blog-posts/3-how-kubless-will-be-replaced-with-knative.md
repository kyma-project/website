---
path: "/blog/how-kubeless-will-be-replaced-with-knative"
date: "2018-09-27"
author: "Johannes Engelke, Kyma Product Owner Serverless"
tags: ["kyma", "cloud", "knative", "application", "extension", "serverless", "kubeless"]
title: "How Kubeless will be replaced with knative"
---

[Knative](https://github.com/knative/) is an important new project in the cloud-native world and was announced as a "Kubernetes-based platform to build, deploy, and manage modern serverless workloads". It is an opinionated approach covering the best practices around three areas of developing cloud-native applications: building containers (and functions), serving (and dynamically scaling) workloads, and eventing. Knative is the open-source set of components and is actively developed by Google in close partnership with Pivotal, IBM, Red Hat, and SAP. 

Similar to Kubeless, Knative provides a set of building blocks to make it simpler to use Kubernetes and Istio for managing and operating lambda functions. Kubeless takes some code, builds an image out of it and starts it on Kubernetes. Knative is doing the same by following a more modular approach, allowing different components to be pluggable and adaptable to different deployment scenarios. 

Because of this more flexible approach, we are planning to replace the current Kubeless based Lambda Functions in Kyma with a Knative based implementation. To provide the same commodity as our users are used to with Kubeless, we have to do some extra work.

## Architecture

So far the architecture is not shaped out fully. Many details have to be sorted out and defined. The Idea is to use Knative as it is and try to bridge the existing gaps using custom components, available other open-source projects (e.g. [Riff](https://projectriff.io/)) or pushing enhancements to the Knative community. In the end Knative should provide the same functionality as kubeless is doing today.

![Serverless Kyma Architecture](./assets/3-serverless-kyma-architecture.png)

The core of the of the architecture are the knative serving and build components. As a kyma related component a custom build template is required providing the function interface available in kubeless.

Beside the build template a custom docker registry is required to store the build artifacts and a storage solution to store the function code. This could be a git repository or a blob storage like minio or S3. At the end the customer should be able to decide, if he likes to keep the function code in his own git repo or if he likes to store it in a storage solution provided by kyma.

## Implementation

As the implementation involves multiple components and will have breaking changes, we will keep kubeless till we are sure, the new version is working like expected. In the first step, knative-serving and -build components will be integrated as optional modules of kyma. If this is working, the other parts like docker registry, blob storage, build template etc. are enabled step by step. As a last step a new (forked) lambda UI will be created and adjusted to the needs of knative. As soon as everything is working fine, kubeless is faded out. That said, knative will be the new default and kubeless can be enabled as long as there are still old deployments available. As soon as we are sure, nobody is using the old kubeless based implementation it will be removed completely.
