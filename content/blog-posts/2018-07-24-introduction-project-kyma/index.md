---
title: "Introducing project Kyma"
author:
  name: "Krasimir Semerdzhiev, Kyma Open Source Strategist"
tags: 
  - kyma
  - cloud
  - native
  - GoogleNext2018
  - knative
  - istio
  - kubernetes
redirectFrom:
  - "/blog/introducing-project-kyma"
---

At SAP we typically deal with lots of enterprise software coming from a variety of different vendors. We've helped many of our customers and partners in all industries to model software to their needs and unique business processes. To meet the desire for flexibility, we see a growing demand for openness and modern architecture in this space. That's why we decided to spin the development of our new extension framework, Kyma, out in open source. We’d like to encourage all of you to take a look, get involved and lend a hand to expand Kyma to cover even more exciting extension scenarios.

<!-- overview -->

The ideas and concepts in Kyma result out of long years of experience in customizing different SAP and SAP Hybris solutions. It lets you create serverless applications, mashups and micro services – all running on the underlying Kubernetes+Istio – both serving as the foundation of Kyma. On top we enable developers to quickly code small customization modules and extension apps, interweaved with the business logic of the extended enterprise application. 

And then [Knative](https://cloud.google.com/knative/) came into the picture. Build from the ground up to support, container-based and cloud-native applications – it provides building blocks for developers to build and deploy container-based serverless applications anywhere on Kubernetes. Sounds familiar, right? All of us at SAP were super excited to see that the Knative dev team has taken very similar technology decisions. It felt like a validation of our Kyma scenarios from one side as well as the technology vision we had in the broader SAP Hybris team from another. From that point on – it was clear that Kyma and Knative are bound to grow together. On our end – we’ve refactored Kyma to leverage Knative configuration, build and serving components already from the on-start. We dropped some of the overlapping components, making Kyma leaner and more streamlined. We got as well all-in involved in Knative, having the opportunity to work with the incredible Google Cloud team.

A quote coming from the discussions, that stuck and made the whole Kyma team at SAP incredibly proud was:

> "SAP's extensive enterprise expertise and far-reaching commercial experience made for an ideal partnership as we developed Knative. SAP brought informed customer-driven use-cases to the table, helping us collectively shape the capabilities of Knative to meet the needs of real-world businesses. Knative and SAP Kyma make a perfect fit, and we look forward to the ongoing technical collaboration.” -DeWitt Clinton, Google Cloud

This collaboration gives us the chance to focus Kyma on the higher-level enterprise application connectivity and service consumption scenarios, relying on Knative for all the low-level infrastructure and development scenarios. 

We strongly believe in open technologies and open collaboration. Our goal is to join forces with interested parties out there and to build the most flexible extension framework for any SaaS applications to be customized and extended.  

Got you interested? Want to get involved? Get in touch with us via [Twitter](https://twitter.com/kymaproject), [GitHub](https://github.com/kyma-project) or our [Slack](http://slack.kyma-project.io) channel. We would also be very happy if you simply let us know your take on this!

Stay tuned for more updates... and have a great #GoogleNext2018!
