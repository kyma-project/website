---
title: HTTP API design
---

The file contains official guidelines for defining APIs in Kyma. This is an evolving set of guidelines which includes various aspects of API definition.

## Target audience

The target audience includes these groups:
* Internal developers who build various features of Kyma.
* Customer developers who use Kyma to customize external solutions.

## Name the HTTP headers

If possible, use a standard HTTP header rather than a custom one so that the semantics match.

For HTTP standard headers, refer to the [registry of headers](https://www.iana.org/assignments/message-headers/message-headers.xml) maintained by IANA.

For custom headers, use `Kyma-` as a prefix to indicate that the headers originate in Kyma. For example, `Kyma-Event-Type`. This helps to differentiate these headers from the headers that come from the external sources, such as a Storefront. According to the [RFC 6648][1] recommendation, incorporate the organization's name in custom parameters that are never standardized. Do not use `X-` as a prefix because it is deprecated according to [RFC 6648][1].

[1]: https://tools.ietf.org/html/rfc6648.html
