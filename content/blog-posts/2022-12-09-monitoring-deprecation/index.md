---
title: "Deprecation of Prometheus/Grafana based monitoring"
author:
  name: Andreas Thaler, PO @Kyma"
tags:
  - kyma
  - observability
  - monitoring

redirectFrom:
  - "/blog/monitoring-deprecation"
---

I'm part of the Kyma team working on the Observability feature. In my previous [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/), I talked about the general shift we plan to do in Kyma, regarding Observability. As a first step, I informed you about [the deprecation of the Loki based logging](https://kyma-project.io/blog/loki-deprecation). As the second and last step regarding deprecations, we are going to deprecate the Grafana/Prometheus-based monitoring functionality in Kyma. That is, the capability to store and query metrics using Grafana and Prometheus. In this blog post, I'm going to give you more details about why we made this decision and present the alternatives.

## Background

Kyma shifted the focus towards providing enterprise-grade components as building blocks that you can use to connect your production workloads with the SAP ecosystem. Kyma's classic in-cluster Monitoring component does not meet the enterprise-grade criteria because it does not scale with your application metrics load. Furthermore, you cannot change any configuration, for example, data retention times. Lastly, running an in-cluster monitoring backend (in the same cluster where your workload is running) has several drawbacks:

- Ecosystem: It does not support a multi-environment scenario where you want to store and analyze metrics from multiple environments/runtimes in one solution.
- Security: Your historical metrics are exposed to a potential attacker of the cluster and with that, cannot be used for forensic analysis.
- Operations: If the cluster is not accessible for any reason, you cannot access the current and historical metrics for troubleshooting.

Another factor that influenced our decision is that Grafana Labs changed the licensing for Grafana to AGPLv3. This made us rethink the observability capabilities of Kyma overall, reinforcing our strategy shift towards integration into existing observability systems over in-cluster managing of such systems. For the same reason, we accelerated the execution of the strategy and, with that, the deprecation of the Monitoring component.

Overall, we no longer believe that a managed in-cluster solution meets the typical requirements for production workloads, so we won't invest further into that. Instead, Kyma is going to support you with the integration into central systems, ideally also providing solutions that are part of the SAP BTP offering.

## Impact
For now, nothing has changed as it is a deprecation notice only. However, in half a year or later:

We will remove the Prometheus and Grafana setup in it's current shape and with that, the ability to browse your metrics.
Still, you have the following options:

You can manually install the classic in-cluster monitoring solution. Read [Installing a custom Prometheus stack(https://github.com/kyma-project/examples/tree/main/prometheus) in Kyma for more details.
You can continue bringing your custom solution for the collection and long-term storage of metrics inside or outside the cluster.
You can continue integrating with commercial monitoring offerings as outlined in an SAP specific mission to [Extend a Kyma Based Multitenant Application With Day 2 Operations](https://discovery-center.cloud.sap/missiondetail/3999/).

## Conclusion
Kyma's feature for storing and browsing application logs based on Prometheus and Grafana will be marked as deprecated with an upcoming Kyma release. In about six months or later, the feature will be removed. We'll announce the deprecation and removal in the release notes.

So, if you have no external monitoring system integrated yet, you might want to start evaluating that option or follow the provided instructions on [installing Prometheus/Grafana](https://github.com/kyma-project/examples/tree/main/prometheus).

Stay tuned for my upcoming blog posts!