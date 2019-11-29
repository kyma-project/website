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

The 0.9 release comes with many updates and improvements, as well as some brand new features that make the Kyma experience even smoother. The Kyma-Knative integration has reached its peak and from this release, Knative Eventing is the default eventing mechanism. You can now install Kyma on GKE and AKS clusters using the default DNS solution provided by `xip.io`. Among many updates and improvements, we developed a new testing framework and updated the entire Monitoring stack. Last but not least, we introduced a brand new component for storing and managing content - the Headless CMS.

<!-- overview -->

The highlights of Kyma 0.9 Florence include:

- [Knative-based eventing by default](#kyma-with-knative-eventing) - The eventing mechanism is now based on Knative by default.
- [Xip.io wildcard as the default DNS solution](#installation) - We integrated the `xip.io` wildcard DNS as the default DNS solution.
- [Headless CMS component introduced for the Console UI](#headless-cms) - We introduced the Headless CMS component that allows you to store and manage content, and expose it through an API.
- [Updated Monitoring stack version](#monitoring-stack-version-update) - We updated the entire Monitoring stack.
- [Improved upgrade process](#test-runner-for-the-kyma-upgrade) - We developed a testing framework that automates checking the state of Kyma components after the upgrade.


See the overview of all changes in this release:

- [Application Connector](#application-connector) - Connector Service enhancements and extensions
- [Console](#console) - Console views that display documentation use the new Headless CMS
- [Core and Supporting](#core-and-supporting) - Kyma Headless CMS as the default solution for handling documentation
- [Eventing](#eventing) - Knative Eventing enabled by default, improved security, alerting and monitoring added
- [Installation](#installation) - `Xip.io` wildcard as the default DNS solution, test runner for the Kyma upgrade
- [Monitoring](#monitoring) - Monitoring stack upgraded to the latest version
- [Security](#security) - TLS in Tiller, external bundles repositories with TLS in the Helm Broker, Istio with mutual TLS for the Service Catalog and all Service Brokers
- [Service Mesh](#service-mesh) - Upgrade to Istio 1.1

---

## Application Connector

> **CAUTION:** To ensure the persistence of API services specifications, run the migration script to move successfully from v0.8 to v0.9. Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-0.9/docs/migration-guides/0.8-0.9.md) for details.

### Application Registry API can fetch generated client certificates

We extended the Application Registry API with the possibility to fetch the generated client certificates. As soon as you register an API secured with the client certificate verification as a security mechanism, you can read this certificate with our API. Read [this](/docs/components/application-connector/#tutorials-register-a-secured-api) document for more information.

### Apply details for the tenant and group name

We extended the TokenRequest functionality and now you can apply details for the tenant name and group name. It allows you to easily manage the token generation process for pairing applications in the central Connector Service. For more details, read [this](/docs/components/application-connector#custom-resource-token-request) document.

### Read about the Root CA rotation procedure

We updated our documentation with the description of the [Root CA rotation procedure](/docs/components/application-connector/#tutorials-rotate-the-root-ca-certificate-and-key).

### Acceptance tests for the Gateway Service

We enhanced the Gateway Service with the extended set of acceptance tests, which increases our confidence in the stability and performance of the component.

### Headers management

We changed the Application Gateway proxy functionality and now the unnecessary headers, such as `X-Forwarded-For`, are removed while making calls to external solutions. For the full list of removed headers, read [this](/docs/components/application-connector/#architecture-application-gateway-handling-of-headers) document.


## Console

### Documentation UI integrated with Headless CMS

The Documentation UI, which you can access in the Console UI, is now integrated with the Headless CMS. This means you can extend the Documentation view, the one you see after clicking the **?** icon, with your custom documentation topics as long as you have your docs written in Markdown and extended with additional metadata. The code snippet below is an example of a ClusterDocsTopic custom resource that will extend the Documentation UI navigation with a new element called **Prometheus** under a **Components** heading. After clicking **Prometheus**, you will see the official Prometheus documentation.

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: cms.kyma-project.io/v1alpha1
kind: ClusterDocsTopic
metadata:
  labels:
    cms.kyma-project.io/view-context: docs-ui
    cms.kyma-project.io/group-name: components
    cms.kyma-project.io/order: "2"
  name: prometheus
spec:
  displayName: "Prometheus"
  description: "Some docs about Prometheus concepts"
  sources:
    - type: markdown
      name: docs
      mode: package
      url: https://github.com/prometheus/docs/archive/master.zip
      filter: content/docs/concepts
EOF
```

### Service Catalog related views integrated with Headless CMS

The Service Catalog-related views now read documentation provided with the new Headless CMS. This means that you can easily provide documentation and specifications for any service that you want to share through the Service Catalog. See the example DocsTopic custom resource for artificial Service Class that exposes Slack APIs:

```yaml
apiVersion: cms.kyma-project.io/v1alpha1
kind: DocsTopic
metadata:
  name: {$SERVICE_CLASS_ID}
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

## Core and Supporting

### Headless CMS

In Kyma, we value the content-as-code principle. It means that documentation is treated the same as code, as in the end, it is not much different. We decided to go one step further. If content is like code, why not deploy it into the Kubernetes cluster as code as well? If you can easily deploy a service using the Deployment resource, you can do the same with documentation. This is what we implemented - the Headless CMS, based on Kubernetes Custom Resource Definitions, that uses our other component, the [Asset Store](/docs/components/asset-store), for storage.

The Headless CMS itself does not yet deliver any customizable UI interface that could be used to publish a standalone documentation portal. Nevertheless, we already use it in the Console UI. For more details, read the Headless CMS [documentation](/docs/components/headless-cms).

### Asset Store supports a webhook service that can enhance the status of the CR with additional metadata for each file

You can now extend the Asset Store status sub-resource with additional metadata information for each file created by the controller. To do so, create a separate service that implements REST API and accepts `multipart/form-data`. One of the use cases for such a service is to extract the front matter metadata provided in any file of the `yaml` format.
See the example AssetStore resource that contains information about the status modification webhook:

```yaml
apiVersion: assetstore.kyma-project.io/v1alpha2
kind: Asset
metadata:
  labels:
    controller-tools.k8s.io: "1.0"
  name: asset-sample
  namespace: default
spec:
  bucketRef:
    name: test-sample
  source:
    url: https://github.com/kyma-project/kyma/archive/0.8.1.zip
    filter: /docs/service-catalog/docs/
    mode: package
    metadataWebhookService:
    - name: assetstore-asset-metadata-service
      namespace: kyma-system
      endpoint: /v1/extract
      filter: \.md$
```

To learn more about webhook services, read [this](/docs/components/asset-store/#custom-resource-asset-validation-and-mutation-webhook-services) document.

### Asset Store stack enhanced with a default service that can extract metadata from any file

With the support of the new metadata webhook, we added a default service to the Asset Store domain. You can use it to extract the front matter metadata provided in any file of the `yaml` format. We already use this service in the Headless CMS component. For more details, read [this](/docs/components/asset-store/#details-asset-metadata-service) document.


## Eventing

### Kyma with Knative Eventing

Kyma now uses Knative Eventing backed by NATS Streaming by default. This is a big first step towards leveraging Knative Eventing capabilities in the upcoming releases.

### Improved security

Access to NATS Streaming is now restricted only to applications that store and read Events.

### Alerting and monitoring added

We added alerting and monitoring for eventing backing services.


## Installation

### Xip.io wildcard as the default DNS solution

The wildcard DNS provided by `xip.io` is integrated as the default DNS solution, which means you can now install Kyma on GKE and AKS clusters and create a playground environment even easier. Simply start the installation on your cluster and don't worry about owning a domain or configuring your cluster in a specific way. If you want to spin up a production-ready cluster, the process doesn't change. When you provide your own domain and TLS certificates, the Installer uses them instead of these provided by `xip.io`. Additionally, all scenarios support Application Connectivity.

### Test runner for the Kyma upgrade

We created a test runner and a place for end-to-end upgrade tests executed by [Kyma upgrade plan on CI](https://status.build.kyma-project.io/?job=post-master-kyma-gke-upgrade). The framework allows you to prepare the data and run tests against the prepared data. For more information on end-to-end upgrade tests, read [this](https://github.com/kyma-project/kyma/tree/release-0.9/tests/end-to-end/upgrade) document.


## Monitoring

### Monitoring Stack version update

We upgraded the entire Monitoring stack based on the Prometheus operator to the latest version. The upgraded components are Alertmanager v0.16.1, Prometheus Operator v0.29.0, Prometheus v2.7.1, and Grafana v6.0.1.


## Security

### TLS in Tiller

From this release, communication with Tiller requires a TLS certificate. For developers who install Kyma locally using Minikube, the start-up scripts automatically set certificates for Helm. However, from now on it is mandatory to add the `--tls` flag to every Helm command.

### Helm Broker enforces TLS for external bundles repositories

From now on, on your non-local clusters, you can use only servers with TLS enabled. All incorrect or unsecured URLs will be omitted. You can use unsecured URLs only on your local cluster. For more information, read [this](/docs/components/helm-broker/#configuration-configuration-configuration-rules) document.

### Istio with mutual TLS for the Service Catalog and Service Brokers

We introduced Istio with mutual TLS for the Service Catalog and for all Service Brokers (the Helm Broker, Application Broker, and Azure Broker).


## Service Mesh

### Istio version update

Kyma now uses Istio version 1.1.
