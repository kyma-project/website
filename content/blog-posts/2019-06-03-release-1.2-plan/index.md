---
title: "Kyma 1.2 Istanbul scheduled for release on 13.06.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-12-plan"
---

Just as we initially promised, the developers are working hard to deliver new features and improvements every four weeks. Our last release is already available for 3 weeks, which means that the next Kyma version will be available in about a week. This time around, the release gets its codename from a city with an incredibly rich history, one that bridges the gap (literally!) between the East and the West. Kyma 1.2 Istanbul has a very rich history of improvements and new features and continues to aid the users in bridging the gap between different pieces of software. What's in store for the 1.2 release? 
<!-- overview -->

First, let's have a look at the new features. We received a lot of feedback about writing and testing lambdas in the Console UI. It is quite easy to copy and paste the code from the examples over to the UI, the developers complained that testing their own code requires more effort than that. They wanted an easy way to check how their functions work with the message data they will get from the triggering event. To help the developers check that, we will introduce a single UI view which allows to prepare a sample event payload based on the message schema, send it directly to a lambda function, and check the result. This new feature should significantly speed up the developers' feedback loop.

Another new feature we're working on is the possibility to make only the selected Service Classes of an Application registered in Kyma bindable. Let's say that your Application exposes many APIs with different permission levels, such as a view-only API and an admin API. With the new feature, the system administrator can decide what services and APIs are available in a given Namespace.

Installation is an area where we also plan to make several improvements. Our Kyma CLI graduated from Kyma Incubator and allows for a quick, simple, and platform-agnostic local installation of Kyma. Our local installation instructions are going to be updated to use this convenient tool. 

We want to prepare better default configurations to limit the number of steps required to install Kyma. For example, we will remove `sed` commands from the installation manual. Our goal is to have a very streamlined installation process but at the same time keep the possibility to configure and adjust every tiny setting in Kyma components, which is made possible by our powerful Kyma operator - the Kyma Installer.

Another improvement for Kyma users working with Google Cloud Platform is a possibility to install Kyma directly from [GCP Marketplace](https://console.cloud.google.com/marketplace/details/sap-public/kyma) with just a few clicks. This cool feature is already available and allows you to install Kyma 1.1. Because of its limited configuration options, treat it more like a preview than a polished deployment option but also know that we're continuing our work on this topic.

Here are some other things that will come in Kyma 1.2 Istanbul:
- Defining limits and resource quotas when a Namespace is created through the UI.
- Easily navigating to the external URL of your services exposed through API management.
- Passing custom headers through eventing.
- Configuration for replacing built-in NATS with external messaging middleware.

You can find all the items planned for the 1.2 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5cb59383709ee87123145468).

Kyma 1.2 Istanbul is scheduled for release on 13.06.2019. Keep an eye out for more Kyma news and updates on our blog. See you around! 
