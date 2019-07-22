# DR 014: Certificate validation against remote environment

Created on 2018-06-07 by Szymon Gibała (@Szymongib).

## Context

Every remote environment in the cluster should be accessible only for clients authorized to this particular remote environment.
This requirement raises a need for a mechanism that will differentiate between clients' permissions.

### Multiple server certificates

Having separate server certificate per remote environment would make it hard to manage all those certificates.

### Single certificate

Having only one certificate creates the problem that the client who obtained signed certificate for accessing one of the existing remote environments can access all of them using this particular certificate.

## Decision

The decision is to check the Distinguished Name of the client's certificate in Ingress-Nginx configuration using `nginx.ingress.kubernetes.io/configuration-snippet` in individual ingresses and grant permissions only in case the client certificate's Common Name matches the required one.

## Status

Proposed on 2018-06-07.

## Consequences

The solution achieves the desired results with the single server certificate. It also does not require a custom Common Name validation mechanism and it is handled in Ingress-Nginx configuration, which is the preferred solution.
