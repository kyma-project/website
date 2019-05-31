---
displayName: "Application Connectivity"
epicsLabels:
  - area/application-connector
id: application-connectivity
---

## Scope

The Application Connectivity capability supports the extensibility and integration between applications in a cloud-native way using the best available solutions.
It provides integration patterns and necessary tooling for establishing a trusted connection between Kyma and third-party applications.

The goal is to enable the integration of various systems in a coherent way, where the management and usage of APIs and Events are standardized and allow to extend such systems in a natural, cloud-native way.
The unification of the connected system enables fast development which unlocks brand new possibilities for extending and customizing the existing solution in a modern, cloud-based, way.

A new way of system scalability is available. The event mechanism and simple access to the exposed API is a foundation for moving the workload from a legacy system to Kubernetes.

An additional benefit is that you can mesh different systems using the language of your choice.

The integration must be as simple as possible.

## Vision

* Application Registry and Discoverability

    * Connected application can register its APIs and Event catalogs. 
    * The registration contains the configuration of the endpoints together with required security credentials, documentation of the API and Event catalog based on open standards like OpenAPI and AsyncAPI, and additional documentation.
    * Registered APIs and Event catalogs will be exposed as virtual services in Service Catalog.
    * The registration of the application contains the required metadata, like health endpoints, localization, version.
    
* Events integration
    * The event integration functionality provides required middleware for delivery of the business events to Kyma.
    * The support for delivery guarantee, monitoring, and tracing is added.
    
* Access to the registered APIs
    * The access to API exposed by a connected application is provided, and all requests are proxied by the delivered proxy service.
    * The proxy service is handling the authentication and authorization, integration with monitoring and tracing. Various standard security mechanisms are provided to ensure the identity of the application. The support for OAuth, Basic auth, client certificates, CSRF tokes and more must be delivered.
    * The Service Catalog binding controls the access to the proxy service and therefore to the API. The development effort is reduced to the required minimum, and all the boiler-plate code is packed into connectors.
    
* Connectors
    * In the case of integration with the legacy system, which is not exposed using open standards such as REST, or if it is hidden behind a network firewall, the connectors will be provided.
    * The connector ensures that a legacy system will be exposed in the same way as other systems, and the required translation of the API calls or events will be handled. 
    * The palette of provided connectors should be kept to the necessary minimum and wherever possible, the industry standards must be used.
