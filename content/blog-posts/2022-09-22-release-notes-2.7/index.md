---
title: "Kyma 2.7"
author:
  name: Korbinian Stoemmer, PO @Kyma, and Nina Hingerl, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.7.0"
redirectFrom:
  - "/blog/release-notes-27"
---

We’re heading into autumn, the season of cozy evenings with a mug of tea (or your preferred hot drink), a soft blanket, and maybe a good book or two. If you like, you could start off with reading our release notes for Kyma 2.7, which bring a richt harvest of feature updates and improvements:

- [Observability](#observability) - Multiple improvements around LogPipelines and updated monitoring stack
- [Serverless](#serverless) - API cleanup
- [Security](#security) - Cluster users deprecation

## Observability

### Logging - LogPipeline

 - Several bugs have been fixed, especially:
  - Attributes of the spec were generated with empty values [bug 15134](https://github.com/kyma-project/kyma/issues/15134)
  - When selecting logs by container names, the default Namespaces setting was reset to include system Namespaces [bug 15490](https://github.com/kyma-project/kyma/issues/15490)
 - Update to Fluent Bit 1.9.7
 - Improved Monitoring Dashboard [issue 14460](https://github.com/kyma-project/kyma/issues/14460)
	
### Monitoring
The monitoring stack was upgraded
 - Prometheus version 2.38
 - prometheus-operator version 0.58
 - Kube-state-metrics 2.5.0
 - Kubernetes dashboards were updated to the latest upstream versions

## Serverless

With Kyma 2.7, we are still on the mission to continue the API cleanup for the Serverless APIgroup towards a stable version. This time, we changed a runtime field from enum to a string, which decouples the list of available runtimes from the Function CRD itself. Also, we prepared a concept to enable advanced templating of function resources (that is, function Pod and build jobs ) using the Function CR specification.

Additionally, as a follow-up to the scaling features of `serverless.kyma-project.io/v1alpha2` released with Kyma 2.6, we have added an additional tutorial and example, so you can scale your Function with KEDA according to your business or technical needs.

## Security 
	
### Cluster users component deprecation note

Because Kyma 2.0 brings a lot of flexibility in shaping Kubernetes Roles and ClusterRoles, we want to encourage our users to model access rights to Kyma resources and their own resources. 
With this Kyma release, the Cluster users component is deprecated. 

