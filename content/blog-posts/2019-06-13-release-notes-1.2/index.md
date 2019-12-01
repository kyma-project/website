---
title: "Kyma 1.2 Istanbul"
author:
  name: "Tomasz Papiernik, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.2.0"
redirectFrom:
  - "/blog/release-notes-12"
---

It's about time to sail our ship to Istanbul and see all of the new features and tweaks that come with the 1.2 release. This time around we focused on streamlining the installation flow, providing a simpler way of testing lambda functions, giving more power and flexibility to Kyma Eventing, migrating to a new version of Istio, and providing even more useful documentation.

<!-- overview -->

The highlights of Kyma 1.2 Istanbul include:

- [Streamlined installation](#installation) - We enabled platform-agnostic local installation with the Kyma CLI, enabled Kyma installation through GCP Marketplace, and simplified all cluster installation flows.
- [Testing lambda functions in the UI](#testing-lambda-functions-in-the-ui) - We added an option to test lambda functions through the Console UI.
- [Migration to Istio 1.1.6](#service-mesh) - We migrated to a new, more secure and stable version of Istio.
- [Migration to Istio in the Application Connector](#migration-to-istio) - We moved from NGINX Ingress to Istio in the Application Connector.
- [Configuration for using different messaging middleware](#choose-and-configure-a-custom-messaging-middleware) - We added configuration that allows using different messaging middleware in Kyma Eventing.

See the overview of all changes in this release:

- [Application Connector](#application-connector) - Migration to Istio, support for custom headers and query parameters in authentication requests
- [Console](#console) - Testing lambda functions through the UI, more configuration options available at the moment of Namespace creation
- [Installation](#installation) - Local installation with Kyma CLI, Kyma available trough GCP Marketplace, streamlined cluster installation flows
- [Documentation](#documentation) - New configuration, troubleshooting, and Headless CMS metadata documents, tutorial for customizing the Documentation view in the Console UI, testing bundle with sample documentation
- [Eventing](#eventing) - Choosing and configuring a custom messaging middleware, sending custom metadata with published Events, an example for triggering microservices with Events
- [Observability](#observability) - Early version of Kiali added to Istio
- [Service Mesh](#service-mesh) - Istio update to version 1.1.6

Read about a known issue for [Observability](#known-issues).

> **CAUTION:** Before you upgrade to Kyma 1.2, read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.2/docs/migration-guides/1.1-1.2.md) which describes necessary manual actions required by the Event Bus, the Asset Store, and the Application Connector.

---

## Application Connector

### Migration to Istio

From the very beginning of the Kyma project, the Application Connector has been exposed using the NGINX Ingress. After the recent changes in Istio 1.x which included support for client certificates, we decided to migrate to Istio as did the rest of Kyma components. We are proud to announce that the migration is complete and we are already benefiting from a number of advantages including easier maintenance and a smaller number of components in the implementation.

Read [this](/docs/components/application-connector/#architecture-architecture) document to learn more about the role Istio plays in the Application Connector.

### Custom headers and query parameters in authentication requests

To facilitate the integration of APIs that require sending additional headers and query parameters with every request to an external system, we allow the developers to provide a custom list of the headers and query parameters when registering an API in the Application Registry. The Proxy service reads this configuration and enriches each call from an API to an external service with the required items.

Read [this](/docs/components/application-connector/#tutorials-register-a-secured-api-specify-custom-headers-and-query-parameters-for-authentication-requests) document to learn more.

## Console

### Testing lambda functions in the UI

Now you can test your lambda functions directly in the Console UI. Use any of the Event samples available in your Namespace or any custom payload to dry–run a function before connecting it to your live system's business events.

### More configuration options at the moment of Namespace creation

Users can now configure more of the important Namespace options when they create it using the UI. The available options include setting memory consumption limits and choosing whether Istio should handle all of the communication between Pods in the Namespace.

## Installation

### Kyma available on GCP Marketplace

Deploying on GKE is now easier than ever as you can get a fully functional Kyma deployment with `http://xip.io/` straight from the GCP Marketplace. Follow [this link](https://console.cloud.google.com/marketplace/details/sap-public/kyma) to find Kyma on the Marketplace, read [this](/docs/root/kyma/#installation-install-kyma-on-a-cluster) document to get detailed installation instructions, and watch [this video](https://www.youtube.com/watch?v=hxVhQqI1B5A) for a detailed walkthrough. Enjoy!

### Platform-agnostic local deployments with Kyma CLI

Our very own [Kyma CLI](https://github.com/kyma-project/cli) graduated from the Incubator and became an integral part of Kyma with the 1.2 release. From now on you can use simple `kyma` commands to easily deploy Kyma on your local machine, no matter what OS you're running - all you have to do is install our proprietary CLI tool. The local installation flow is now updated to use the CLI and we are retiring the old installation approach that used custom scripts.

To experience the convenience the Kyma CLI brings to the table, follow [our documentation](/docs/root/kyma/#installation-install-kyma-locally) to install Kyma on your machine.

### Simpler cluster installation

The existing cluster installation flows were significantly simplified. The `sed` commands and the cluster configuration template file are now gone in favor of a set of `kubectl` calls. Now you simply set up your cluster, apply the desired configuration with `kubectl`, and wait for the magic to happen. For more details, see the [installation documentation](/docs/root/kyma/#installation-installation).

## Documentation

### Configuration documents for components

After preparing a set of generic configuration documents in the last release, this time around we focused on specific Kyma components. The idea was to create configuration documents that list all configurable parameters from the `values.yaml` file of each of the components' charts and sub-charts that you can configure with overrides. Not all components have their **Configuration** documents ready, but you can expect full coverage in the near future.

### Troubleshooting guides

As we interact with the community, we take note of recurring issues and misunderstandings that affect different components. We decide to gather these cases under the **Troubleshooting** documentation type to help the users deal with the most common issues easily. The troubleshooting documents are now available for the [Service Mesh](/docs/components/service-mesh/#troubleshooting-troubleshooting) and the general [Kyma](/docs/root/kyma/#troubleshooting-troubleshooting-overview) topic.

### Markdown documents in Headless CMS

If you've ever had any doubts regarding what the structure of a Markdown document processed by Headless CMS should look like, we come with a solution. See the [document](/docs/components/headless-cms/#details-markdown-documents) describing the required metadata and content of a Markdown file.

### How to modify the Documentation view in the Console UI

We prepared a tutorial that shows how to adjust the Documentation view in the Console UI. Based on it, you create a new Prometheus documentation section that contains Concepts and Guides topics and a set of Markdown subdocuments. [Try it](/docs/components/headless-cms/#tutorial-add-new-documents-to-the-documentation-view-in-the-console-ui) on your own.

### Testing bundle with sample documentation

The testing bundle is now enriched with [sample documentation](https://github.com/kyma-project/addons/tree/master/addons/testing-0.0.1/docs). There are examples of Markdown documents together with OpenAPI and AsyncAPI specifications. See the testing bundle for details on how different document types render in the Console UI.  


## Eventing

### Choose and configure a custom messaging middleware

Out of the box, Kyma comes with NATS Streaming as the default messaging middleware. With this release, we're giving you the tools to choose your own messaging middleware that best fits your needs from the usage, volume, and costs perspective. The only requirement is that the middleware must have Knative eventing-based [ClusterChannelProvisioner](https://knative.dev/docs/eventing/channels/) available. Compatible solutions include Google PubSub, Kafka, and NATSS.

### Sending custom metadata with published Events

The applications sending Events to Kyma can now send additional context or metadata by sending headers with the `ce-` prefix, for example, `ce-correlation-id`. These headers are delivered to the lambda function.

### Example for triggering microservices with Events

We prepared a self-contained example that shows how to configure an Event trigger for a microservice deployed in Kyma. This is extremely useful for applications written in Java which want to use Events as a trigger.


## Observability

### Early integration of Kiali

Early integration of Kiali is available as part of Istio. To enable Kiali, ensure that the monitoring module is installed and set the **kiali.enabled** parameter to `true`. The Kiali UI will be accessible under the `kiali` subdomain. The early integration is based on static user security. To learn how to get the Kiali UI password, see [this](https://github.com/kyma-project/kyma/tree/master/resources/istio) document.

### Known issues

Kiali is not accessible after installation when enabled as part of the Installer configuration. It should be accessible on Minikube at `https://kiali.kyma.local`.
To access it this way, use the workaround for now and add the `kiali` prefix to the **hosts** attribute in the `kiali-virtualservice` resource:
```
kubectl -n istio-system edit virtualservices kiali-virtualservice
```
```
hosts:
- kiali.kyma.local
```

## Service Mesh

### Istio updated to 1.1.6

The new release comes with Istio updated to 1.1.6. Previously Kyma used version 1.1.0, but due to a security issue and problems with the Ingress Gateway, we moved to a newer version. The update makes the Service Mesh more secure and stable - the Ingress Gateway issues seen in the previous version that caused port configurations not being applied properly are now resolved.
