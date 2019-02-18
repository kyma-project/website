---
path: "/blog/release-0.8-plan"
date: "2019-02-18"
author: "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
title: "Kyma 0.8 Edmonton scheduled for release on 11.03.2019"
---
We keep our 4 weeks release cycle so it is time to share some highlights for the next release 0.8 with code name Edmonton.

This time we focus more on operations tasks, such as the upgrade, backup, and restore. Upgradeability check was created in the previous release, in our CI, and will be activated as a mandatory step for every pull request. The same pattern will be introduced for backup and restore. We will test regularly how Kyma components and user's workload can be restored on the new cluster.

In previous releases, we did the groundwork to make KNative part of Kyma messaging system. This time we will add the controller to manage KNative subscriptions for delivering Kyma messages, and we will be ready to introduce KNative eventing as default in the release 0.9.

We know that observability is an important quality for our users. We will add more metrics to our default dashboards. We are going also to replace OK Log (which was archived recently) with  Grafana Loki - advertised as Prometheus for logs. The big advantage of that change is that you can use Grafana UI to display logs, and we will also render logs in Console UI.

As in every release, security is a priority. We will fix most already know issues like access to Tiller without authentication, too high privileges of service accounts in Prow,  long id token expiration time, and more. To promote better security practices we will introduce a default developer role that is sufficient to deploy workload in Kyma cluster, but doesn't include admin permissions to manage system namespaces and cluster-wide resources. It will be also possible to bind roles directly to users not only to groups. 

The new release will be also easier to install. In the local installation, we will support multiple Minikube versions (not only one as today). In the cluster installation, you can use built-in dynamic DNS support and certificate generation so you don't have to configure DNS and issue TLS certificates if you want to spin up quickly test cluster. 

We listen to feedback from developers using Kyma, and in this release, we will add websocket support to  Authorization proxy to enable kubectl commands: exec, port-forward and tailing logs. This way kubeconfig generated for logged in user will offer full functionality, but with the access limited to user roles and user id token expiration.

With every release, we deliver a bunch of smaller improvements in different areas, and this time we will:
- make all namespaces visible in Console UI
- improve Lambda UI responsiveness
- make console fully switched to Fiori 3 (based on SAP Fiori Fundamentals)
- introduce new test runner as a replacement for helm test
- enable instant update of helm broker repository URL (without restart)
You can find all the items planned for the 0.8 release in our [Zenhub](https://app.zenhub.com/workspaces/kyma---all-repositories-5b6d5985084045741e744dea/reports?report=release&release=5c0791391a6a4c6bf4b314c6).

Come back and check out Kyma 0.8 Edmonton when it's released on 11.03.2019 and keep an eye out for more Kyma news and updates on our blog.

See you around!