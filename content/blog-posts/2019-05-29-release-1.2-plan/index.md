---
title: "Kyma 1.2 Istambul scheduled for release on 13.06.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-12-plan"
---

Our last release is already available for 2 weeks, so only 2 weeks left before you will see brand new, shiny, sunny 1.2 release named Istanbul. Kyma developers work hard to deliver new features and improvements every 4 weeks! Check out what you will get this time.
 <!-- overview -->

New features first. We've got a lot of feedback about writing and testing lambdas in the UI. As it is quite easy to copy and paste the code from the examples, developers complained that testing own code requires more effort. They wanted to check in an easy way, how their function will work with the message data they will get from the triggering event. We will introduce the single view where you can prepare example event payload (based on message schema), send it directly to your lambda and check the result. That should really speed up the developer's feedback loop.

Another new feature is the possibility to bind only selected Applications Service Classes. Imagine your application that exposes many APIs with different permission levels, e.g. view and admin API. Now system administrator can decide what services are available in a given namespace.

Finally, our Kyma CLI graduated from Kyma Incubator and will be used as a default method of local Kyma installation.

Installation is the area where we plan also several improvements. We want to prepare better default configurations to limit the number of steps required to install Kyma. For example, we will remove `sed` commands from the installation manual. Our goal is to have really simple getting started guides, but keep the possibility to configure and adjust every tiny setting in Kyma components. With our powerful Kyma operator (kyma-installer) it is possible.

Another improvement for Kyma users working with Google Cloud Platform is a possibility to install Kyma directly from [GCP Marketplace](https://console.cloud.google.com/marketplace/details/sap-public/kyma). You can do it with just a few clicks, and it is already available (you can install Kyma 1.1). Now you should treat it more like a preview for testing purposes (limited configuration is possible), but we will continue this work.

With other improvements we planned for 1.2 you will get the possibilities to:
- define limits and resource quotas when a namespace is created (UI)
- easily navigate to the external URL of your services exposed through API management
- Possibility to pass custom headers through eventing
- configuration for replacing built-in NATS with external messaging middleware

You can find all the items planned for the 1.2 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports/release?release=5cb59383709ee87123145468).

Kyma 1.2 Istanbul is scheduled for release on 13.06.2019. Keep an eye out for more Kyma news and updates on our blog. See you around! 
