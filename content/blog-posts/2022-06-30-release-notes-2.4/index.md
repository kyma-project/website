---
title: "Kyma 2.4"
author:
  name: "Varban Vasilev, PM/PO @Kyma"
tags:
  - release-notes
type: release
releaseTag: "2.4.0"
redirectFrom:
  - "/blog/release-notes-24"
---

Swooosh… wow that was fast - the first half of 2022 is over already, and we’re at Kyma release 2.4!
We hope this summery update finds you well; maybe you’re going through your wardrobe and packing for vacation right now? No matter if you’re already sipping a cocktail on the beach or busy planning your vacation, find some time to read our hot news.
To name just a few of the improvements and updates that we packed into this release, Eventing got a new backend and Serverless supports a new runtime.
We’ve also finalized our spring cleaning and completely removed Service Catalog and Rafter. The Application Connectivity and Observability components have been adjusted accordingly.

<!-- overview -->

See the overview of all changes in this release:

- [Application Connectivity](#application-connectivity) - Application Gateway support for mTLS-OAuth
- [Eventing](#eventing) - Introduced NATS Jetstream as the default Eventing Backend 
- [Observability](#observability) - Kiali upgrade to 1.51.1
- [Serverless](#serverless) - Added support to NodeJS16, improved scheduling of Function build jobs
- [Service Management](#service-management) - Service Catalog removed
- [Service Mesh](#service-mesh) - Istio upgraded to 1.14.1

 
## Application Connectivity 
 
### Application Gateway support for mTLS-OAuth 

We introduced support for [mTLS OAuth](https://datatracker.ietf.org/doc/html/rfc8705)-secured APIs in Application Gateway. You can now configure your Application CRs so that Application Gateway fetches the OAuth token with the help of a TLS certificate as a credential. To learn how to do that, see [Register an OAuth 2.0 mTLS-secured API](https://kyma-project.io/docs/kyma/main/03-tutorials/00-application-connectivity/ac-04-register-secured-api/#register-an-o-auth-2-0-m-tls-secured-api). 

## Eventing 

### Introduced NATS Jetstream as the default Eventing Backend 

With Kyma 2.4, we changed the NATS eventing backend to use [`NATS Jetstream`](https://docs.nats.io/nats-concepts/jetstream) instead of just [`Core NATS`](https://docs.nats.io/nats-concepts/core-nats). This updated backend improves the delivery guarantees from previously AT-MOST-ONCE to now AT-LEAST-ONCE. To facilitate this change, the NATS cluster now relies on backing storage by default.  


## Observability 

To ensure compatibility after the Istio upgrade to v1.14, we upgraded Kiali to 1.51.1. It contains name changes of most Kiali resources, so we added a clean-up script to delete old resources after the upgrade. 
 
## Serverless 
 
### Added support to NodeJS 16 

With Kyma 2.4, you have a new Serverless runtime available – NodeJS 16. 
This new runtime not only brings a new version of NodeJS but also new versions of bundled OpenTelemetry SDK. All this enhances the development experience for NodeJS developers and improves the traceability of the requests handled by your NodeJS functions. 
 
### Improved scheduling of Function build jobs 
We have fixed the resource configuration for some of the Kyma components to reduce their CPU overcommitment. Additionally, we have removed the fixed requirements for computation resources for Function build jobs. With those changes, Function build jobs have better conditions to be scheduled, and your Functions won't be stuck in the building phase. 

## Service Management 


### Service Catalog removed 

With Kyma 1.23, we announced the [deprecation of Service Catalog](https://kyma-project.io/blog/2021/6/2/release-notes-123#service-management). Now in Kyma 2.4, we completely removed it. That's why in the 2.4 release, the following Service Catalog-related components are no longer installed as part of Kyma: 

- Service Catalog 

- Helm Broker 

- Application Broker 

- Application Operator 

- Service Binding Usage Controller 

- Rafter 


Note that your Service Catalog resources will not be migrated to any other solution. As mentioned in the [Service Catalog deprecation update](https://kyma-project.io/blog/2021/12/7/release-notes-20#service-catalog-deprecation-update), we recommend you to use [service operators for Service Management in Kyma](https://kyma-project.io/docs/kyma/main/01-overview/main-areas/service-management/smgt-01-overview/). 
 
If you already switched to another solution and want to remove the obsolete CRDs from your cluster, run the cleanup script provided in the [Migration Guide](https://kyma-project.io/docs/kyma/2.4/migration-guide-2.3-2.4) **after** you upgrade from Kyma 2.3 to 2.4. 
 
Service Catalog removal also affects Application Connectivity. We removed some components that interacted with Service Catalog, which means that Application Operator and Application Broker are no longer installed on new clusters. This also means that on fresh clusters, or after executing the migration script we provide, the old Application flow will no longer be present, and you will need to use the new way of connecting the external Systems. 

## Service Mesh 

### Istio upgraded to 1.14.1 

In this release, we upgraded Istio from 1.13.2 to 1.14.1. For more details, read the official [Istio 1.14.1 release notes](https://istio.io/latest/news/releases/1.14.x/announcing-1.14.1/). 
