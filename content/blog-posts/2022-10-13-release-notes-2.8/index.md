---
title: "---
title: "Kyma 2.8"
author:
  name: "Zhoujing Wang, RM @Kyma, and Maja Szostok, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.8.0"
redirectFrom:
  - "/blog/release-notes-28"
---

We’re heading into autumn, the season of cozy evenings with a mug of tea (or your preferred hot drink), a soft blanket, and maybe a good book or two. If you like, you could start off with reading our release notes for Kyma 2.7, which bring a rich harvest of feature updates and improvements:

- [Observability](#observability) - Multiple improvements around LogPipelines and updated monitoring stack
- [Serverless](#serverless) - API cleanup
- [Security](#security) - Cluster Users component deprecation

<!-- overview -->

## Observability

### Logging - LogPipeline

 - Several bugs have been fixed, especially:
    - Attributes of the spec were generated with empty values [bug 15134](https://github.com/kyma-project/kyma/issues/15134)
    - When selecting logs by container names, the default Namespaces setting was reset to include system Namespaces [bug 15490](https://github.com/kyma-project/kyma/issues/15490)
 - Update to Fluent Bit 1.9.7
 - Improved monitoring dashboard [issue 14460](https://github.com/kyma-project/kyma/issues/14460)
	
### Monitoring

The monitoring stack was upgraded to the following:
 - Prometheus 2.38
 - Prometheus Operator 0.58
 - Kube State Metrics 2.5.0
 - Kubernetes dashboards were updated to the latest upstream versions

## Serverless

With Kyma 2.7, we are still on the mission to continue the API cleanup for the Serverless API group towards a stable version. This time, we changed the runtime field type from enum to string, which decouples the list of available runtimes from the Function CRD itself. Also, we prepared a concept to enable advanced templating of Function resources (that is, Function Pod and build jobs) using the Function CR specification.

Additionally, as a follow-up to the scaling features of `serverless.kyma-project.io/v1alpha2` released with Kyma 2.6, we have added an additional tutorial and example, so now you can scale your Function with KEDA according to your business or technical needs.

## Security 
	
### Cluster Users component deprecated

Because Kyma 2 brings a lot of flexibility in shaping Kubernetes Roles and Cluster Roles, we want to encourage our users to model access rights to Kyma resources and their own resources. 
With this Kyma release, the Cluster Users component is deprecated. 
"
author:
  name: Andreas Thaler, PO @Kyma"
tags:
  - kyma
  - observability
  - Kiali

redirectFrom:
  - "/blog/kiali-deprecation"
---

As part of the Kyma team working on the Observability capabilities, I'd like to let you know that we decided to deprecate the Kyma Kiali component. In this blog post, I'm going to give you our reasoning behind that decision.

## The Background

In my recent [blog post](https://kyma-project.io/blog/2022/9/21/observability-strategy/), I outlined the new strategy for the Observability domain in Kyma. To summarize, the shift towards providing enterprise-grade qualities for Kyma modules moved the focus to enable the users to stream telemetry data into their centralized (outer-cluster) observability backends. Hereby, Kyma explicitly decided to support open and easy integration into existing solutions instead of being yet another provider of a specific observability stack in enterprise-grade quality.

Now, we'll apply the same principle to Kiali. Kyma's current Kiali component is very lightweight and does not meet enterprise-grade qualities. Thus, the current approach does not fit our strategy. 

Instead of running Kiali with managed qualities inside a Kyma cluster, Kyma wants to enable users to connect with Kiali whenever they want.

## The Future

The Kiali component will be marked as deprecated with Kyma version 2.8. 
Instructions on [how to install Kiali on your own](https://github.com/kyma-project/examples/tree/main/kiali) have already been provided and will be maintained on a best-effort base. Kyma's Kiali component is planned to be removed with Kyma release 2.11, so you'll want to transition to a custom Kiali installation before that.


To sharpen the focus of the Kyma project, the Kiali component is transformed into a simple set of instructions. You can start the transformation already today.
