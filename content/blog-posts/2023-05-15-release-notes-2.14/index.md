---
title: “Kyma 2.14”
author:
  name: “Zhoujing Wang, RM @Kyma, and Nina Hingerl, Technical Writer @Kyma”
tags:
  - release-notes
type: release
releaseTag: “2.14.0”
redirectFrom:
  - “/blog/release-notes-214"
---
## Observability
### Tracing
    - Tracing was deprecated with release 2.11 (https://github.com/kyma-project/website/blob/main/content/blog-posts/2023-01-16-jaeger-deprecation/index.md) and has been removed (https://github.com/kyma-project/kyma/issues/15852). If you want to continue using Jaeger, follow the steps in our [Jaeger example](https://github.com/kyma-project/examples/tree/main/jaeger) to deploy your custom Jaeger installation. It is recommended to remove any existing installation of the tracing component by running the related [cleanup script](https://github.com/kyma-project/kyma/blob/release-2.14/docs/assets/2.13-2.14-cleanup-jaeger.sh).

### Monitoring
    - Update of components (https://github.com/kyma-project/kyma/issues/17378)
	- Prometheus 2.43.1
	- Prometheus-operator 0.64.1
	- Alertmanager 0.25.0
    - Switching to custom binaries to update base dependencies independent of the release cycle for (https://github.com/kyma-project/kyma/issues/17378)
	- Alertmanager
        - Node-exporter

## Telemetry
### Manager
    - Resilience against modifications to the logging setup has been improved (https://github.com/kyma-project/telemetry-manager/issues/107)
### Tracing
    - Updated the OTel Collector to 0.75.0
### Logging
    • Updated Fluent Bit to 2.0.11 (https://github.com/kyma-project/kyma/pull/17310)
    • Updated the retry policy for custom outputs (https://github.com/kyma-project/telemetry-manager/pull/139)
## API Gateway
    - Access Log configuration has been streamlined across all profiles: By default, they are disabled and can be enabled selectively using the Istio Telemetry API, as it was already the case for the evaluation and production profile (https://github.com/kyma-project/kyma/pull/17305)
    - Trace context attributes conform to w3c-tracecontext have been added to the access log format (https://github.com/kyma-project/kyma/pull/17304)
## Serverless
### Improved Function API
- The Function Custom Resource API has been enriched to enable management of labels and annotations of the Function’s runtime Pod.
  Now you can use various Kubernetes tools against Function workloads. For example, you can enable a custom LogParser for your Function logs by adding the annotation `fluentbit.io/parser: my-custom-regex-parser` as part of the functions spec.
  Note that those fields are part of the Function’s spec. Those are applied on the Function runtime Pods. Do not confuse them with metadata of the Function resource itself.
### Improved reconciliation logic
- Function resource reconciliation has been improved: Function controller is now aware of the Function runtime base image version used in the Functions. When a patch is rolled out for the Serverless runtimes, the controller redeploys your functions automatically.
