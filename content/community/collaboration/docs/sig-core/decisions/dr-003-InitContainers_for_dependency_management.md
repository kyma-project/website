# DR 003: Init Containers for dependency management

Created on 2017-11-28 by Adam Szpakowski (@szpakas).

## Context

Certain dependencies between the Kyma components impact the order in which components should be created. The controller pattern in Kubernetes allows you to disregard many dependencies and rely on the Kubernetes reconciliation process. However, there are still a few cases in which strict dependency management is necessary. The most significant example is when Kubernetes **Kind** should be defined before it is used, as in the CustomResourceDefinitions.

The default dependency management solution in Kubernetes uses Init Containers coupled with readiness probes.
Init Containers allow the delay of the Pod's creation until certain conditions are met. When the conditions are fulfilled, the container succeeds.

Currently, the concept of Kyma core and extensions is at an early stage of development. Our API is unstable at best, and undefined at worst. An investment in any complex dependency management solution is fraught with high risks.

## Decision

The decision is to use Kubernetes Init Containers together with the readiness probes for dependency management. There are no plans to invest further in more complex solutions.

## Status

Accepted on 2017-11-28.

## Consequences

The main advantages of Init Containers are as follows:
- simplicity
- their relation to the Kubernetes core
- no external components required

As a result, using Init Containers keeps our investment low, and reduces the entry cost for new developers and users.

The main disadvantage of the proposed solution is the lack of support for proper dependency management. In the future, expressing dependencies as direct acyclic graphs, with any Kubernetes **Kind** as a graph node, should be supported. There are a couple of Kubernetes-related projects which support DAGs ([Atlassian Smith](https://github.com/atlassian/smith) and [Mirantis AppController](https://github.com/Mirantis/k8s-AppController)) but they are still at an early stage of development.

Init Containers are quite flexible and allow for almost unrestricted expression of restraints and checks. On the one hand, the flexibility helps to define dependencies, but on the other, it brings the danger of inconsistency. The lack of uniformity may result in complications and solutions that are difficult to maintain. To avoid these kinds of problems, best practices for using Init Containers should be set and applied.
