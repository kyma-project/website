---
displayName: "Service Management"
epicsLabels:
  - area/service-catalog
id: service-management
---

## Scope

The Service Management capability wraps up the Service Catalog and the Service Brokers concepts. It enables applications that run in Kubernetes clusters to easily use internally and externally managed software offerings, such as a datastore service offered by a cloud provider. It also provides a way to list, provision, and automatically bind applications with services from the Service Brokers, with no need for detailed knowledge about how those services are created or managed.

## Vision

The goal of the Service Management capability is to:
* Ensure a well-configured and hardened installation of the Service Catalog.
* Provide simple and self-guided Service Catalog UI flows.
* Assure that the Service Catalog UI functionality always goes hand in hand with the Service Catalog CLI.
* Support the Service Catalog with UI as a stand-alone solution.
* Support automated service binding injection into various types of Kubernetes applications. 
* Allow registering new types of Kubernetes applications at runtime.
* Enable connected remote applications in the Service Catalog using the Application Broker.
* Enable extending the Service Catalog offerings with services that will be installed in Kubernetes using the Helm Broker and the `bundles` repository.
* Provide a set of reusable services as bundles that will extend the Kyma installation.
* Allow users to choose a set of Namespaces where a given Service Broker will be automatically registered and available. 
* Allow users to reduce a number of Service Classes that will be exposed by a given Broker.
* Assure that the Service Catalog UI component for bindings is used in Deployment, Function, and other types of applications UI views.


