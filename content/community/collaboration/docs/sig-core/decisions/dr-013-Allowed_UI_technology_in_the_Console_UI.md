# DR 013: Allowed UI technology in the Console UI

Created on 2018-03-28 by Peter Kurajsky (@pekura).

## Context

The Console UI is the administration view of Kyma and is a core part of the product.

To simplify the development process in Kyma, the number of used programming languages and frameworks is limited. It makes the collaboration easier and allows the developers to specialize in a chosen technology.
Following this principle, the Go language is used as the only programming language for the back-end functionality of the core Kyma features.

By design, the Console UI can be extended using plugins written in any framework, developed either internally or by customers or partners. The interface between the Console UI and the plugins is based on HTML and JavaScript but the approach is to provide libraries for the most popular and well-adapted UI frameworks, and gather knowledge and experience in using them.

## Decision

The decision is to allow the [React](https://reactjs.org) and [Angular](https://angular.io) frameworks in combination with the JavaScript and TypeScript programming languages to build the core views in the Kyma Console UI.

## Status

Accepted 2018-03-28.

## Consequences

Every team working on the Console UI functionality must use either [React](https://reactjs.org) or [Angular](https://angular.io). It must be possible to integrate the Console UI with the views built using these frameworks.
