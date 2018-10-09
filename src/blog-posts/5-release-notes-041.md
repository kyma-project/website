---
path: "/blog/release-notes-041"
date: "2018-10-10"
author: "Lukasz Gornicki, Product Owner @Kyma"
tags:
  - release-notes
title: "Release 0.4.1 is out!"
---

It's been a while since we introduced Kyma to open source community. Many things changed in the project since it's [announcement in July](/blog/introducing-project-kyma).
Now we have our first official release and it is time to sum up what we worked on:

## Security 

In the area of the security we focused on our [API Gateway](https://kyma-project.io/docs/latest/components/api-gateway) that you can use to expose easily your API in a secured way. The following things got improved:
* Now when you create `Api` kind, `hostname` is validated to make sure you provided correct domain and that there are no duplicates.
* The [architecture](https://kyma-project.io/docs/latest/components/api-gateway#architecture-architecture) of the component changed and not Istio Ingress is used to expose a Service but the Istio Gateway and the Istion Virtual Service.


## Service Catalog

- Upgraded to v0.1.34 with namespace-scope resources (ServiceBroker, ServiceClass, ServicePlan) support. Related Console views do not support it yet.
- Multistep service provisioning wizard is now replaced with one step wizard
- In list of ServiceInstances and the ServiceInstance details now you can preview the instance parameters by clicking the instance Plan name
![](./assets/instance_params.png)
- Individual left navigation got removed and filtering moved next to the search. Not the filtering is enabled to support more different filters in the future and the scales much better in case there are many values provided in the filters.
![](./assets/filter.png)
- Created a Service Catalog specific Grafana dashboard to improve operations
![](./assets/sc_grafana_dashboard.png)

## Application Connector

The Application Connector, that alows you to connect external systems into Kyma went through major improvements:
- Management of the Remote Environments (RE) is no longer done through the Helm chart. Now we have a controller that reacts on changes in RE and setups the whole environment,
- The [RemoteEnvironments CRD](https://kyma-project.io/docs/latest/components/application-connector#custom-resource-remoteenvironment) is now enhanced with extra label field. Now you can now in a flexible way mark what is the purpose of the Remote Environment,
- The Application Connector has been powered by OAuth token caching functionality.

## Logging 

Kyma has not a new component to enhance its logging capabilities. It uses [Logspout and OK Log](https://kyma-project.io/docs/latest/components/logging).

## Monitoring

Through proper Graphana configuration now all the dashboards created by you in runtime are persisted and Pods restarts do not remove them.

## Tracing

- Jaeger UI is secured and you can access it easily without `port-forward`. Read more about [Jeager](/docs/latest/components/tracing#overview-overview)
- There is a clear example on how to enable tracing for an application. Read more [here](https://github.com/kyma-project/examples/tree/master/example-tracing)

## Event Bus

- Enabled an event lifecycle for storing events in a cluster that by default is set to 24h. You may configure the lifecycle in NATS streaming StatefulSet if you want by changing this value `max_age`.
- Added documentation for service programming model for event subscribers. Read more [here](https://kyma-project.io/docs/latest/components/event-bus#details-service-programming-model)

## Console

- You can now make several APIs attached to asingle Service. You can create API for a specific Service in the Service view, or several different APIs from API view
![](./assets/multi-api.png)
- Once you excided ResourceQuota of your Environment you get a clear error message in the UI 

## Installation

- [Installation on Google Kupernetes Engine](https://github.com/kyma-project/kyma/blob/master/docs/kyma/docs/032-gs-gke-installation.md) is possible mainly due to Apiserver Proxy implementation (https://github.com/kyma-project/kyma/blob/master/components/apiserver-proxy/README.md)
- We now use Istio [1.0.1](https://istio.io/about/notes/1.0.1/)
- Possibility to override values in charts using config maps annotated with label “installer: overrides” (https://github.com/kyma-project/kyma/blob/f79db32ee0aac6feb5a20c9377f2c208d8fe91c6/docs/kyma/docs/037-gs-installation-overrides.md)
- Declarative list of modules in the installation custom resource (https://github.com/kyma-project/kyma/blob/master/docs/kyma/docs/040-cr-installation.md)
