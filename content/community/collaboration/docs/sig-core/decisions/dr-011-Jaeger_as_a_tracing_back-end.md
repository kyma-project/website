# DR 011: Jaeger as a tracing back-end

Created on 2018-03-09 by Gaurav Abbi (@abbi-gaurav).

## Context

By default, Istio uses Zipkin for distributed tracing. Zipkin is not the best solution for Kyma as it is a heavy-weight Spring-based Java application.
The Kyma developers evaluated Jaeger which is a lightweight alternative to Zipkin.

## Decision

The decision is to use Jaeger as a back-end tool for tracing. Istio, Envoy, and some Kyma components, such as the Event Bus or the Connector Gateway, will continue to use the Zipkin client. This approach is necessary as Istio supports only the Zipkin client. Jaeger as a back-end tool is compatible with both the Zipkin client and the wire protocol. For the customer developer this is transparent since Zipkin and the wire protocol propagate headers only when making HTTP calls, and they do not need any instrumentation.

The decision is to use Jaeger with the in-memory storage as, similarly to Zipkin, Jaeger can lose traces. However, there are efforts underway in the Jaeger project to make the in-memory solution production-ready. See this [Jaeger GitHub issue](https://github.com/jaegertracing/jaeger/issues/551) for more information.


## Status

Accepted on 2018-03-09.

## Consequences

The traces can be lost, but it should be acceptable for the Beta release. The tracing feature is focused on improving the developer experience and it is not a replacement for any kind of auditing tools or mechanisms.

The possible future actions are as follows:
* Contribute to the open-source community on the [Jaeger GitHub issue](https://github.com/jaegertracing/jaeger/issues/551).
* Introduce the [sampling strategy](https://www.jaegertracing.io/docs/client-libraries/#sampling) in Kyma.
