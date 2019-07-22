# DR 009: ServiceBinding in Kyma

Created on 2018-03-07 by Adam Szecówka (@aszecowka).

## Context

The Service Catalog in Kubernetes implements the Open Service Broker API. The main goal of the Service Catalog is to provide a way for Kubernetes users to consume services managed by the brokers, and to easily configure their applications with no need for the detailed knowledge of how those services are created or managed. To learn more about the Service Catalog, see [this](https://github.com/kubernetes-incubator/service-catalog) documentation.

The workflow is as follows:
- The administrator creates a ServiceInstance in a given Namespace.
- The administrator creates a binding to the ServiceInstance, to allow the application access the provisioned service.

The binding operation results in creating Kubernetes Secret in a given Namespace.

## Decision

When the administrator wants to enable the same ServiceInstance (i.e. the same database instance) to two different applications, it is necessary to
create two separate bindings, one for each application. The broker returns a new set of credentials every time, if supported by a given ServiceClass.

For example: the Azure Broker acts like this in case of PostgreSQL. For more information on the binding operation in the Azure Broker, see the [Azure Broker documentation](https://github.com/Azure/open-service-broker-azure/blob/master/docs/modules/postgresql.md).
In case of the Helm Broker, which provisions Redis, the same credential is returned every time, because of the Redis security model. Even then, the administrator should create separate bindings.

It is recommended to use the synchronous binding, as the specification for the asynchronous binding is still in Alpha stage.

## Status

Accepted on 2018-03-07.

## Consequences

The service detects the interactions from different applications using separate credentials.

According to the Kubernetes [documentation](https://github.com/mironov/kubernetes/blob/master/docs/design/namespaces.md#motivation),
Namespace is a security boundary. If the Secret exists in the Namespace, the administrator can inject it to any deployment.

>**NOTE:** The Service Broker cannot prevent other applications from consuming a created Secret.
If a stronger isolation level is required, use a dedicated Namespace.
For more details, see [the Kubernetes issue #4957](https://github.com/kubernetes/kubernetes/issues/4957).
