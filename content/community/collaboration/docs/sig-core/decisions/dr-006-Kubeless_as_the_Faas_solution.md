# DR 006: Kubeless as a FaaS solution

Created on 2017-12-20 by Ahmed Abdalla (@Abd4llA).

## Context

Function as a Service (FaaS) is the main capability inside Kyma. This DR presents a market research and a detailed analysis of both Kubeless and fission.

## Decision

The decision is to use Kubeless as the FaaS solution.

## Status

Accepted on 2017-12-20.

## Consequences

As Kubeless is a leveraging Kubernetes core concept, the integration path with other tools, such as Istio, is much easier. The security-related requirements appear easier to fulfill as they are handled by Kubernetes.

Similarly to other available FaaS solutions, Kubeless is not a production-ready component. To adapt it for Kyma, Kubeless must be improved in these areas:

- Namespace separation
- NATS-based triggers
- Istio integration

Additionally, involvement in the Kyma community is essential to drive architecture changes and enhancements forward.
