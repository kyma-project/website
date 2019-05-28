---
title: "Kyma 0.6 Cairo scheduled for release on 14.01.2019"
author:
  name: "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-06-plan"
---

With winter holidays and 2019 around the corner, let's think about something hotter and more exotic. A city perhaps... Cairo? Sounds good, right? 

If you're wondering what does Cairo have to do with Kyma, we're happy to explain. We decided that new releases need a cool common identification theme. After a long, coffee-fuelled 
brainstorming session we decided to name our releases after major cities in the world. Cool, right? 

Soooo... What can you expect from Kyma 0.6 Cairo? 

<!-- overview -->

Knative integration is our main focus for this release. The new Knative Working Group ([click here to visit its Slack channel](https://kyma-community.slack.com/messages/CEC6R4T6U)) works tirelessly to make Knative components available in Kyma clusters. 
By enabling a special toggle you will be able to delegate the eventing and messaging duties to Knative and use its ingress gateway for API exposure. 

The [Prow Working Group](https://kyma-community.slack.com/messages/CD7GJ41QE) is also firing on all cylinders. Soon all contributors will be able to see the build status and the logs for their pull requests. What's even more exciting, Cairo will be built using the new CI architecture!

We're also working on a more consistent naming scheme for all of our components. As Kyma users are well familiar with Kubernetes Namespaces, we decided to abandon our custom term "Environment" and use the Kubernetes standard instead.  
The renaming will also affect the Application Connector, as we'll say goodbye to "Remote Environments" and start using the "Application" name instead. This is an important step that follows our [Application Connectivity vision](https://github.com/kyma-project/community/blob/master/capabilities/application-connectivity.md). You can read more about both renaming efforts in [this](https://kyma-community.slack.com/archives/CD0K2NSQZ/p1544519219008800) Slack post. 

In parallel, we are working continuously on the Kyma UI/UX - you can expect a better navigation structure and technical foundation for UI modularization and extensibility, achieved by switching Console UI to Luigi framework. 

With the 0.6 release, we aim to improve code quality by introducing common libraries and unifying the acceptance tests code base. Additionally, the delivery of tools for testing the Service Catalog UI is planned.

Last, but definitely not the least, we're continuously improving the security of Kyma. In the 0.6 release we're extending the UI-API Layer (GraphQL) with an authorization concept. 

You can find all items planned for the 0.6 in [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c015e1eda763f3a7c15abef). Come back and check out Kyma 0.6 Cairo when it's released on 14.01.2019 and keep an eye out for more Kyma news and updates on our blog. 

See you around!
