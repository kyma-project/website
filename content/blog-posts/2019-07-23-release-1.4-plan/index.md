---
title: "Kyma 1.4 Kyoto scheduled for release on 8.08.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-14-plan"
---

With summer in full swing and people enjoying their long-expected holidays, you might've thought that you're not going to get any news from us for some time now. Wrong! We're continuing our travels through the summer holidays season and this time around we're headed to Kyoto. Let's have a look at the new features and improvements planned for the 1.4 release, shall we?   

<!-- overview -->

Japanese are known for their hard work and innovations they introduced to the world of technology over the years. With our newest release sharing its codename with the home of the tech giant that taught us that the princess is always in another castle, we were inspired to focus on innovation and vital improvements. 

On the innovation front, you're getting an OAuth2 server integrated with Kyma. This solution is powered by [Hydra](https://github.com/ory/hydra) and supported by [Oathkeeper](https://github.com/ory/oathkeeper) from [Ory](https://www.ory.sh/). This feature-rich, lightweight (written in Go), and stable open-source solution backed by a huge community is a great fit for Kyma. We're going to make sure it's a good Kubernetes citizen and adds more value to our story and the "batteries included" principle we follow.  

When it comes to improvements, Kyma 1.4 Kyoto aims to improve on the application registration process. We're going to achieve that by using Compass - a new subproject that is still in the [Kyma Incubator](https://github.com/kyma-incubator/). [Compass](https://github.com/kyma-incubator/compass) consists of components that provide a way to register, group and manage your applications across multiple Kyma runtimes. Using Compass, you can control and monitor your application landscape in one central place. In the new release, it will be available as an experimental feature activated through a feature toggle and will provide a preview of the API and the UI. 

Remember "bundles"? We decided to rename them to "addons" to better reflect the functionality they provide. Kyma 1.4 will come with more flexible addons, with a streamlined publishing process, hosting directly on GitHub, and the ability to enable them in selected Namespaces. 

Here are some other things you can expect to see in Kyma 1.4 Kyoto:
- Improved Namespace view in the UI - better labeling, filtering, and visible health status of deployed workloads
- Kiali upgraded to the latest stable version and with Single Sign-On enabled
- Istio upgraded to 1.2.2
- Backup procedure configurable as part of the installation process
- Conversion Service and Validation Service for AsyncAPI specifications
- Experimental standalone Kyma Function controller module with Knative implementation

You can find all the items planned for the 1.4 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5cd88a49145f41296ed5194a). If you want to get an even better look at our plans, be sure to check out the project [roadmap](https://kyma-project.io/roadmap/). 

Kyma 1.4 Kyoto is scheduled for release on 8.08.2019. Keep an eye out for more Kyma news and updates on our blog. またね! 
