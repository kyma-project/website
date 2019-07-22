# DR 010: JWT-based authentication in Kyma

Created on 2018-03-07 by Jakub Dziechciewicz (@kubadz).

## Context

As described in [DR 005](dr-005-Istio_as_the_API_Gateway.md), all of the APIs in Kyma must be accessible using ID tokens issued by the Kyma Dex component. This means that Kyma must allow services secured with JWT-based authentication.

### Custom Mixer Adapter

Previously, there was no readily available solution to provide JWT-based authentication in Kyma. An in-house solution to secure services in Kyma is the Mixer Adapter. Maintaining this adapter is a troublesome process as it requires building a new Istio image with each new Istio release.
For more information about Istio as the API Gateway, see [DR 005](dr-005-Istio_as_the_API_Gateway.md).

### JWT-based authentication using EndUserAuthenticationPolicy

Recent developments in the Istio project, concerning the **EndUserAuthenticationPolicy** and JWT Authentication Filter, have attracted a lot of attention. An investigation was conducted to judge whether these developments can replace the custom Mixer Adapter in Kyma.

Istio allows to secure microservices with JWT-based authentication by enabling the JWT Authentication Filter. The **EndUserAuthenticationPolicySpec** adds the JWT Authentication Filter to the Mixer Adapter configuration of the application specified in the **EndUserAuthenticationPolicySpecBinding**. However, according to [this](https://groups.google.com/forum/#!topic/istio-security/guJV0J9A2VQ) conversation, the **EndUserAuthenticationPolicySpec** is only a low-level Envoy filter configuration which should not be exposed to the user.

Moreover, contrary to the custom Mixer Adapter currently used in Kyma, this solution does not allow to secure only the chosen endpoints of a given service. Securing selected endpoints of a given service with JWT-based authentication cannot be abandoned as it is one of the functionalities that might be crucial for the future of the product.

### New authentication mechanisms

Developers of the Istio project are currently working on a new authentication policy which will support different authentication mechanisms, including the JWT-based authentication. Read [this](https://docs.google.com/document/d/1ezP4UuOn3JXEs_cXW4GyPGq-Ppq_XhS9-M-lN6ocOA4) document for more information. Istio developers plan to support more fine-grained settings, such as securing only the chosen HTTP methods or paths with JWT-based authentication.

## Decision

The decision is to keep using the custom Mixer Adapter to allow the users to secure services with JWT-based authentication in Kyma.

## Status

Accepted on 2018-03-07.

## Consequences

Kyma cannot use **EndUserAuthenticationPolicy** as this policy does not support securing. It only supports the chosen endpoints of the service. Additionally, the Istio developers do not recommend using it with user-facing APIs.

The new Istio Authentication Policy described in [this document](https://docs.google.com/document/d/1ezP4UuOn3JXEs_cXW4GyPGq-Ppq_XhS9-M-lN6ocOA4) will probably fit the requirements of Kyma. This is a subject to further evaluation, which will be conducted after the development process of the Policy is complete, or in a more advanced stage.
