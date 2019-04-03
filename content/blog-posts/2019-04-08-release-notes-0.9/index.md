---
title: "Kyma 0.9 Florence"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "0.9.0"
redirectFrom:
  - "/blog/release-notes-09"
---

> Write an introductory paragraph and present the most important release highlights from all components. List the highlights as bullet points and provide relative links to their corresponding sections.

<!-- overview -->

The highlights of Kyma 0.9 Florence include:

- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}
- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}
- [{Feature or fix name}](#relative-link-to-subsection) - {One-sentence description}


See the overview of all changes in this release:

- [Application Connector](#application-connector) - Connector Service enhancements and extensions, possibility to configure the expiration time of certificates separately
- [Asset Store](#asset-store) -
- [Console](#console) - Console views that display documentation read content using new Headless CMS  aka add your own documentation to Console UI , New Log UI available in Console UI
- [Core and Supporting](#core-and-supporting) - Kyma Headless CMS as default solution for handling documentation
- [Eventing](#eventing) - Knative eventing by default, improved security, alerting and monitoring added
- [Installation](#installation) - Xip.io wildcard as the default DNS solution, test runner for the Kyma upgrade
- [Logging](#logging) - Loki enabled for all clients
- [Monitoring](#monitoring) - Upgrade Monitoring Stack to the latest version
- [Security](#security) - TLS in Tiller, external bundles repositories with TLS in the Helm Broker, Istio with mutual TLS for the Service Catalog and all Service Brokers
- [Service Mesh](#service-mesh) - Upgrade to Istio 1.1, mutual TLS enabled by default

---

## Application Connector

### Configure the expiration time of certificates separately

You can now configure the expiration time of certificates for Kyma clusters and connected applications separately.
For more information, read [this](https://github.com/kyma-project/kyma/tree/master/components/connector-service#connector-service) document.

### Application Registry API can fetch generated client certificates

We extended the Application Registry API with the possibility to fetch generated client certificates. As soon as you register API with client certificate as a security, then a user can read the API with the certificate being encoded into response payload.  
Read [this](https://kyma-project.io/docs/master/components/application-connector/#tutorials-register-a-secured-api) document for more information.

### Apply details for the tenant and group name

We extended the Token Request functionality with the possibility to apply details for the tenant name and group name.
It allows easy usage of the token generation process for pairing application in the scope of the central Connector Service: https://kyma-project.io/docs/master/components/application-connector/#custom-resource-tokenrequest

### Read about the Root CA rotation procedure

We updated our documentation with the description of the [Root CA rotation procedure](https://kyma-project.io/docs/master/components/application-connector/#custom-resource-tokenrequest).

### Acceptance tests for the Gateway Service

We enhanced the Gateway Service with the extended set of acceptance tests, which increases our confidence.

### Headers management

We changed the Application Gateway proxy functionality and now the unnecessary headers, such as `X-Forwarded-For`, are removed while making a call to the external solution. For the full list of removed headers, read [this](https://kyma-project.io/docs/master/components/application-connector/#architecture-application-gateway-handling-of-headers) document.


## Console

### Documentation UI integrated with Headless CMS

Documentation UI, which you can access in the Console UI, is now integrated with Headless CMS. This means you can extend the Documentation view, the one you see after clicking the **?** icon, with your custom documentation topics, as long as you have your docs written in Markdown and extended with additional metadata. See the example ClusterDocsTopic custom resource that will extend the Documentation UI navigation with a new element called **Workloads** that will be grouped under a new heading called **Kubernetes**. After clicking **Workloads**, you will see the official Kubernetes documentation.  

```
apiVersion: cms.kyma-project.io/v1alpha1
kind: ClusterDocsTopic
metadata:
  name: kubernetes-workloads
  labels:
    cms.kyma-project.io/view-context: docs-ui
    cms.kyma-project.io/order: "1"
    cms.kyma-project.io/group-name: Kubernetes
spec:
  displayName: "Workloads"
  description: "These are official Kubernetes docs about workloads"
  sources:
   - type: markdown
     name: markdown-files
     mode: package
     url: https://github.com/kubernetes/website/archive/master.zip
     filter: /content/en/docs/concepts/workloads/controllers
   - type: markdown
     name: markdown-files
     mode: package
     url: https://github.com/kubernetes/website/archive/master.zip
     filter: /content/en/docs/concepts/workloads/pods
```

### Service Catalog related views integrated with Headless CMS

The Service Catalog related views now read documentation provided with the new Headless CMS. This means that you can easily provide documentation and specifications for any service that you want to share through the Service Catalog. See the example ClusterDocsTopic custom resource that extends the Text Analytics service from Azure with additional documentation, Markdown docs, and the Swagger console based on the official Azure OpenAPI specification for the service:

```
apiVersion: cms.kyma-project.io/v1alpha1
kind: DocsTopic
metadata:
  name: slack
  labels:
    cms.kyma-project.io/view-context: service-catalog
spec:
  displayName: Slack
  description: "Slack documentation"
  sources:
    - type: markdown
      name: markdown-doc
      mode: single
      url: https://raw.githubusercontent.com/slackapi/slack-api-specs/master/README.md
    - type: asyncapi
      name: events-api
      mode: single
      url: https://raw.githubusercontent.com/slackapi/slack-api-specs/master/events-api/slack_events_api_async_v1.json
    - type: openapi
      name: openapi-swagger
      mode: single
      url: https://raw.githubusercontent.com/slackapi/slack-api-specs/master/web-api/slack_web_openapi_v2.json
```

### View Pods' logs directly from the Console UI

Console UI comes with an integrated Log UI micro frontend. It allows you to filter logs by labels and time so that you can see logs from relevant Pods and timeframe. You can also jump into logs from particular Pods or lambdas. To do so, select the **Show Logs** tab from the context menu on the Pods or lambdas list.


## Core and Supporting

### Headless CMS

In Kyma, we value the content-as-code principle. It means that documentation is treated the same as code, as in the end it is not much different. We decided to go one step further. If content is like code, why not deploy it into the Kubernetes cluster as code as well? If you can easily deploy a service using the Deployment resource, you can do the same with documentation. This is what we implemented - a Headless CMS, based on Kubernetes Custom Resource Definitions, that uses our other component, the [Asset Store](https://kyma-project.io/docs/components/asset-store), for storage.

The Headless CMS itself does not yet deliver any customizable UI interface that could be used to publish a standalone documentation portal. Nevertheless, we already use it in our Console UI. For more details, read the Headless CMS [documentation](https://kyma-project.io/docs/components/headless-cms/).


### Asset Store support for a webhook service that can enhance the status of the CR with additional metadata for each file

Now AssetStore status sub-resource can be extended with additional metadata information for each file that is created by the controller. It works this way that you create a separate service that implement REST API and accepts multipart/form-data. One of the use cases for such service is the extraction of the front matter metadata provided in any file with YAML format.

See the example AssetStore resource that contains information about the status modification webhook:

_TBD_

Read [this](https://kyma-project.io/docs/master/components/asset-store/#custom-resource-asset-validation-and-mutation-webhook-services) document to get more details.

### Asset Store stack enhanced with generic service that can be used for extracting metadata from any file

With the support of the new metadata webhook we added to AssetStore domain a default service that you can use for any use case that requires extraction of the front matter metadata provided in any file with YAML format. We use this service already in the component that we created on top of AssetStore, called Headless CMS.  

For more details, read [this](https://kyma-project.io/docs/master/components/asset-store/#details-asset-metadata-service) document.


## Eventing

### Kyma with Knative eventing

Kyma now uses Knative eventing backed by NATS Streaming by default. This is a big first step towards leveraging Knative eventing capabilities in the coming releases.

### Improved security

Access to NATS Streaming is now restricted only to applications that store and read Events.

### Alerting and monitoring added

We added alerting and monitoring for eventing backing services.


## Installation

### Xip.io wildcard as the default DNS solution

The wildcard DNS provided by `xip.io` is integrated as the default DNS solution, which means you can now install Kyma on GKE and AKS clusters and create a playground environment even easier. Simply start the installation on your cluster and don't worry about owning a domain or configuring your cluster in a specific way. If you want to spin up a production-ready cluster, the process doesn't change. When you provide your own domain and TLS certificates, the Installer uses them instead of these provided by `xip.io`. Additionally, all scenarios support Application Connectivity.

### Test runner for the Kyma upgrade

We created a test runner and a place for end-to-end upgrade tests. [Kyma upgrade plan on CI](https://status.build.kyma-project.io/?job=post-master-kyma-gke-upgrade) executes these tests. The framework allows you to prepare the data and run tests against the prepared data. For more information, read [this](https://github.com/kyma-project/kyma/tree/master/tests/end-to-end/upgrade) document.


## Logging

### Loki enabled for all clients

After Loki has been added in 0.8.0 as the central logging solution, with the latest release the API is reachable from outside of a cluster. With that, we added integration to [Grafana UI](#monitoring), as well as a complete new view in the [console](#console).


## Monitoring

### Monitoring Stack version update

We upgraded the entire Monitoring Stack based on the Prometheus operator to the latest version. The upgraded components are Alertmanager v0.16.1, Prometheus Operator v0.29.0, Prometheus v2.7.1, and Grafana v6.0.1.


## Security

### TLS in Tiller

From this release, communication with Tiller requires a TLS certificate. For developers who install Kyma locally using Minikube, the start-up scripts automatically set certificates for Helm. However, from now on it is mandatory to add the `--tls` flag to every Helm command.

### Helm Broker enforces TLS for external bundles repositories

From now on, on your non-local clusters you can use only servers with TLS enabled. All incorrect or unsecured URLs will be omitted. You can use unsecured URLs only on your local cluster. For more information, read [this](https://kyma-project.io/docs/master/components/helm-broker/#configuration-configuration-configuration-rules) document.

### Istio with mutual TLS for the Service Catalog and Service Brokers

We introduced Istio with mutual TLS for the Service Catalog and for all Service Brokers (the Helm Broker, Application Broker, and Azure Broker).


## Service Mesh

### Istio version update

Kyma now uses Istio version 1.1.  

### Mutual TLS enabled by default

Starting from this release, all communication between services is handled by Istio mutual TLS (fundamentals), which greatly increases the security of implementations built on Kyma. As this feature is connected to the automatic sidecar injection, developers do not need to apply any additional configuration to enable mTLS. Note that mTLS can be easily disabled on the Namespace or Service level.
