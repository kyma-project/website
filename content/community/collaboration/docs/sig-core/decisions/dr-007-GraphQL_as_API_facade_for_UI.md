# DR 007: GraphQL as API facade for UI

Created on 2018-01-18 by Łukasz Górnicki (@derberg).

## Context

The Console UI allows to access different functionalities from different APIs. As a consequence, displaying a single UI view might require performing several API calls to different endpoints on the client side. To simplify the solution, it is desirable to keep the calls on the server side. Such approach improves resiliency and performance as the browser makes a single call to the API, which is less prone to errors. The API facade receives these internal calls and calls other APIs internally with a much higher speed. Thanks to the Istio integration, with simple configuration, the mashup implementation is much easier than an implementation that involves the client side.

Another argument to use such an approach in the UI architecture is that many of the components Kyma uses are in their early versions, such as Alpha or Beta, and their APIs change frequently. The decoupled approach introduced with the UI facade makes the UI resistant to breaking changes. In rare cases when queries need to be modified, the developers must adjust the code for that query in the UI only. There is no need to re-adjust the code for a new API, which is a common problem in the traditional REST architecture.

GraphQL is the optimal solution to use for the Kyma UI as, through extensive [querying](http://graphql.org/learn/queries/), it delivers the data that is required only for the particular view. It comes with a built-in resiliency mechanism: when you query multiple APIs and one of them fails to return information, the data received from other APIs successfully is returned, whereas the missing data is marked as `null`.

## Decision

The decision is to use GraphQL as API facade for the Console UI.

## Status

Accepted on 2018-01-18.

## Consequences

Every functionality exposed in the UI must be routed through the UI facade.
