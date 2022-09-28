---
title: "Kyma 2.7"
author:
  name: "Korbinian Stoemmer, PO @Kyma, and Nina Hingerl, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.7.0"
redirectFrom:
  - "/blog/release-notes-27"
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

