---
title: "Kyma 1.4 Kyoto scheduled for release on 8.08.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-14-plan"
---

In the middle of the vacation season, one could expect you can rest from new Kyma releases. Not this time! In about 2 weeks you will get new cool features and a bunch of improvements again! What can you expect in 1.4 release? 
<!-- overview -->

First of all, you will get an OAuth2 server integrated with Kyma: [Hydra](https://github.com/ory/hydra) supported by [Oathkeeper](https://github.com/ory/oathkeeper) from [Ory](https://www.ory.sh/). We will write a separate blog post about that choice, but long story short: Hydra is a lightweight (written in Golang), feature-rich and stable open-source solution backed by a huge community. We will make sure that it is a good Kubernetes citizen and makes our story more complete (batteries included principle).

We are working also on the better application registration process. We started new subproject - Compass, that is still in the Kyma Incubator, but you will get the preview of the new API and UI in the new release. [Compass](https://github.com/kyma-incubator/compass) consists of components that provide a way to register, group and manage your applications across multiple Kyma runtimes. Using Compass, you can control and monitor your application landscape in one central place. It will be enabled in Kyma as an experimental feature activated by the feature toggle.

Next Kyma release will have more flexible AddOns. You will be able to activate AddOns in selected namespaces only, and the publishing process will be much simpler, as you can host them directly from GitHub.

Here are some other things that will come in Kyma 1.5 Kyoto:
- Namespace view improvements, like better labeling and filtering, or health status of deployed workloads.
- Kiali in the latest stable version and with Single Sign-On
- Upgrade to Istio 1.2.2
- The backup procedure is configurable as part of the installation
- Conversion and validation service for AsyncAPI specifications
- Experimental standalone (CRD only) Kyma Function controller module with KNative implementation

You can find all the items planned for the 1.4 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5cd88a49145f41296ed5194a).

Kyma 1.4 Kyoto is scheduled for release on 8.08.2019. Keep an eye out for more Kyma news and updates on our blog. See you around! 