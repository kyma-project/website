---
path: "/blog/release-notes-07"
date: "2019-02-08"
author: "Karolina Zydek, Technical Writer @Kyma"
tags:
  - release-notes
title: "Kyma 0.7 Dublin"
---

<a class="btn-blog" href="https://github.com/kyma-project/kyma/releases/tag/0.7.0" alt="Download 0.7">Download 0.7</a>

The 0.7 release introduces new features accompanied by the improvements made to the already existing functionality. We are excited to present the Asset Store, our new component allowing you to store assets ranging from documentation to customer applications. The ongoing Prow development brings you nightly and weekly pipelines, implemented to intercept issues and thus improve the overall stability of the system.

<!-- overview -->

The highlights of Kyma 0.7 Dublin include:

- [Asset Store](#asset-store) - We introduced a brand new component for storing assets.
- [Publishing Events with Knative](#event-publishing-intergrated-with-knative-eventing) - We allow for Event publishing using Knative Eventing.
- [Nightly and weekly Prow pipelines](#nightly-and-weekly-prow-pipelines) - We set up new Prow pipelines to run Kyma installation on GKE and identify potential issues. 
- [Kyma on Azure Kubernetes Service](#kyma-on-azure-kubernetes-service) - We enabled Kyma installation on Azure Kubernetes Service.
- Improved deployment - To make Kyma deployment even easier, we introduced [API Server Proxy autoscaling](#api-server-proxy-autoscaling), [removed the resource quota from system Namespaces](#resource-quota-removed-from-system-namespaces), and [tweaked startup scripts](#startup-scripts-enhancement).
- [UI API Layer security model](#ui-api-layer-security-model) - We have switched from a custom Istio RBAC implementation based on Envoy to Kubernetes RBAC to bring you a lightweight and flexible solution for securing your resources.



See the overview of all changes in this release:


- [Application Connector](#application-connector) - 
- [Asset Store](#asset-store) - Asset Store introdution
- [Console](#console) - Migration to Fiori Fundamentals, view modularization, node visibility restrictions,
- [Continuous Integration](#continuous-integration) - Nightly and weekly Prow pipelines
- [Eventing](#eventing) - Publishing integrated with Knative eventing, 
- [Installation](#installation) - Upgrade to minikube v0.33.0, upgrade to Kubernetes v1.11.5, Kyma on Azure Kubernetes Service, resource quota removed from system Namespaces 
- [Monitoring](#monitoring) - New alert rule for Persistent Volumes, Prometheus Operator now optional 
- [Security](#security) - UI API Layer security model, 
- [Service Catalog](#service-catalog) - Azure Service Broker runtime bundling and installation, Single-time provisioning in Helm Broker
- [Service Mesh](#service-mesh) - Default Istio sidecar injection, API Server Proxy autoscaling, startup scripts enhancement
- [Tracing](#tracing) - Tracing UI elements renaming 


---

## Application Connector

### Application Registry payload limit increased

We have increased the default memory limit for Application Registry payload to 5 MB. This way, you can register APIs with extensive specification. 

### Client certificates in proxy service

We have enriched the proxy service with support for APIs protected with a client certificate. Registering an API with a client certificate results in generating a default client certificate for you to use. You can also provide your own client certificate.

### Known issues 

If you run Kyma on Minikube, you must expose the Nginx Ingress Controller on the dedicated NodePort. However, URLs returned from the Connector service do not include the value for this port. To fix it, update URLs manually using the information in [this](docs/components/application-connector#api-application-registry) guide.

## Asset Store

### Asset Store introdution

We have introduced a first version of a new solution, which the multi-cloud storage for assets such as documentation, images, or even client-side applications.

This version of Asset Store brings you the following features addressed by the [Asset Store proposal](https://github.com/kyma-project/community/blob/master/sig-and-wg/sig-core/proposals/asset-store-proposal.md):

* Fetching single files and packages (zip and tar files are supported for unpacking).
* Starting Minio in Minio Gateway mode to push resources to cloud providers like Azure or Google Cloud.
* Providing custom validation services for assets to validate them before uploading them to the storage.
* Providing custom mutation services for assets to modify them before uploading them to the storage. 


With the coming releases we plan to address the remaining features from the proposal. If you are interested in contributing, let us know.

## Console

### Migration to Fiori Fundamentals

We have migrated all Console UI views based on React.js to SAP Fiori Fundamentals which uses [this](https://github.com/SAP/fundamental-react) library. In addition to the migration, we improved and added the UI tests. This way, we covered all end-to-end scenarios for the Service Catalog views, and based them on the [testing bundle](https://github.com/kyma-project/bundles/tree/master/bundles/testing-0.0.1).

### View modularization

We have extracted all optional views from the Console core UI configuration into separate micro frontends. Additionally,all micro frontends displayed in the Console receive information about installed Kyma modules, so they can resiliently show the UI components relevant for such modules. 

### Node visibility restrictions

The visibility of navigation nodes in Console UI depends on user access rights. For example, only kyma-admins can see Kyma cluster settings. 

### Known issues

Browsers use cached file versions from previous Kyma releases instead of fetching new ones automatically. So far, there is no built-in cache breaker mechanism, so to fix this issue you need to manually clear the browser cache to make sure the console UI works properly after installing a new Kyma version.

## Continuous Integration

### Nightly and weekly Prow pipelines

We have introduced two new Prow pipelines which run Kyma from the master branch on GKE in nightly and weekly intervals. Their aim is to perform tests and identify any potential issues such as incorrect settings, memory leaks or bugs. If you are interested in details, go to https://status.build.kyma-project.io/?type=periodic and search for kyma-gke-nightly and kyma-gke-weekly jobs. We plan for adding slack notification on test results.

## Eventing 

### Event Publishing integrated with Knative Eventing

As a part of Knative adoption, you now can deploy Kyma with a `--knative` feature flag. It allows you to use the Publish API provided by Knative Eventing.

## Installation

### Upgrade to minikube v0.33.0 

We have upgraded minikube to version [0.33.0](https://github.com/kubernetes/minikube/blob/master/CHANGELOG.md#version-0330---2019-01-17). As a result, we use the stable `kubeadm` bootstrapper instead of the deprecated `localkube`. This helps us to leverage new features and improves the stability of local installations.

### Upgrade to Kubernetes v1.11.5

You can now deply Kyma using Kubernetes version 1.11.5, to enjoy improved stability and new Kubernetes features such as the Status subresource for CRDs, which summarizes the current state of the object in the system.

### Kyma on Azure Kubernetes Service

   You can now smoothly deploy Kyma on an Azure Kubernetes Service (AKS) cluster, using a chosen release or commit. [Install](https://kyma-project.io/docs/master/root/kyma#installation-install-kyma-on-an-aks-cluster) Kyma on a cluster using a proprietary installer based on a Kubernetes operator. If you want to try out Kyma on a cluster without assigning the cluster to a domain you own, you can use xip.io which provides a wildcard DNS for any IP address. For details, see [this guide](https://kyma-project.io/docs/master/root/kyma#installation-install-kyma-on-an-aks-cluster-with-wildcard-dns).
 

### Resource quota removed from system Namespaces 

You can install Kyma on managed Kubernetes clusters such as AKS or GKE, as they allow you to autoscale nodes. Therefore, we decided to remove kyma-default resource quota in Namespaces with limited memory allocated for resources. That change affects the `kyma-system`, `kyma-integration`, and `kyma-installer` Namespaces. Namespaces labelled with `env=true` still have the kyma-default resource quota assigned.

## Monitoring

### New alert rule for Persistent Volumes 

We are constantly increasing the number of default alert rules, so you can receive alerts for relevant components. The newest addition to the set is the alert rule for Persistent Volumes, activated when the volume used in the `kyma-system` Namespace exceeds 90%.

### Prometheus Operator now optional

The Prometheus Operator module used to be required in any Kyma setup. We have moved the ServiceManager CRD from the module to the CRD set provided by Kyma, giving you the possibility of defining the Service Management resources for the components without the need to install the Prometheus Operator. 

## Security

###  UI API Layer security model 

We have switched from a custom Istio RBAC implementation based on Envoy to Kubernetes RBAC to avoid the difficulties of developing and maintainig the LUA filters for Envoy. Additionally, the current implementation uses Go which makes it more lightweight and flexible. Read the [documentation](docs/components/security#details-graphql) to learn the details on securing resources in GraphQL using queries, mutations, and subscriptions.

## Service Catalog

### Azure Service Broker runtime bundling and installation

Kyma allows you to integrate with the Azure Service Broker in an easy way and to use the vast rage of Service Classes provided by this broker. All steps you need to perform to integrate with the Azure Service Broker are comprehensively described in the documentation, together with the description of each Service Class.

### Single-time provisioning in Helm Broker

The Helm Broker supports the `provisionOnlyOnce` flag in a context of given Namespace. The Azure Service Broker and GCP Service Broker bundles have been enhanced with that flag. For details, see [this](https://github.com/kyma-project/kyma/blob/master/docs/service-brokers/docs/05-02-helm-broker-bundles.md#the-bundle-metayaml-file) document.

## Service Mesh

### Default Istio sidecar injection 

By default, the Istio sidecar injector watches all Pod creation operations on all Namespaces and it injects the newly created Pods with a sidecar proxy. To disable proxy injection for a Namespace, add the `istio-injection=disabled` label. To disable proxy injection on a Pod level, add the `sidecar.istio.io/inject:false` label to a Pod.

### API Server Proxy autoscaling

To improve the availability of components, we have added autoscaling of the API Server Proxy component. It automatically decides if an additional instance of API Server Proxy should be deployed based on the memory usage metric.

### Startup scripts enhancement

To make your local deployments more convenient, the startup scripts now accept the `--password` argument. Running the scripts with this argument allows you to install Kyma locally and set a password for the admin user. This way, you don't need to fetch and decode the password Helm generates for every deployment.  


## Tracing 

### Tracing UI elements renaming             

The services and operations displayed in the Tracing UI for the Event flow have been renamed to enhance clarity. 

 