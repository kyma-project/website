---
title: "Kyma and Knative turn one: Our First Year"
author:
  name: "Krasimir Semerdzhiev and Ahmed Abdalla"
tags:
  - knative
  - community
  - birthday
  - cncf
  - meetup
  - openSAP
redirectFrom:
  - "/blog/kyma-and-knative-turning-one"
---

It was a warm and sunny July day in San Francisco (not kidding!) when we got into the crowded Moscone West conference center for a session entitled “[Serverless on Google Cloud](https://www.youtube.com/watch?v=iPQUdb0kssE)”. On that very stage at Google Cloud Next 2018, both Knative and Kyma projects were announced and officially saw the light of day. Since then a lot of code was written and rewritten, shaping an extraordinary first year for both projects. You can go through some of the most memorable moments throughout [Kyma’s first year](https://kyma-project.io/blog/2019/7/24/happy-birthday-kyma/) or [Knative's first year](https://cloud.google.com/blog/) recaps.

<!-- overview -->

## Getting Kyma launched

Kyma started eight months before its public announcement, in an attempt to simplify software extensibility in the area of eCommerce at SAP Hybris. At that time, we knew neither that it was going to be open-sourced nor that the name would be Kyma. What inspired us to choose the open-source path was the initial interaction with several friendly partners. They all provided very similar feedback, were super enthusiastic, and asked for a way to get involved. At that point, we were convinced that we needed an open and highly collaborative model around the project. We first heard about Knative in the hallway track at KubeCon Europe 2018. Our first direct interaction with the Knative team took place already in early June 2018, when we exchanged ideas and discussed the direction going forward. On that day it became clear that our roads would cross again and that Kyma and Knative were destined to integrate well with each other.

![Documentation component](./wheels.png)

It took us less than two months, with all the support we could get across SAP, to publish the project on GitHub under [github.com/kyma-project](https://github.com/kyma-project) – just in time for the initial launch at Cloud Next that took place exactly one year ago.
We received phenomenal feedback both during and after the launch event. We got many questions about the features, technology choices, roadmap, SLAs, and more. We had to address many of these issues on the go as we moved forward. We also got the (seemingly obvious) question where and when Kyma will get a marketplace on its own. "Not so fast, not so fast," we were thinking, "let's first learn to walk before we start running!"

## After the launch

Since the launch, we’ve seen how the openness and flexibility of the Knative ecosystem have brought in many different vendors. Knative successfully simplified the experience of building apps on top of Kubernetes, enabling developers and operators to work together in the same environment. Some of the vendors around Knative provide interchangeable parts, such as [Gloo](https://github.com/solo-io/gloo) from solo.io and [Ambassador](https://github.com/datawire/ambassador) from Datawire that swap away and replace pieces of Istio. [Official stats](https://knative.teststats.cncf.io/d/5/companies-table?orgId=1) point at over 50 companies that have contributed to Knative.
We’ve also seen several projects kicking off on top of Knative, such as TriggerMesh and OpenWhisk. Kyma is also a part of this category, sitting steadily on top of Knative, enabling application developers to consume third-party services via the Open Service Broker catalog, and providing seamless connectivity to enterprise systems. We naturally started by integrating with our SAP apps. We became very quickly aware of the potential behind the approach in general, the reach it could provide to our partner ecosystem, and the large developer community out there. Leveraging Knative provides us with a flexible abstraction over the underlying Kubernetes resources. However, if one would want to go beyond Knative and work with Kubernetes directly at any point in time, that would be also possible. We went for this approach of radical transparency towards our underlying layers in Kyma.

## Together with Knative

We started with a very clear and [ambitious plan](https://kyma-project.io/blog/2018/8/10/kyma-knative-progress-report) to closely integrate Kyma and Knative. At the launch, we were still using the Kubeless serverless stack underneath our functions’ runtime. At that time, we had a [plan](https://kyma-project.io/blog/2018/9/27/replacing-kubeless-with-knative) to replace it as soon as Knative Serving becomes more stable and reliable. By default, Knative included eventing implementation based on Kafka. While providing superb scalability, it had a resource consumption footprint which was going beyond what we planned. Therefore, we went forward with our NATS Streaming-based Knative eventing implementation. That went quite well, and it is nowadays part of the standard Knative eventing delivery. Since April, it has also been the default eventing layer inside Kyma. We use it in many projects ourselves, and we enable developers to benefit from the lower memory consumption it provides.
As it often goes, plans and reality do not always meet as intended. In March, we had to [temporarily suspend](https://kyma-project.io/blog/2019/3/27/wg-knative-closure/) our Knative integration plans due to other priorities within the project. We were quick to realize that sustainable progress requires a steady, disciplined, and long-term focus. To get there, we regrouped and have now established a dedicated Knative team, led by our own Ahmed Abdalla. The team will drive forward the closer Kyma and Knative integration, starting right away with Knative Serving.  

## Going forward

Our focus, as we go forward, is to work on two fronts. On the one hand, we have the core Kyma features, building a truly open frame that provides a flexible and easy way to connect and extend enterprise applications.
On the other hand, we look at our serverless foundational layer, where we see Knative with all its different components as a natural and logical choice.

Therefore, we will work on:

1.	Establishing Knative as a first-class citizen in Kyma.
2.	Providing a Knative-rich user experience within Kyma by leveraging the full landscape of Knative features, such as Serving, Eventing, Operator, CLI, and more.
3.	Enriching the Knative community with Kyma use cases, customer feedback, and challenges, which we can solve together in collaboration.

Since we are still early in the journey, we have a lot of work ahead of us to reach our initial set of goals:
1.	Replace Kubeless serverless stack with the Knative Serving runtime.
2.	Provide production-ready and developer-focused user experience for eventing integration through the Broker/Trigger model.
3.	Leverage the full support of Event Sources within our Application Connector components.
4.	Provide easy out-of-the-box Knative installation experience through different Knative Operators.

This list could be much longer. By having a prioritized and focused working model, we are betting on the Knative community to be a partner in defining the future of enterprise software extensibility.

## Fostering the community

From day one, we planned for Kyma to be a vendor-neutral extension layer, making sure it meets our needs and the needs of the wider developer community. To stress that, attract new like-minded fellows, and reach a maximum audience, we’re currently planning the steps needed to donate Kyma to CNCF Sandbox, making sure to remove any barriers for potential contributors and collaborators. SAP has many years of experience in both writing and running mission-critical enterprise systems. It would be awesome to combine that with the different perspectives we will find out there with other vendors.
On the face-to-face front, we’ve taken extra care to cover some of the major events, such as KubeCon, OSCON, QCon, and several local Kubernetes-related meetups. Lately, we had the honor to host our friends from Google, [Matt Moore](https://twitter.com/mattomata) and [Scott Nichols](https://twitter.com/n3wscott), at a well-attended [Cloud-native meetup](https://events.sap.com/de/munich-knative/en/home) dedicated to Knative that took place in July in Munich. We conducted a poll there with the audience of over 70 people, and we jointly decided to launch the [Munich Knative Meetup Group](https://www.meetup.com/Munich-Knative-Meetup-Group/). Stay tuned for more news on that and an announcement of the inaugural event in September.

## In closing

We believe that wider collaboration creates the best environment for a vibrant and active community. We wouldn't be where we are today without all of your feedback and the early adopters who believed in Kyma and were open-minded enough to give it a try and not get discouraged by any hurdles on the way. You can find the [testimonial from XXXLutz](https://www.youtube.com/watch?v=NI4cOWO9HnA) as well as other early adopters on the Kyma and SAP CX YouTube channels. They all started throughout the year before we had our [openSAP course](https://open.sap.com/courses/kyma1) introducing Kyma and all the examples and automation around application integration. We’re deeply grateful for all the trust and support we’ve got so far!
/#keepExtending
