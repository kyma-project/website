---
title: "Kyma 0.8 Edmonton scheduled for release on 11.03.2019"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/release-08-plan"
---
We keep our promises here at Kyma. With the 4-week release cycle in full swing, it's time to shed some light on the next release named after the capital of the Canadian province of Alberta, located on the North Saskatchewan River. What can you expect from Kyma 0.8 Edmonton?

<!-- overview -->

 As life on the Canadian Prairies isn't easy, the Edmonton release focuses more on vital maintenance operations, such as upgrade, backup, and restore. The upgradeability check we added to our CI in the previous release will be activated as a mandatory test for every pull request. The same pattern will be introduced for backup and restore. We will test the Kyma components and user workloads regularly to ensure that they can be easily restored on a new cluster.

 In previous releases, we laid the groundwork to make Knative part of the Kyma messaging system. This time we will add a new controller to manage Knative subscriptions for delivering Kyma messages. As a result, we will be ready to make Knative the default solution in the upcoming 0.9 release.

 We realize that knowing exactly what's going on is important not only in the cold wilderness but also in the realm of cloud software. That's why we constantly work on improving observability in Kyma. This time around we will add more metrics to our default dashboards and switch from the recently archived OK Log to Grafana Loki, which is advertised as the "Prometheus for logs". This change will allow the Grafana UI to display logs, and enable rendering logs in the Console UI. 

 Priorities change from one release to another, but it goes without saying that security is always the top priority for us. Always. We're focused on fixing the majority of the identified issues such as accessing Tiller without authentication, too high privileges of service accounts in Prow, long ID Token expiration time, and more. To promote better security practices we will introduce a default developer role that is sufficient to deploy workloads in Kyma cluster but doesn't include admin permissions which allow managing system Namespaces and cluster-wide resources. Starting with Edmonton, the Console UI will allow you to bind roles directly to users, not only to groups. 

 The new release will be also much easier to install. Local deployments will support multiple Minikube versions. On cluster deployments, you will be able to use built-in, dynamic DNS support and certificate generation, so you won't have to configure DNS and issue TLS certificates should you want to quickly spin up a test cluster. 

 We listen to feedback from developers using Kyma, and in this release, we will add WebSocket support to the Authorization Proxy to enable kubectl commands: exec, port-forward and tailing logs. This way the `kubeconfig` generated for a specific, signed-in user will offer full functionality, but with the access limitations defined by the assigned user roles and user ID token expiration.

 With every release, we deliver a bunch of smaller improvements in different areas. The Edmonton release will bring:
- Rendering OData specification in the Service Catalog view of the Console UI
- All Namespaces visible in the Console UI
- Improvements to the Lambda UI responsiveness
- Console UI fully switched to Fiori 3 (based on SAP Fiori Fundamentals)
- A new test runner to replace for Helm test
- Instant updates of the Helm Broker repository URL - no need to restart!
- New resources in the Asset Store - ClusterBucket and ClusterAsset 
- Filtering in the Asset package fetching process

You can find all the items planned for the 0.8 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c0791391a6a4c6bf4b314c6).

Come back and check out Kyma 0.8 Edmonton when it's released on 11.03.2019 and keep an eye out for more Kyma cool news and updates on our blog.

See you around Stay warm!
