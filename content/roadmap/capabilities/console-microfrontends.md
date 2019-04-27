---
displayName: "Console / Microfrontends"
epicsLabels:
  - area/console
  - area/luigi
id: console-microfrontends
---

## Scope

The Console/Microfrontends capability relates to the way in which a user interacts with the Kyma UI. It drives the development of the Console, a modular and extensible web user interface for managing all aspects of Kyma.

## Vision

* User Experience

    * Provide easy and intuitive user interfaces for Kyma to support its users in the best possible way.
    * Focus on a consistent user experience based on unified [Fiori 3 Fundamentals](https://sap.github.io/fundamental/components/index.html) style guides.
    * Enable most common user journeys in the UI so that usage of CLI is not required.
    * Don't hide the Kubernetes nature from the user but extend it with Kyma-specific user guidance.

* Extensibility & Modularity

    * Use [Luigi orchestration framework](https://github.com/kyma-project/luigi) as UI extension mechanism to ease customization.
    * Compose user interfaces from modular and highly reusable UI components.
    * Ensure consistent and correct usage of microfrontend-hosting.

* Fast & Responsive
    
    * Quick loading time for user interfaces
    * Load only the essential data that is needed for rendering user interfaces and nothing more (use GraphQL).
    * Give the user feedback for his actions (use websockets).

