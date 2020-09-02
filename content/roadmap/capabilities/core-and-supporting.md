---
displayName: "Core & Supporting"
epicsLabels:
  - area/core-and-supporting
  - area/community
id: "core-and-supporting"
---

## Scope

The Core and Supporting capability provides functionalities required to deliver the content and its visual representation. For us, content is not only regular documentation but also specifications and contextual help.
Due to the nature of the content and the number of different areas it sits in, the Core and Supporting capability provides also many generic tools that not only support content but also other aspects of the product.

In other words, if some content must be displayed in a given UI, the capability cares also about the rest of the UI of a given business functionality and its backend.

## Vision

- Content is written once and reused in different contexts in an efficient way on the documentation portal, as the inline help, or in the UI applications. In other words, we provide a headless CMS that is an abstraction layer on top of a more generic files storage solution that allows you to store any static content, such as client-side applications. This is possible because of:
  - The Kubernetes-native way of delivering content that supports distributed content sourcing and modularity. It means that content is delivered only if the documented component is enabled.
  - Generic reusable UI components for rendering documentation and specifications that are reusable in any context. For example, you can use them in the Service Catalog view to display documentation for ServiceClasses and their instances or in the Applications view to display the documentation of connected applications.
  - Providing the UI support for rendering specifications such as Swagger for REST API, EDM for OData, or AsyncApi for any kind of asynchronous communication.
  - The backend that allows for the reuse of content and specification details in any UI context.
- To support the out-of-the-box rendering of content in the Console UI and also make it easy for the Kyma users to generate a standalone documentation portal for their services.
- To support easy content development, enable templates integration, and allow for previewing the content before publishing.
- To support automated content validation, like links, grammar, consistency, and specification compliance.



