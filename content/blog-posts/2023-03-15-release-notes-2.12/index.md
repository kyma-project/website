---
title: "Kyma 2.12"
author:
  name: "Zhoujing Wang, RM @Kyma, and Grzegorz Karaluch, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.12.0"
redirectFrom:
  - "/blog/release-notes-212"
---

Winter is almost over, and spring is just around the corner. If you look carefully, you’ll notice that [here comes the sun](https://youtube.com/watch?v=TmBTYK7XZQk&feature=shares&t=14), and with it, many interesting Kyma changes. Read on to find out more!

<!-- overview -->

See the overview of all changes in this release:

- [General](#general) - support for Kubernetes 1.25, migration guide actions, plans to remove the Blog and Community sections from the website
- [Application Connectivity](#application-connectivity) - use the `kyma-system` Namespace for Compass Runtime Agent
- [Observability](#observability) -  New example on how to collect and export metrics based on OpenTelemetry
- [Telemetry](#telemetry) - Fixes and an update to third-party versions for logging and tracing
- [Eventing](#eventing) - NATS server updated to `v2.9.14`, Subscription updates
- [Serverless](#serverless) - Node.js 18 runtime introduction, deprecation of Node.js 14 runtime, forthcoming removal of `serverless.kyma-project.io/v1alpha1`
## General

### Kubernetes 1.25 support
Now, we officially support Kubernetes in version 1.25. For more information about changes in Kubernetes version 1.25, see the [Kyma 2.9 release notes](https://github.com/kyma-project/website/blob/main/content/blog-posts/2022-11-22-release-notes-2.9/index.md#general).

### Migration
You'll need a few cleanup actions when updating to the newest version. For more information, read the 2.11-2.12 [Migration Guide](https://github.com/kyma-project/kyma/blob/release-2.12/docs/migration-guide-2.11-2.12.md).

### Blog and Community sections removal

We're planning to restructure our Kyma website. Soon, the Community section will be removed, and the whole content will be kept in our [Kyma `community` repository](https://github.com/kyma-project/community).
In addition, the Blog section will also be removed in the future. Worry not! All Kyma release notes will be available on the [Kyma release page on GitHub](https://github.com/kyma-project/kyma/releases) and the blog posts on the [SAP community portal](https://community.sap.com/topics/kyma).
Stay tuned for more information.

## Application Connectivity
With Kyma 2.12, the Compass Runtime Agent component will use the `kyma-system` Namespace instead of `compass-system`. 
 
When you upgrade Kyma from version 2.11 to 2.12, the old component deployed in the `compass-system` Namespace won't be removed automatically. 
If you're using Compass Runtime Agent, you must execute the script after successfully migrating from Kyma 2.11 to Kyma 2.12. If not, no additional action is required.
For more information, read the 2.11-2.12 [Migration Guide](https://kyma-project.io/docs/kyma/2.12/migration-guide-2.11-2.12). 

## Observability
### Monitoring

- We have added a [new example](https://github.com/kyma-project/examples/tree/main/metrics-otlp) that illustrates collecting and exporting metrics using only OpenTelemetry technology.
- To decouple the Kyma components from the monitoring stack, all components have been refactored to use annotation-based metrics scraping instead of leveraging ServiceMonitors. Therefore, you must follow the 2.11-2.12 [Migration Guide](https://kyma-project.io/docs/kyma/2.12/migration-guide-2.11-2.12) to clean up ServiceMonitors of the system components. Also, the bundled rules for Loki have already been removed. With that, the system components have no direct dependency on the Monitoring module anymore.
- As announced in the release notes of Kyma 2.11, the Monitoring module has been deprecated. All relevant [documentation pages](https://github.com/kyma-project/kyma/issues/16392) contain the deprecation note.

## Telemetry
### Logging
- A bug that caused Fluent Bit to print errors on startup has been fixed. Check [this issue](https://github.com/kyma-project/kyma/issues/16733) for more information.
- Fluent Bit has been updated to the [2.0.9 version](https://github.com/kyma-project/kyma/pull/16764).

### Tracing
- Since this release, the Kyma Dashboard extension for TracePipeline [supports custom headers for OTLP outputs](https://github.com/kyma-project/kyma/pull/16760).
- Warnings at the startup of `otel-collector` [have been removed](https://github.com/kyma-project/kyma/issues/16736).
- `otel-collector` has been updated to version [0.72.0](https://github.com/kyma-project/kyma/pull/16943).


## Eventing

### NATS server
The NATS server image has been updated to `v2.9.14`. For more details, see the [NATS server release notes](https://github.com/nats-io/nats-server/releases/tag/v2.9.14).

### Updated Subscription CRD
With this release, we have upgraded event Subscriptions from `v1alpha1` to `v1alpha2`. This simplifies subscribing to events by removing the need for a prefix on the NATS/Jetstream backend. With the new version, we have also removed the previous modification of the event type during dispatching. The old Subscriptions will be upgraded automatically. For more details, check the [updated tutorials](https://github.com/kyma-project/kyma/tree/release-2.12/docs/03-tutorials/00-eventing).

## Serverless

### Introducing Node.js 18 Serverless runtime

With Kyma 2.12, we have introduced new Node.js 18 runtime for your Functions.

### Deprecation of Node.js 14 Serverless runtime

Because of the [planned EOL for Node.js 14](https://github.com/nodejs/release#release-schedule) we are planning to remove Node.js 14 from the list of the supported runtimes. 
For now, we recommend that you don’t use Node.js 14 as a runtime for your new Functions and re-configure all your existing Node.js 14 Functions to run on the latest available Node.js runtime.
See this [blog post](https://blogs.sap.com/2022/03/09/changing-the-function-runtime-version-of-a-running-function/) to learn how to update existing Functions.

### Reminder about new Serverless API version

As of [Kyma 2.6](https://github.com/kyma-project/website/blob/main/content/blog-posts/2022-08-25-release-notes-2.6/index.md#serverless), the `serverless.kyma-project.io/v1alpha1` API has been deprecated.
We are getting close to the end of the 6-month depreciation period. Therefore, with the next Kyma release (2.13), we plan to stop supporting the deprecated API and support only `serverless.kyma-project.io/v1alpha2`.

The conversion webhook that handles the conversion between the versions on the fly will be removed with Kyma 2.13.
Don't wait that long and adjust your Function manifests (YAML files) to the new version of the `serverless.kyma-project.io/v1alpha2` as soon as possible.