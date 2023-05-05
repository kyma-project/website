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
    - Removal of component (https://github.com/kyma-project/kyma/issues/15852)
## Telemetry
### Manager
    - Improved resiliency to modifications to the logging setup (https://github.com/kyma-project/telemetry-manager/issues/107)
### Tracing
    - Update of components
        ○ Otel Collector 0.75.0
### Logging
    • Update of components
        ○ Fluentbit 2.0.11 (https://github.com/kyma-project/kyma/pull/17310)
    • Managed retry policy for custom outputs (https://github.com/kyma-project/telemetry-manager/pull/139)
## API Gateway
    - Access Log configuration got streamlined across all profiles, having them disabled by default and selectively enableable using the Istio Telemetry API, as it was already the case for the evaluation and production profile (https://github.com/kyma-project/kyma/pull/17305)
    - Added trace context attributes conform to w3c-tracecontext to the access log format (https://github.com/kyma-project/kyma/pull/17304)
## Serverless
### Management of Function runtime pod’s labels and annotations
With 2.14 we have enriched Function Custom Resource API to enable management of  labels and annotations of the function’s runtime pod.
This will allow you to use various k8s tools against function worklads.
For example, you can enable custom log parser for your function logs by adding `fluentbit.io/parser: my-custom-regex-parser`  annotation as part of the functions spec.
Beware that those fields are part of the function’s spec. Those are applied on the function runtime pods. Do not confuse them with metadata of the function resurce itself.
### Improved reconciliation logic
2.14 brings improvenets in function resource reconciliation. Function controller is now aware of the function runtime base image version used in the functions. When a patch is rolled out for the serverless runtimes, the controller will redeploy your functions automatically.
