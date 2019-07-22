# Context

Kyma allows you to extend, integrate and modernize your monoliths, legacy applications or third-party systems in a cloud-native fashion. Kyma uses Event-driven architecture to achieve it.

## Use case 1: Extensibility and integration
Existing applications can capture the business happenings as Events. Some examples include `invoice.created`, `payment.received`, and `order.changed`.

These Events can then be transferred to Kyma through the Application Gateway.

Application developers can build serverless applications (lambdas and microservices) in Kyma to act on these Events. This way they extend the existing applications.

![](assets/extend-application.svg)

* Application preregisters the Event schema for the Events it wishes to send to Kyma.
* Event schema is defined in the [Async API format](https://github.com/asyncapi/asyncapi).
* The Events registered by the external solutions can be updated. This implies that Event schemas can change, new Event schemas can be added or existing ones can be removed. Such changes need to be cascaded to the underlying layer which will be Knative eventing.
* Application developers only deal with the Event domain. They have no knowledge of or coupling with the underlying messaging system.
* Events are stored centrally. Event Bus is the core component.
* The Event origin is defined using identifiers and the identifiers are used for the data partition. For example, the `customer.created` Event from `Application X` is segregated from the `customer.created` Event from `Application Y`.

### Integrating applications

Event-driven computations in Kyma can also be used to integrate two or more applications in the customer ecosystem.

Events produced by `Application X` can be used to trigger workflows in `Application Y` via APIs and vice-versa.

## Use case 2: Asynchronous workflows
Application developers can build in Kyma serverless applications which produce internal Events. These Events can be used to trigger serverless applications that consume the Events. This way, you create an asynchronous pipeline or workflow.

![](assets/asynchronous-workflows.svg)

## Use case 3: Integrating third-party messaging systems
Kyma can be used to integrate third-party messaging systems, including cloud solutions such as `Google PubSub`. A business happening in the application can be captured as an Event in Kyma. This event can then be stored in a cloud eventing system such as `Google PubSub`. Based on the Event, serverless computations can be triggered in GCP to achieve a given business scenario.

![](assets/integrate-3rd-party-publish.svg)

An Event in a third-party messaging system can be captured by Kyma to trigger a certain business logic in the application.

![](assets/integrate-3rd-party-consume.svg)
