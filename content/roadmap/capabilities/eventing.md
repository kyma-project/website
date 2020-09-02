---
displayName: Eventing
epicsLabels:
  - area/eventing
id: eventing
---

## Scope

Eventing helps you to deliver the following business use cases:

* Extend existing applications by capturing the business events and triggering business extensions developed in Kyma.
* Integrate two or more applications through business events.
*Allow the application developers to define workflows to achieve a business scenario.
* Enable integrating third-party messaging systems, including Cloud PubSub solutions.

## Vision

* Enable customers to plug in messaging middleware that fits their requirements best as well as to run multiple messaging implementations in parallel.
* Provide **Health metrics** and **Performance metrics** for Event Bus to enable smooth operations and proactive actions.
* Provide tooling to enable customers to benchmark Event Bus for their volume or fan-out needs.
* Align with [CloudEvents specification](https://github.com/cloudevents/spec).
* Provide a user interface for creating Event triggers for services deployed using Kyma.
* Filter Events and transfer only those with existing subscriptions (triggers).
* Generate Events inside a Kyma cluster and use them to enable asynchronous processing.
* Support sending multiple Events in a single request.
* Enable the subscriber to configure the backoff applied when the Event Bus retries to deliver the Events.
* Support semantics allowing to move the message to a dead letter queue if not processed by a function or a service.
* Enable the possibility of assigning Event attributes and specifying Event durability.
