# DR 018: Knative-based Kyma Eventing

Created on 2018-08-19 by Ahmed Abdalla (@Abd4llA).

## Context

Based on the decision of building Kyma on top of Knative, and along the effort to reuse as much of Knative functionality as possible, the eventing area shines as a good area for alignment. That is why a decision was made to have Kyma leverage as much of Knative Eventing as possible. This is a an architecture decision on how to achieve that target.

The assumptions are as follows:
1. Base Kyma on Knative.
2. Favor a smooth, gradual migration of the Kyma components to Knative Eventing.
3. Consider areas of contribution to Knative Eventing.
4. Event Bus public integration: Publish RESTful API, EventActivation and Subscriptions CRDs are still needed.
5. Leveraging Knative Eventing is a requirement.

## Decision

### Kyma Event Bus

The decisions is to provide a solution that abstracts the Knative Eventing concepts for the rest of Kyma as a short- or medium-term solution. In that way, the transition to Knative Eventing is transparent to the rest of the Kyma components.

The architecture is as follows:

![Architecture](../../../assets/event-bus.png)

### NATS Streaming

Knative provides an abstraction of **The Bus** which is a pluggable component of Knative Eventing that have different implementations backed up by a certain messaging store, for example Kafka Bus, or GCP PubSub Bus.

The decisions are to:

1. Implement a production-ready Knative Bus `NATS Streaming`.
2. Provide `NATS Streaming` operator that provides `NATS Streaming` clusters which satisfy all production needs.
3. Implement Knative Bus `Azure Service Bus Messaging` as a plan B.
4. Contribute both implementations to `Knative Eventing`.

## Status

Proposed on 2018-08-10.

## Consequences

These are the consequences of this architecture decision:
- Refactor `Event Bus Publish` application.
- Merge `Event Bus Push` and `Sub Validator` applications into a single `Event Bus Controller` application.
