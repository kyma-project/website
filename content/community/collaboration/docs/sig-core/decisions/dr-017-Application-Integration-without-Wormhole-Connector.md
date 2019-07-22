# DR 017: Application Integration without the Wormhole Connector

Created on 2018-06-19 by Bartłomiej Szwej (@bszwej).

## Context

The Wormhole Connector is a part of the Application Integration. It is used by external systems deployed inside customers' private datacenter to establish a secure connection tunnel to the Kyma platform.

## Decision

The decision is to get rid of the Wormhole Connector at this stage of the project. It can be an optional component of the Application Connector but a secure tunnel. For now, the Application Connector should focus on stability and on providing the core business features.

## Status

Accepted on 2018-06-19.

## Consequences

The Wormhole Connector is removed.
