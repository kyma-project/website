# DR 002: Træfik as a candidate for an API Gateway

Created on 2017-11-23 by Paweł Soltysek (@pssap).

## Context

One of the core components in Kyma is the API Gateway. This DR focuses on [Træfik](https://traefik.io), one of the candidates for an API Gateway.

Træfik is an HTTP reverse proxy shipped with load-balancing, rate-limiting, monitoring, and several other useful features. In comparison to the other reverse proxies, Traefik stands out with its dynamic configuration abilities.
Træfik supports the most common orchestration backends (for example: Docker, Kubernetes, Mesos, or Consul). It is written in Go. The evaluated version of Traefik is 1.4.0 [rc4].

## Decision

During our evaluation process, it turned out that Traefik does not support one of the key features required in Kyma - JWT based authentication. Throughout the implementation, the lack of extensibility capabilities was also noticed. There is absolutely no notion of custom middlewares so introduction of additional features (like JWT-based authentication middleware) requires direct changes in the source code.

Advantages:
- few dependencies
- dynamic configuration
- Kubernetes-based orchestration
- built in circuit breaker
- rate limiter

Disadvantages:
- poor extensibility  

Although Traefik has a lot of interesting features, due to the poor extensibility capabilities, the decision is to not use it as an API Gateway in Kyma.

## Status

Accepted on 2017-11-23.

## Consequences

Further evaluation is required on the following solutions:
- [Istio](https://github.com/istio/istio)
- [Envoy](https://github.com/envoyproxy/envoy)
