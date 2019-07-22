# DR 001: Technology stack

Created on 2017-11-20 by Łukasz Górnicki (@derberg).

## Context

The Kyma developers need to select specific technologies. Their purpose is to:
* Enable the most lightweight solution and cost-effective solution for the cluster installation.
* Facilitate the cross-teams collaboration development.
* Enable easy context-switching between teams.

## Decision

The decision is to use the **Golang** language for all new implementations in Kyma. Golang allows to create very efficient applications with low memory usage and a vast set of system libraries. Many projects which Kyma depends on are written in Golang, including Kubernetes.

Use the following front-end technologies within Kyma:

- Open UI5
- Angular (version 4 and later)
- React

The recommended technologies fulfill the Kyma principles.

## Status

Accepted on 2017-11-20.

## Consequences

Use the technologies listed in this document as the first choice for all Kyma implementations. However, if you have a good reason to extend the list with a new technology which fulfills the Kyma principles, suggest it to the Kyma team and request their approval.

The list of backing services technologies is not yet definitive.
