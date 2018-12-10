---
path: "/blog/release-0.6-plan"
date: "2018-12-11"
author: "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
title: "Release 0.6 is scheduled"
---

Kyma Release 0.6 is already planned for 14.01.2018! 

Here you can check what to expect:

Knative integration feature toggle is coming. You will be able to enable knative components by single property in installer config map. With feature toggle enabled kyma components will use knative eventing for messages, and knative ingress gateway for API exposure. Kyma developers will also explore other possibilities, e.. how to use knative for serverless (lamndas), but you can expect result in next releases.

Working Group Prow is accelerating in this release. With this release all contributors will be able to see the build status and logs for their pull requests and other build. Moreover, release 0.6 will be build with new infrastructure. 

This release will bring also better naming for our components. Kyma users knows kubernetes and are comfortable with using namespaces, therefore we no longer hide them behind the Environments. Kyma users will see Namespaces instead of Environments in the Console UI. 
Another naming change will affect Remote Environment, which will become the Application and you can expect changes in controllers, custom resources and UI in this area. It is just a step in the direction of [Application Connectivity vision](https://github.com/kyma-project/community/blob/master/capabilities/application-connectivity.md)

Kyma team work continuously on UI/UX - you can expect better navigation structure and technical foundation for UI modularization and extensibility achieved by switching Console UI to Luigi framework. 

In this release we want also to improve code quality by introducing common libraries and unification of acceptance tests code base.

Kyma takes security seriously and in this release we want to extend security model for ui-api-layer (GrapqQL) with authorization concept. 

You can find all items planned for Release 0.6 in [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c015e1eda763f3a7c15abef)
