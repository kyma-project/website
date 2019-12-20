---
title: "Kyma 0.7 Dublin"
author:
  name: "Barbara Szwarc, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "0.7.0"
redirectFrom:
  - "/blog/release-notes-07"
---

The 0.7 release brings you features and improvements to further enhance your Kyma experience. The alpha version of the Asset Store component gives you a solution for storing assets, such as documents, files, images, or API specifications. The ongoing CI development resulted in new pipelines which you can use to run Kyma installation and intercept any installation-related issues. The Kyma-Knative integration continues, making it possible to publish Events using Knative Eventing. Other significant improvements allow you to install Kyma on AKS, keep your resources secure with the new security model, and benefit from smoother and simplified Kyma deployment process.
<!-- overview -->

The highlights of Kyma 0.7 Dublin include:

- [Asset Store](#asset-store) - We introduced a brand new component for storing assets.
- [Publishing Events with Knative](#event-publishing-with-knative-eventing) - We enabled Event publishing using Knative Eventing.
- [New CI pipelines](#new-ci-pipelines) - We set up new CI pipelines to run Kyma installation on GKE and identify potential issues.
- [Kyma on AKS](#kyma-on-aks) - We enabled Kyma installation on Azure Kubernetes Service (AKS).
- [API Server Proxy autoscaling](#api-server-proxy-autoscaling), [removed kyma-default ResourceQuota](#kyma-default-resourcequota-removed), and [tweaked startup scripts](#startup-scripts-improvements) that simplify the Kyma deployment process.
- [UI API Layer security model (GraphQL)](#ui-api-layer-security-model) - We switched from a custom Istio RBAC implementation to Kubernetes RBAC to bring you a lightweight and flexible solution for securing your resources.



See the overview of all changes in this release:


- [Application Connector](#application-connector) - Increased Application Registry memory limit, API secured with client certificates
- [Asset Store](#asset-store) - Asset Store introduction
- [Console](#console) - UI views migrated to SAP Fiori Fundamentals, view modularization, node visibility restrictions
- [Continuous Integration](#continuous-integration) - New CI pipelines
- [Eventing](#eventing) - Publishing integrated with Knative Eventing
- [Installation](#installation) - Upgrade to Minikube v0.33.0, upgrade to Kubernetes v1.11.5, Kyma on Azure Kubernetes Service, resource quota removed from system Namespaces
- [Monitoring](#monitoring) - New alert rule for Persistent Volumes, optional Prometheus Operator
- [Security](#security) - UI API Layer security model
- [Service Catalog](#service-catalog) - Azure Service Broker runtime bundling and installation, one-time provisioning for Helm Broker, Service Catalog standalone installation
- [Service Mesh](#service-mesh) - Default Istio sidecar injection, API Server Proxy autoscaling, startup scripts improvements
- [Tracing](#tracing) - Tracing UI elements renaming


---

## Application Connector

### Increased Application Registry memory limit

We have increased the default memory limit for the Application Registry payload to 5 MB to enable registration of extensive API specifications.

### API secured with client certificates

Application Proxy allows you to secure APIs with generated client certificates. When you register an API with a client certificate, the Application Registry generates a ready-to-use certificate and key pair for this API to secure it. You can use the generated pair or replace it with your own certificate and key. For details, see [this](/docs/components/application-connector#tutorials-register-a-secured-api) document.

### Known issues

If you run Kyma on Minikube, you must expose the Nginx Ingress Controller on the dedicated NodePort. However, URLs returned from the Connector Service do not include the value for this port. To fix it, update URLs manually using the information in [this](/docs/components/application-connector#api-application-registry) guide.

## Asset Store

### Asset Store introduction

We have introduced the alpha version of a new, Kubernetes-native solution for storing assets, such as documents, files, images, or API specifications.

This version of the Asset Store brings you the following features included in the [Asset Store proposal](https://github.com/kyma-project/community/blob/master/collaboration/sig-core/proposals/asset-store-proposal.md):

* Fetching single files and packages (zip and tar files are supported for unpacking).
* Starting Minio in the Minio Gateway mode to push resources to cloud providers, such as Azure or Google Cloud.
* Providing custom validation services for assets to validate them before uploading them to the storage.
* Providing custom mutation services for assets to modify them before uploading them to the storage.


In the coming releases, we plan to address the remaining features from the proposal. If you are interested in contributing, feel free to contact us on [Slack](http://slack.kyma-project.io). Meanwhile, read [this](/docs/components/asset-store#overview-overview) document to find out more about the Asset Store component.

### Known issues

Switching Asset Store to recommended production mode, with Minio Gateway under the hood and Google Cloud Storage support, requires additional manual configuration. This is because for this release the Minio setup must support our legacy solution and default **content** bucket setup. The problem is caused by the limitation of Google Cloud Storage which requires the bucket name to be globally unique. For details and configuration steps read [this](https://github.com/kyma-project/kyma/blob/release-0.7/resources/assetstore/README.md) document.

## Console

### UI views migrated to SAP Fiori Fundamentals

We have migrated Console UI views to SAP Fiori Fundamentals. For the core Console UI we used the [Fundamental NGX](https://github.com/SAP/fundamental-ngx) library, and the UI views were built on [Fundamental React](https://github.com/SAP/fundamental-react). In addition to the migration, we added the missing UI tests and improved the existing ones. This way, we covered all end-to-end scenarios for the Service Catalog views and based them on the [testing bundle](https://github.com/kyma-project/addons/tree/master/addons/testing-0.0.1).

### View modularization

We have extracted the optional views configuration from the core Console UI to create separate micro frontends. The micro frontends embedded in the Console receive information about installed Kyma modules to resiliently show the UI components relevant for these modules.

### Node visibility restrictions

The visibility of navigation nodes in the Console UI now depends on user access rights. For example, only `kyma-admins` can see Kyma cluster settings.

### Known issues

Browsers use cached file versions from previous Kyma releases instead of fetching new ones automatically. So far, there is no built-in cache breaker mechanism. To fix this issue, you need to manually clear the browser cache to make sure the Console UI works properly after installing a new Kyma version.

## Continuous Integration

### New CI pipelines

We have introduced nightly and weekly CI pipelines to perform tests and identify any potential issues, such as incorrect settings or memory leaks. The pipelines run Kyma on Google Kubernetes Engine using the master branch. If you are interested in details, go to `https://status.build.kyma-project.io/?type=periodic` and search for **kyma-gke-nightly** and **kyma-gke-weekly** jobs. We are also planning to add Slack notification for test results.

## Eventing

### Event Publishing with Knative Eventing

As a result of continuous Kyma-Knative integration, you can now deploy Kyma with a `--knative` feature flag. It allows you to use the Publish API provided by Knative Eventing.

## Installation

### Upgrade to Minikube v0.33.0

We have upgraded Minikube to version [0.33.0](https://github.com/kubernetes/minikube/blob/master/CHANGELOG.md#version-0330---2019-01-17). This means we can now use the stable `kubeadm` bootstrapper instead of the deprecated `localkube`. This helps us to leverage new features and improves the stability of local installations.

### Upgrade to Kubernetes v1.11.5

You can now deploy Kyma using Kubernetes v1.11.5, to enjoy improved stability and new Kubernetes feature. One of them is the Status subresource for CRDs, which summarizes the current state of the object in the system.

### Kyma on AKS

You can now smoothly deploy Kyma on an AKS cluster, using a chosen release version or even a particular commit. [Install](/docs/root/kyma#installation-install-kyma-on-an-aks-cluster) Kyma on a cluster using a proprietary installer based on a Kubernetes operator. If you want to try out Kyma on a cluster without assigning the cluster to a domain you own, you can use `xip.io` which provides a wildcard DNS for any IP address. For details, see [this guide](/docs/root/kyma#installation-install-kyma-on-an-aks-cluster-with-wildcard-dns).


### kyma-default ResourceQuota removed  

You can install Kyma on Kubernetes clusters such as AKS or GKE, which allow Node autoscaling. Therefore, we removed the `kyma-default` ResourceQuota with a memory limit defined for resources. That change affects the `kyma-system`, `kyma-integration`, and `kyma-installer` Namespaces. Namespaces labelled with `env=true` still have the `kyma-default` ResourceQuota defined.

## Monitoring

### New alert rule for Persistent Volumes

We are constantly increasing the number of default alert rules, so you can receive alerts for affected components. The newest addition to the set is the alert rule for Persistent Volumes, activated when the volume used in the `kyma-system` Namespace exceeds 90%.

### Optional Prometheus Operator

The Prometheus Operator module used to be required in any Kyma setup. To increase flexibility, we moved the ServiceManager CRD from the Prometheus Operator to the CRD set provided by Kyma. This way, you can define Service Management resources for your components without the need to install the Prometheus Operator.

## Security

###  UI API Layer security model

We have switched from a custom Istio RBAC implementation based on Envoy to Kubernetes RBAC. The reason was to avoid difficulties of developing and maintaining the LUA filters for Envoy. Additionally, the current implementation uses Go, which makes it more lightweight and flexible. Read the [documentation](/docs/components/security#details-graphql) to learn the details on securing resources in GraphQL using queries, mutations, and subscriptions.

## Service Catalog

### Azure Service Broker runtime bundling and installation

Kyma allows you to integrate with the Azure Service Broker in an easy way, and to use the vast range of Service Classes it provides. Each Service Class is comprehensively described in the [documentation](https://github.com/kyma-project/addons/tree/master/addons/azure-service-broker-0.0.1/docs). Read more about the Azure Service Broker [here](https://kyma-project.io/docs/components/helm-broker/#overview-azure-broker).

### One-time provisioning for Helm Broker

The Helm Broker now supports the `provisionOnlyOnce` flag which defines that the bundle should be provisioned only once for a given Namespace. We have also added this flag to the Azure Service Broker and the GCP Service Broker bundle configurations. For details, read [this](/docs/components/helm-broker#configuration-binding-bundles) document.

## Service Catalog standalone installation

We took further steps to modularize the Service Catalog by moving `service-catalog-addons` and `helm-broker` charts out of the `core` chart directory. This way, it's up to you to decide which components to install. When other Kyma components will be moved out of the `core` chart, you will be able to install Kyma with the Service Catalog only.

## Service Mesh

### Default Istio sidecar injection

By default, the Istio sidecar injector watches all Pod creation operations on all Namespaces and injects the newly created Pods with a sidecar proxy. To disable proxy injection for a Namespace, add the `istio-injection=disabled` label. To disable proxy injection on a Pod level, add the `sidecar.istio.io/inject:false` label to a Pod.

### API Server Proxy autoscaling

To increase the availability of components, we have enabled the autoscaling of the API Server Proxy component. Based on the memory usage metric, the system decides whether you should deploy an additional instance of the API Server Proxy.

### Startup scripts improvements

To simplify the local deployments, the startup scripts now accept the `--password` argument. Running the scripts with this argument allows you to install Kyma locally and set a password for the admin user. This way, you don't need to fetch and decode the password generated for every deployment.  


## Tracing

### Tracing UI elements renaming             

We renamed the services and operations displayed in the Tracing UI to provide clarity and better user experience.
