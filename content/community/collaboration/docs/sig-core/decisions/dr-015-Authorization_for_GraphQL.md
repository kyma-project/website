# DR 015: Authorization for GraphQL

Created on 2018-06-15 by Damian Pacierpnik (@damianpacierpnikatsap).

## Context

The GraphQL facade caches resources and does not forward every request to the API Server. So, the user token is not validated against RBAC.
The consequence is that all authenticated users can perform all operations supported by the GraphQL facade.
This is a vulnerability.

To patch this vulnerability, Kyma developers need an additional authorization layer before the GraphQL facade.

### Possible solution #1: Istio with RBAC support

One of the possible solutions is to use Istio with RBAC support (Istio version >= 0.5).
Istio Ingress can then expose GraphQL and developers can define appropriate authorization rules.

In the current release (0.7.x), **Istio RBAC engine** is implemented as a Mixer adapter.
The **Request Context** sent to the **Istio RBAC engine** is provided as an instance of the **Authorization Template**.
Information defined in the **Authorization Template** is fetched from [Istio Attributes](https://istio.io/docs/concepts/policy-and-control/attributes.html).
A given Istio deployment has a [fixed vocabulary of attributes that it understands](https://istio.io/docs/reference/config/mixer/attribute-vocabulary.html).

A set of **Service Roles** defines the authorization for a service in Istio.
A **Service Role** specification includes a list of **Access Rules**.
Each **Access Rule** can define authorization to the group of services by paths, methods, and/or constraints
on the other properties available in the **Request Context**.

To authorize the request to GraphQL, the query must be known in the **Istio RBAC Engine**, as an authorization decision depends on
information which is fetched in the query. So the query should be available in the **Request Context** sent to this engine.
Unfortunately, a GraphQL query is sent in the request body. The body is not available in the **Istio Attributes**.
So, currently the **Request Context** cannot send it. To enable this, the implementation of **Envoy Filter** is necessary.
It would provide additional **Istio Attributes**, required in the authorization process.

It is worth mentioning that there is no stable, easy solution to provide custom **Envoy filters** in Istio.
Although Istio manages those filters dynamically and trying to adjust envoy can cause some issues and side effects,
there is some support for envoy Lua http filters in Istio:
- Feature request: https://github.com/istio/istio/issues/1677
- Example: https://github.com/mandarjog/istioluawebhook

## Decision

Authorization for GraphQL will be implemented using RBAC roles in Istio. To make it possible, appropriate Envoy LUA filter
will be implemented.

## Status

Proposed on 2018-06-15.

## Consequences

GraphQL must be exposed via Istio, and must have a sidecar injected.

Istio has to be at least in version 0.5.x (0.5.x is totally broken. So, actually, at least 0.6.x).

Kyma developers have to implement and maintain their own envoy filter written in Lua.
They also have to implement and deploy the application that serves this Lua filter and will be registered as the webhook in Istio pilot.
Next, Kyma developers have to register the webhook in the Istio pilot. To do that, customization of Istio Helm charts is required,
because the developers have to modify the Istio pilot discovery container configuration.

Authorization of the access to GraphQL will be restricted to the attributes extracted by the envoy filter.

Envoy filter will be executed for all applications in Kyma with a injected sidecar. However, it will skip parsing the request
body if it is not a request to the GraphQL.

If Lua script is broken or the application with webhook is not accessible during the Istio pilot startup,
attributes will not be extracted and no error occurs (the filter will not be applied).
This means that all calls will be blocked by the RBAC engine. This is default behavior.

The Lua script does not refresh automatically. Istio pilot Pods must be restarted to fetch the configuration of the envoy filters.
Modifying the script requires recreating the configmap with the script, restarting the webhook app Pods, and restarting the Istio pilot Pods.

To expose the new resource in GraphQL queries, it is required to create appropriate **Service Role**.

The resources must be listed in alphabetical order. The list must be enclosed in curly brackets.
This solution is error-prone and as a result can be difficult to maintain.

The **Service Role** below is an example of how to access the following query:

```bash
curl http://$minikube_ip:32080/post -H "Host: httpbin.local" -i -d "query somequery { groups { name } services { id } }"        
```

**Service Role**:

```yaml
apiVersion: "config.istio.io/v1alpha2"
kind: ServiceRole
metadata:
  name: httpbin-post-res-groups-services
  namespace: default
spec:
  rules:
  - services: ["httpbin.default.svc.cluster.local"]
    paths: ["/post"]
    methods: ["*"]
    constraints:
    - key: "kymaGraphQlResources"
      values: ["{groups,services}"]
```
