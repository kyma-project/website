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

## Logging 

Added central Logging component (OKLog) for command line access.

## Monitoring

Users can store their own dashboards in Grafana.

## Application Connector

- Now it is possible to create a Remote Environment from Console UI and kubectl. The old was using Helm chart has been deprecated.
- Labels have been added to Remote Environment. You can now in a flexible way mark what is the purpose of the Remote Environment
- The Metadata Service API has been enriched with new fields enabling better discovery of APIs and Event catalogs.
- Application Connector has been powered by OAuth token caching functionality.

## Tracing

- Jaeger UI is secured and you can access it easily without `port-forward`. Read more about [Jeager](/docs/latest/components/tracing#overview-overview)
- We added an example on how to enable tracing for an application. Read more [here](https://github.com/kyma-project/examples/tree/master/example-tracing)

## Event Bus

- Enabled an event lifecycle for storing events in a cluster that by default is set to 24h. You may configure the lifecycle in NATS streaming StatefulSet if you want by changing this value `max_age`.
- Added documentation for service programming model for event subscribers. Read more [here](https://kyma-project.io/docs/latest/components/event-bus#details-service-programming-model)

## Console

- You can now make several APIs attached to asingle Service. You can create API for a specific Service in the Service view, or several different APIs from API view.
- Once you excided ResourceQuota of your Environment you get a clear error message in the UI 

## Service Catalog

- Upgraded to v0.1.34 with namespace-scope resources (ServiceBroker, ServiceClass, ServicePlan) support. Related Console views do not suppor it yet.
- One step wizard for service instance creation
- Instance Parameters preview
- Helm Broker - redis `micro` plan use embedded storage
- Remote Environment Broker - registers application connector service classes in a namespace-scope way
- Etcds data lost after pod restarts is resolved
- Service catalog dashboard has been added to Grafana


## Installation

- Installation on Google Kupernetes Engine is possible (see the instruction in release 0.4.1) mainly due to Apiserver Proxy implementation (https://github.com/kyma-project/kyma/blob/master/components/apiserver-proxy/README.md)
- We now use Istio [1.0.1](https://istio.io/about/notes/1.0.1/)
- Possibility to override values in charts using config maps annotated with label “installer: overrides” (https://github.com/kyma-project/kyma/blob/f79db32ee0aac6feb5a20c9377f2c208d8fe91c6/docs/kyma/docs/037-gs-installation-overrides.md)
- Declarative list of modules in the installation custom resource (https://github.com/kyma-project/kyma/blob/master/docs/kyma/docs/040-cr-installation.md)

## Security 

There were several improvements in [API Gateway](https://kyma-project.io/docs/latest/components/api-gateway)
- Full qualified name is not required (kyma domain used as the default)
- Better hostname validation (invalid domain, duplicates)
- Migration to istio gateway and virtual service instead of deprecated istio ingress
