---
title: "---
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


## General

### Kubernetes 1.25 support
Now we officially support Kubernetes in version 1.25.,  More information about changes in version 1.25 please check the "general" section in Rel. 2.9 release note: 
https://kyma-project.io/blog/2022/11/22/release-notes-29#general

### Migration
A few cleanup actions are needed when updating to the newest version, please be sure to read the migration guide(XXX) 

## Application Connectivity
The following components will be using kyma-system instead of compass-system Namespace in Kyma 2.12: 

- Compass Runtime Agent 
 
When the user upgrades Kyma from version 2.11 to 2.12 the old component deployed in compass-system Namespace won't be removed automatically. 
If the user is using the Compass Runtime Agent, you must execute the script after successfully migrating from Kyma 2.11 to Kyma 2.12. If not, no additional action is required.
For more information, see Migration Guide 2.12. 

## Observability
### Monitoring

Removed CR usage in kyma components
-> Loki rule removal
-> Container label missing
-> Migration Script

Deprecated docu (https://github.com/kyma-project/kyma/issues/16392), added new example (https://github.com/kyma-project/examples/pull/236)

## Telemetry
### Logging
	- FluentBit prints errors on startup (initContainer refactoring) (https://github.com/kyma-project/kyma/issues/16733)
	- Update to 2.0.9 (https://github.com/kyma-project/kyma/pull/16764)

### Tracing
	- Headers support in busola extension (https://github.com/kyma-project/kyma/pull/16760)
	- Removed warnings at startup of otel-collector (https://github.com/kyma-project/kyma/issues/16736)
	- Updated otel-collector to 0.72.0 (https://github.com/kyma-project/kyma/pull/16943)


## Eventing

### NATS server
	The NATS-Server image was updated to `v2.9.14`. For more details please take a look at the [NATS-Server release notes](https://github.com/nats-io/nats-server/releases/tag/v2.9.14)

### Updated Subscription CRD
	In this release we upgrade event subscriptions from v1alpha1 to v1alpha2. This simplifies subscribing to events by removing the need for a prefix on the NATS/Jetstream backend. With the new version we also removed the previous modification of the event type during dispatching. Old subscriptions will be upgraded automatically. For more details please check the updated tutorials.


## Serverless

### Introducing Nodejs.18 serverless runtime

With Kyma 2.12 we introduce new Node.js18 runtime for your functions.


### Deprecation of Nodejs.14 serverless runtime

Because of the planned EOL for Node.js 14 we are planning to remove Node.js 14 from the list of supported runtimes soon. 
For now, we recommend that you don't use node.js 14 as a runtime for your new functions and re-configure all your existing  Node.js 14 Functions to run on the newest Node.js 18 runtime.

### Reminder about new serverless API version

As of kyma 2.6 the serverless.kyma-project.io/v1alpha1 API is deprecated.
We are getting close to the 6 month depreciation grace period. Therefore, with next kyma release (2.13) we plan to stop supporting the deprecated API and support only serverless.kyma-project.io/v1alpha2. 

The conversionwebhook that handles the conversion between the versions on the fly will be removed with Kyma 2.13.
Don't wait that long and adjust your Function manifests (YAML files) to the new version of the serverless.kyma-project.io/v1alpha2/Function specification as soon as possible.
